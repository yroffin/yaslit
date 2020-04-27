import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Something } from 'src/app/models/something';
import { SomethingService } from 'src/app/services/something.service';
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

  constructor(
    private somethingService: SomethingService,
  ) {
    // Worlds
    this.somethings$ = this.somethingService.entities$;
    this.loadingSomething$ = this.somethingService.loading$;
    this.somethings$.subscribe(
      (somethings: Something[]) => {
        this.somethings = _.map(somethings, (something) => {
          return {
            data: {
              id: something.id,
              name: something.name,
              entity: something
            }
          };
        });
      });
  }

  ngOnInit(): void {
    this.somethingService.getAll();
  }

}
