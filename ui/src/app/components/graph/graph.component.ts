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
  }

  ngAfterViewInit(): void {
    this.graphService.getGraph('').subscribe(
      (graph: any) => {
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
          this.addEdge(this.selected.id, doubleTap.id);
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

  /**
   * add a new node
   * @param event event
   */
  addNode(event: any) {
    this.nodeService.add({
      id: undefined,
      name: this.name,
      data: {
        value: 1
      }
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
        this.selectNode(inserted.id);
        this.cy.layout({ name: 'cose' }).start();
        this.messageService.add({ severity: 'success', summary: 'Add node', detail: `${inserted.name}` });
      }
    );
  }

/**
 * tag management
 * @param event event
 * @param toRemove tag to remove
 * @param node node to appy
 */
  addTagToNode(event: any, toAdd: Tag, node: Node) {
    this.nodeService.getByKey(node.id).subscribe(
      (get) => {
        const detached = _.clone(get);
        detached.tags = _.flatMap([get.tags, toAdd]);
        this.nodeService.update(detached).subscribe(
          (updated) => {
            this.selectNode(updated.id);
            this.messageService.add({ severity: 'success', summary: 'Add tag', detail: `${updated.name}` });
          }
        );
      }
    );
  }

  /**
   * tag management
   * @param event event
   * @param toRemove tag to remove
   * @param node node to appy
   */
  deleteTagToNode(event: any, toRemove: Tag, node: Node) {
    this.nodeService.getByKey(node.id).subscribe(
      (get) => {
        const detached = _.clone(get);
        detached.tags = _.filter(detached.tags, (tag) => {
          return tag.id !== toRemove.id;
        });
        this.nodeService.update(detached).subscribe(
          (updated) => {
            this.selectNode(updated.id);
            this.messageService.add({ severity: 'success', summary: 'Remove tag', detail: `${updated.name}` });
          }
        );
      }
    );
  }

  /**
   * add a new edge from node `src` to node `tgt`, update current selection
   * @param src source node
   * @param tgt target node
   */
  private addEdge(src: string, tgt: string) {
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
                this.cy.layout({ name: 'cose' }).start();
                this.selectNode(target.id);
              }
            );
          }
        );
      }
    );
  }

  /**
   * delete an edge
   * @param event event
   * @param node current node
   * @param edge edge to delete
   */
   deleteEdge(event: any, node: Node, edge: string) {
    this.edgeService.getByKey(edge).subscribe(
      (found) => {
        this.edgeService.delete(found).subscribe(
          (deleted) => {
            this.cy.remove(this.cy.$('#' + edge));
            this.cy.layout({ name: 'cose' }).start();
            this.nodeService.getByKey(node.id).subscribe(
              (target) => {
                this.selectNode(target.id);
                this.messageService.add({ severity: 'success', summary: 'Delete edge', detail: `${found.name}` });
              });
          }
        );
      }
    );
  }
}
