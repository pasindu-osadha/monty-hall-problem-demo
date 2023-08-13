import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameCardInfo } from '../../models/GameCardInfo';
import { AttemptResultRequest } from '../../models/AttemptResultRequest';
import { AttemptResultReseponse } from '../../models/AttemptResultReseponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.component.html',
  styleUrls: ['./simulate.component.css']
})
export class SimulateComponent implements OnInit {

  attemptIndex: number = 0;
  displayloopStarted: boolean = false;

  gameCardInfoInitialList: AttemptResultReseponse = {
    gameCardInfoList: [],
    numberOfGameAttempt: 0,
    countOfWon: 0,
    countOfLost: 0,
    precentageofCountOfWon: 0,
    precentageofCountOfLost: 0
  };

  gameCardAttemptResponceList: AttemptResultReseponse[] = [{
    gameCardInfoList: [],
    numberOfGameAttempt: 0,
    countOfWon: 0,
    countOfLost: 0,
    precentageofCountOfWon: 0,
    precentageofCountOfLost: 0
  }];

  simulateFilterForm: FormGroup;

  constructor(private gameService: GameService, private formBuilder: FormBuilder) {
    this.simulateFilterForm = this.formBuilder.group({
      gameAttempts: [100, [Validators.required, Validators.min(1)]],
      isChangeOption: ['0', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchInitialGameCardInfo();
    this.attemptIndex = 0;
  }


  fetchInitialGameCardInfo() {
    this.gameService.getGameCardInitialData().subscribe({
      next: (res: GameCardInfo[]) => {
        this.gameCardInfoInitialList.gameCardInfoList = res;
        this.gameCardAttemptResponceList[0].gameCardInfoList = res;
      },
      error: () => { }
    });
  }

  fetchFinalGameAttemptsResults(request: AttemptResultRequest) {

    this.gameService.GetSimulateAttemptsResults(request).subscribe(
      {
        next: (res) => {

          if (res) {

            this.gameCardAttemptResponceList = res;

            this.displayloopStarted = true;
            this.attemptIndex = 0;
            let i = 0;
            const delay = 100;

            const loop = () => {
              if (i < this.gameCardAttemptResponceList.length - 1) {
                this.attemptIndex = this.attemptIndex + 1;
                i++;
                setTimeout(loop, delay);
              }
              else {
                this.displayloopStarted = false;
              }
            };

            loop();
          }
        },
        error: () => { }
      }
    );

  }

  SimiulateFilterFormClicked() {

    if (this.simulateFilterForm.value) {
      let numberOfAttempts: number = this.simulateFilterForm.value.gameAttempts;
      let isChangeOption: boolean = this.simulateFilterForm.value.isChangeOption === '0' ? false : true;

      this.fetchFinalGameAttemptsResults({ numberOfAttempts: numberOfAttempts, isChangeOption: isChangeOption });

    }
  }

  clearForm() {
    this.attemptIndex = 0;
    this.simulateFilterForm.reset({
      gameAttempts: 100,
      isChangeOption: '0'
    });
    this.gameCardAttemptResponceList[0] = this.gameCardInfoInitialList;
  }

}
