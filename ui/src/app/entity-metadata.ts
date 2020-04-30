import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Node: {},
  Edge: {},
  Folder: {},
  Tag: {}
};

const pluralNames = {
  Node: 'Node',
  Edge: 'Edge',
  Folder: 'Folder',
  Tag: 'Tag'
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
