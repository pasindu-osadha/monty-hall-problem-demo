import { GameCardInfo } from "./GameCardInfo";

export interface AttemptResultReseponse {
    gameCardInfoList: GameCardInfo[];
    numberOfGameAttempt: number;
    countOfWon: number;
    countOfLost: number;
    precentageofCountOfWon: number;
    precentageofCountOfLost: number;
}