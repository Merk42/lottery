export type DRAWING = {
    base:number[];
    extra:number;
    date: string;
    name: string;
}

export type PLAYER_ENTRIES = {
    date:string;
    name:string;
    attempts:ATTEMPT[]
}

export type ATTEMPT = {
    base:number[];
    extra:number;
}