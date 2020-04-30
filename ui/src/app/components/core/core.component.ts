import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Node, Tag, Edge } from 'src/app/models/node';
import { NodeService, EdgeService, TagService } from 'src/app/services/node.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  providers: [MessageService]
})
export class CoreComponent implements OnInit {

  loadingNode$: Observable<boolean>;
  nodes$: Observable<Node[]>;
  nodes: Node[];

  loadingEdge$: Observable<boolean>;
  edges$: Observable<Edge[]>;
  edges: Edge[];

  loadingTag$: Observable<boolean>;
  tags$: Observable<Tag[]>;
  tags: Tag[];

  value: string;

  constructor(
    private nodeService: NodeService,
    private edgeService: EdgeService,
    private tagService: TagService,
    private messageService: MessageService
  ) {
    // Node
    this.nodes$ = this.nodeService.entities$;
    this.loadingNode$ = this.nodeService.loading$;
    this.nodes$.subscribe(
      (nodes: Node[]) => {
        this.nodes = _.map(nodes, (node) => {
          return {
            id: node.id,
            name: node.name,
            tags: node.tags,
            entity: node
          };
        });
      });

    // Edge
    this.edges$ = this.edgeService.entities$;
    this.loadingEdge$ = this.edgeService.loading$;
    this.edges$.subscribe(
      (edges: Edge[]) => {
        this.edges = _.map(edges, (edge) => {
          return {
            id: edge.id,
            name: edge.name,
            tags: edge.tags,
            entity: edge
          };
        });
      });

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
    this.nodeService.getAll();
    this.edgeService.getAll();
    this.tagService.getAll();
  }

  addNode(event: any) {
    this.nodeService.add({
      id: undefined,
      name: this.value
    }).subscribe(
      (updated) => {
        this.messageService.add({ severity: 'success', summary: 'Update node', detail: `${updated.name}` });
      }
    );
  }

  addEdge(event: any) {
    this.edgeService.add({
      id: undefined,
      name: this.value
    }).subscribe(
      (updated) => {
        this.messageService.add({ severity: 'success', summary: 'Update edge', detail: `${updated.name}` });
      }
    );
  }

  addTag(event: any) {
    this.tagService.add({
      id: undefined,
      name: this.value
    }).subscribe(
      (updated) => {
        this.messageService.add({ severity: 'success', summary: 'Update tag', detail: `${updated.name}` });
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
            this.messageService.add({ severity: 'success', summary: 'Add tag', detail: `${tag.name}` });
          }
        );
      }
    );
  }

  addTagToEdge(event: any, tag: Tag, edge: Edge) {
    this.edgeService.getByKey(edge.id).subscribe(
      (get) => {
        const detached = _.clone(get);
        detached.tags = _.flatMap([get.tags, tag]);
        this.edgeService.update(detached).subscribe(
          (updated) => {
            this.messageService.add({ severity: 'success', summary: 'Add tag', detail: `${tag.name}` });
          }
        );
      }
    );
  }

}
