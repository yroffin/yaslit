import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Node, Edge, Folder, Tag } from '../models/node';

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
export class EdgeService extends EntityCollectionServiceBase<Edge> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Edge', serviceElementsFactory);
  }
}

@Injectable({
  providedIn: 'root'
})
export class FolderService extends EntityCollectionServiceBase<Folder> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Folder', serviceElementsFactory);
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
