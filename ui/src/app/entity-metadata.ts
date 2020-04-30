import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Node: {},
  Tag: {}
};

const pluralNames = {
  Node: 'Node',
  Tag: 'Tag'
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
