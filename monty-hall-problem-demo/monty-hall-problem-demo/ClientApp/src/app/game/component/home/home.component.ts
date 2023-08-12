import { Component, OnInit } from '@angular/core';
import { GameCardInfo } from '../../models/GameCardInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gameCardInfoList: GameCardInfo[] = [];
  clickAttempt: number = 0;
  isOpenValueChanged: boolean = false;
  isWon: boolean = false;
  isCompleteGame = false;
  numberOfGameAttempts: number = 0;
  countOfWon: number = 0;
  countOfLost: number = 0;

  initialGameCardInfoList = [
    { id: 1, cardName: "Goat01", isOpen: false, imagePath: "assets/goat.png", defualtImagePath: "assets/default.png", isSelected: false, isCar: false },
    { id: 2, cardName: "Goat02", isOpen: false, imagePath: "assets/goat.png", defualtImagePath: "assets/default.png", isSelected: false, isCar: false },
    { id: 3, cardName: "Car01", isOpen: false, imagePath: "assets/car.png", defualtImagePath: "assets/default.png", isSelected: false, isCar: true }
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.resetGameCardInfoList();
    this.numberOfGameAttempts = 0;
    this.countOfWon = 0;
    this.countOfLost = 0;
  }

  resetGameCardInfoList() {
    this.clickAttempt = 0;
    this.isOpenValueChanged = false;
    this.isWon = false;
    this.isCompleteGame = false;
    this.gameCardInfoList = this.shuffleGameCardInfoList(this.initialGameCardInfoList)
  }

  selectGameCard(gameCardInfo: GameCardInfo) {
    console.log(gameCardInfo);
    this.clickAttempt = this.clickAttempt + 1;

    switch (this.clickAttempt) {
      case 1: {

        this.gameCardInfoList = this.gameCardInfoList.map(gameCard => {
          if (gameCard.id === gameCardInfo.id) {
            return {
              ...gameCard,
              isSelected: true
            };
          }
          return gameCard;
        });

        this.gameCardInfoList = this.gameCardInfoList.map(gameCard => {
          if (gameCard.id !== gameCardInfo.id && !gameCard.isCar && !this.isOpenValueChanged) {
            this.isOpenValueChanged = true;
            return {
              ...gameCard,
              isOpen: true,
            };
          }
          return gameCard;
        });

        break;
      }

      case 2: {

        this.gameCardInfoList = this.gameCardInfoList.map(gameCard => {
          if (gameCard.id === gameCardInfo.id) {
            if (gameCard.isCar) {
              this.isWon = true;
              this.countOfWon = this.countOfWon + 1;
            }
            else {
              this.countOfLost = this.countOfLost + 1;
            }
            return {
              ...gameCard,
              isSelected: true,
              isOpen: true
            };
          }
          return gameCard;
        }
        );
        this.isCompleteGame = true;
        this.numberOfGameAttempts = this.numberOfGameAttempts + 1;
        break;
      }

      default: {
        this.resetGameCardInfoList();
        break;
      }
    }
  }

  shuffleGameCardInfoList<GameCardInfo>(array: GameCardInfo[]): GameCardInfo[] {
    const clonedArray = [...array];

    for (let i = clonedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    return clonedArray;
  }

}
