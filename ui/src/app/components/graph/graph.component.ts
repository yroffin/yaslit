import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import * as cytoscape from 'cytoscape';
import { MessageService, MenuItem } from 'primeng/api';
import { NodeService, EdgeService, TagService } from 'src/app/services/node.service';
import { Node, Tag } from 'src/app/models/node';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [MessageService]
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('myGraph') myGraph: ElementRef;

  loadingTag$: Observable<boolean>;
  tags$: Observable<Tag[]>;
  tags: Tag[];

  cy: any;
  items: MenuItem[];

  selected: Node;
  name: string;
  tag: string;

  tappedBefore;
  tappedTimeout;

  constructor(
    private graphService: GraphService,
    private messageService: MessageService,
    private nodeService: NodeService,
    private tagService: TagService,
    private edgeService: EdgeService
  ) {
    // Tag
    this.tags$ = this.tagService.entities$;
    this.loadingTag$ = this.tagService.loading$;
    this.tags$.subscribe(
      (tags: Tag[]) => {
        this.tags = _.map(tags, (tag) => {
          return {
            id: tag.id,
            name: tag.name,
            nodes: tag.nodes,
            entity: tag
          };
        });
      });
  }

  ngOnInit(): void {
    this.tagService.getAll();
    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }

  ngAfterViewInit(): void {
    this.graphService.getGraph('').subscribe(
      (graph: any) => {
        console.log('element', graph.elements);
        this.cy = cytoscape({
          elements: graph.elements,
          style: graph.style,
          layout: graph.layout,
          container: this.myGraph.nativeElement
        });

        this.cy.on('tap', 'node', (event) => {
          const tappedNow = event.target;
          if (this.tappedTimeout && this.tappedBefore) {
            clearTimeout(this.tappedTimeout);
          }
          if (this.tappedBefore === tappedNow) {
            tappedNow.trigger('doubleTap');
            this.tappedBefore = null;
          } else {
            this.tappedTimeout = setTimeout(() => {
              this.tappedBefore = null;
              const node = event.target.data();
              this.selectNode(node.id);
              this.messageService.add({ severity: 'success', summary: `tap ${node.name}`, detail: `${node.id}` });
            }, 300);
            this.tappedBefore = tappedNow;
          }
        });

        this.cy.on('doubleTap', 'node', (evt) => {
          const doubleTap = evt.target.data();
          this.linkToNode(this.selected.id, doubleTap.id);
          this.messageService.add({
            severity: 'success',
            summary: `doubleTap ${this.selected.name} to ${doubleTap.name}`, detail: `${this.selected.id} to ${doubleTap.id}`
          });
        });
      }
    );
  }

  private selectNode(id: string) {
    this.nodeService.getByKey(id).subscribe(
      (node) => {
        this.selected = node;
      }
    );
  }

  addNode(event: any) {
    this.nodeService.add({
      id: undefined,
      name: this.name
    }).subscribe(
      (inserted) => {
        this.cy.add(
          {
            data: {
              id: inserted.id,
              name: inserted.name
            }
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Add node', detail: `${inserted.name}` });
      }
    );
  }

  addTagToNode(event: any, tag: Tag, node: Node) {
    this.nodeService.getByKey(node.id).subscribe(
      (get) => {
        const detached = _.clone(get);
        detached.tags = _.flatMap([get.tags, tag]);
        this.nodeService.update(detached).subscribe(
          (updated) => {
            this.selected = updated;
            this.messageService.add({ severity: 'success', summary: 'Add tag', detail: `${updated.name}` });
          }
        );
      }
    );
  }

  deleteTagToNode(event: any, toRemove: Tag, node: Node) {
    this.nodeService.getByKey(node.id).subscribe(
      (get) => {
        const detached = _.clone(get);
        detached.tags = _.filter(detached.tags, (tag) => {
          return tag.id !== toRemove.id;
        });
        this.nodeService.update(detached).subscribe(
          (updated) => {
            this.selected = updated;
            this.messageService.add({ severity: 'success', summary: 'Remove tag', detail: `${updated.name}` });
          }
        );
      }
    );
  }

  private linkToNode(src: string, tgt: string) {
    this.nodeService.getByKey(src).subscribe(
      (source) => {
        this.nodeService.getByKey(tgt).subscribe(
          (target) => {
            this.edgeService.add({
              id: undefined,
              name: 'default',
              source: {
                id: source.id
              },
              target: {
                id: target.id
              }
            }).subscribe(
              (inserted) => {
                this.cy.add(
                  {
                    data: {
                      id: inserted.id,
                      source: source.id,
                      target: target.id
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  }
}
