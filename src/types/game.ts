export type Player = 1 | 2;

export type Board = Player[][];

export type PlayerInfoTypes = {
    name: string;
    color: string;
};

export type PlayerInfo = {
    1: PlayerInfoTypes;
    2: PlayerInfoTypes;
};