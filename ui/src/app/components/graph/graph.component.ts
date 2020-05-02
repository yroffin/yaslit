import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import * as cytoscape from 'cytoscape';
import { MessageService, MenuItem } from 'primeng/api';
import { NodeService, EdgeService } from 'src/app/services/node.service';
import { Node } from 'src/app/models/node';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [MessageService]
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('myGraph') myGraph: ElementRef;

  cy: any;
  items: MenuItem[];

  selected: Node;

  tappedBefore;
  tappedTimeout;

  constructor(
    private graphService: GraphService,
    private messageService: MessageService,
    private nodeService: NodeService,
    private edgeService: EdgeService
  ) {

  }

  ngOnInit(): void {
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
