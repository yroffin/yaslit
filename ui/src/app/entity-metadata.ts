import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Something: {},
  Scene: {},
  Camera: {}
};

const pluralNames = {
  Something: 'Something'
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
