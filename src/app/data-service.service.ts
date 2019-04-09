import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {

  private zero = 0;
  private delay = 2000;
  private selCardField = this.zero;
  private myCard: string[] = ['Name:RomanReigns', 'Rank:1', 'Height:6.3', 'Weight:250', 'Fights Won:235'];
  private otherCard: string[] = ['Name:SamoaJoe', 'Rank:2', 'Height:6.3', 'Weight:350', 'Fights Won:95'];
  private arrCards: string[];
  private myCard1: string[];
  private otherCard1: string[];
  private myArrCards: string[];
  private otherArrCards: string[];
  private half_length = this.zero;

  constructor(private httpService: HttpClient) {
    this.initApp();
  }
  private initApp(): void {
    this.httpService.get('./assets/cards.json').subscribe(
      data => {
        this.arrCards = data as string[];
        this.shuffleAndDistributeCards();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      },
    )
  }
  private setSelCardField(index: number): void {
    this.selCardField = index;
    setTimeout(() => {
      this.selCardField = this.zero;
      this.myArrCards.splice(this.zero, 1);
      this.otherArrCards.splice(this.zero, 1);
    }, this.delay);
  }
  private getSelCardField(): number {
    return this.selCardField;
  }

  private fetchMyCard(): string {
    if (undefined != this.myArrCards && this.myArrCards.length != this.zero)
      return this.myArrCards[this.zero].URL;
    else
      return "#";
  }
  private fetchOtherCard(): string {
    if (undefined != this.otherArrCards && this.otherArrCards.length != this.zero)
      return this.otherArrCards[this.zero].URL;
    else
      return
      "https://bit.ly/2U5IUkj"
  }

  private getMyCard(): Array<string>{
    return this.myCard1;
  }
  private getOtherCard(): Array<string>{
    return this.otherCard1;
  }

  private shuffleAndDistributeCards(): void {
    this.myArrCards = this.shuffle(this.arrCards);
    this.half_length = Math.ceil(this.myArrCards.length / 2);
    this.otherArrCards = this.myArrCards.splice(this.zero, this.half_length);
  }

  private shuffle(array: Array<string>): Array<string> {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (this.zero !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  private openURL(stringURL: string): void {
    window.open(stringURL, "_blank");
  }


}
