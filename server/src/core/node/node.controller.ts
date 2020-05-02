import { Controller, Get } from '@nestjs/common';
import { Node, Tag, Folder, Edge } from 'src/repository/entities/node';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { NodeService, TagService, FolderService, EdgeService } from './node.service';
import * as _ from 'lodash';

@ApiTags('folder')
@Crud({
    model: {
        type: Folder
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            nodes: { eager: true }
        }
    }
})
@Controller('folder')
export class FolderController {
    constructor(
        private service: FolderService,
        private nodeService: NodeService,
        private edgeService: EdgeService) {
    }

    @Get('graph/:id')
    async findAll(): Promise<any> {
        let nodes = await this.nodeService.find();
        let edges = await this.edgeService.find({ relations: ["source", "target"] });
        return {
            elements: _.union(
                _.map<Node>(nodes, (some: Node) => {
                    return {
                        data: {
                            id: some.id,
                            name: some.name
                        }
                    }
                }),
                _.map<Node>(edges, (some: Edge) => {
                    return {
                        data: {
                            id: some.id,
                            name: some.name,
                            source: some.source.id,
                            target: some.target.id
                        }
                    }
                })
            ),
            layout: {
                name: 'cose',
                rows: 1
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(name)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ]
        };
    }
}

@ApiTags('node')
@Crud({
    model: {
        type: Node
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            sources: { eager: true },
            targets: { eager: true },
            tags: { eager: true }
        }
    }
})
@Controller('node')
export class NodeController {
    constructor(private service: NodeService) {
    }
}

@ApiTags('edge')
@Crud({
    model: {
        type: Edge
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            tags: { eager: true }
        }
    }
})
@Controller('edge')
export class EdgeController {
    constructor(private service: EdgeService) {
    }
}

@ApiTags('tag')
@Crud({
    model: {
        type: Tag
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            nodes: { eager: true }
        }
    }
})
@Controller('tag')
export class TagController {
    constructor(private service: TagService) {
    }
}
