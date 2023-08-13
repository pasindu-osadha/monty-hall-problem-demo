import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCardInfo } from '../models/GameCardInfo';
import { AttemptResultRequest } from '../models/AttemptResultRequest';
import { AttemptResultReseponse } from '../models/AttemptResultReseponse';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getGameCardInitialData(): Observable<GameCardInfo[]> {
    return this.http.get<GameCardInfo[]>(this.baseUrl + 'game/GetInitialGameInfo');
  }

  GetSimulateAttemptsResults(request: AttemptResultRequest): Observable<AttemptResultReseponse[]> {
    return this.http.post<AttemptResultReseponse[]>(this.baseUrl + 'game/GetAttemptsResult', request);
  }

}
