import { boardCols } from "const";
import { atom } from "recoil";
import { Board, Player, PlayerInfo, PlayerInfoTypes } from "types";

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
});

export const playersInfoState = atom<PlayerInfo>({
  key:"playersInfoState",
  default: {
    1: {} as PlayerInfoTypes,
    2: {} as PlayerInfoTypes,
  }
})

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
});
