import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Something, Tag } from 'src/app/models/something';
import { SomethingService, TagService } from 'src/app/services/something.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  providers: [MessageService]
})
export class CoreComponent implements OnInit {

  loadingSomething$: Observable<boolean>;
  somethings$: Observable<Something[]>;
  somethings: Something[];

  loadingTag$: Observable<boolean>;
  tags$: Observable<Tag[]>;
  tags: Tag[];

  value: string;

  constructor(
    private somethingService: SomethingService,
    private tagService: TagService,
    private messageService: MessageService
  ) {
    // Something
    this.somethings$ = this.somethingService.entities$;
    this.loadingSomething$ = this.somethingService.loading$;
    this.somethings$.subscribe(
      (somethings: Something[]) => {
        this.somethings = _.map(somethings, (something) => {
          return {
            id: something.id,
            name: something.name,
            tags: something.tags,
            entity: something
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
            somethings: tag.somethings,
            entity: tag
          };
        });
      });
  }

  ngOnInit(): void {
    this.somethingService.getAll();
    this.tagService.getAll();
  }

  addSomething(event: any) {
    this.somethingService.add({
      id: undefined,
      name: this.value
    }).subscribe(
      (updated) => {
        this.messageService.add({ severity: 'success', summary: 'Update something', detail: `${updated.name}` });
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


  addTagToSomething(event: any, tag: Tag, something: Something) {
    this.somethingService.getByKey(something.id).subscribe(
      (get) => {
        const detached = _.clone(get);
        detached.tags = _.flatMap([get.tags, tag]);
        this.somethingService.update(detached).subscribe(
          (updated) => {
            this.messageService.add({ severity: 'success', summary: 'Add tag', detail: `${tag.name}` });
          }
        );
      }
    );
  }
}
