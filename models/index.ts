export interface Board {
    name: string;
    seq: number;
}

export interface FileInfo {
    board_id: number;
    title: string;
    seq: number;
    tags?: string[];
}
