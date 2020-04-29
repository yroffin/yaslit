export class Folder {
    id!: string;
    name?: string;
    somethings?: Something[];
}

export class Something {
    id!: string;
    name?: string;
    folder?: Folder;
    tags?: Tag[];
}

export class Tag {
    id!: string;
    name?: string;
    somethings?: Something[];
}
