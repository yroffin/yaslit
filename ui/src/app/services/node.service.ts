import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Node, Tag } from '../models/node';

@Injectable({
  providedIn: 'root'
})
export class NodeService extends EntityCollectionServiceBase<Node> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Node', serviceElementsFactory);
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
