import { Test, TestingModule } from '@nestjs/testing';
import { SomethingResolver } from './graphql.resolver';

describe('GraphqlResolver', () => {
  let resolver: SomethingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SomethingResolver],
    }).compile();

    resolver = module.get<SomethingResolver>(SomethingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
