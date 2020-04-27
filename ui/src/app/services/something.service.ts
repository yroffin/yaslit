import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Something } from '../models/something';

@Injectable({
  providedIn: 'root'
})
export class SomethingService extends EntityCollectionServiceBase<Something> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Something', serviceElementsFactory);
  }
}
