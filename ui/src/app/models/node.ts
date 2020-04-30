export class Folder {
    id!: string;
    name?: string;
    nodes?: Node[];
}

export class Node {
    id!: string;
    name?: string;
    folder?: Folder;
    tags?: Tag[];
}

export class Tag {
    id!: string;
    name?: string;
    nodes?: Node[];
}
