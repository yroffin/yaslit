import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Something, Tag } from 'src/app/models/something';
import { SomethingService, TagService } from 'src/app/services/something.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  loadingSomething$: Observable<boolean>;
  somethings$: Observable<Something[]>;
  somethings: Something[];

  loadingTag$: Observable<boolean>;
  tags$: Observable<Tag[]>;
  tags: Tag[];

  constructor(
    private somethingService: SomethingService,
    private tagService: TagService
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
            entity: tag
          };
        });
      });
  }

  ngOnInit(): void {
    this.somethingService.getAll();
    this.tagService.getAll();
  }

}
