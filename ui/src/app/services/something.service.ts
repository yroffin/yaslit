import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Something, Tag } from '../models/something';

@Injectable({
  providedIn: 'root'
})
export class SomethingService extends EntityCollectionServiceBase<Something> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Something', serviceElementsFactory);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TagService extends EntityCollectionServiceBase<Tag> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Tag', serviceElementsFactory);
  }
}
