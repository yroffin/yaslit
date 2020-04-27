import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Something: {},
  Tag: {}
};

const pluralNames = {
  Something: 'Something',
  Tag: 'Tag'
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
