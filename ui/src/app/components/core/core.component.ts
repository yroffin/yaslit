import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Node, Tag } from 'src/app/models/node';
import { NodeService, TagService } from 'src/app/services/node.service';
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

  loadingTag$: Observable<boolean>;
  tags$: Observable<Tag[]>;
  tags: Tag[];

  value: string;

  constructor(
    private nodeService: NodeService,
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
}
