import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TweetsService } from "../services/tweets.service";
import * as TweetsActions from './app.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable()
export class TweetEffects {

    loadTweets$ = createEffect(() => this.actions$.pipe(
        ofType(TweetsActions.LoadTweets),
        mergeMap((props) => this.tweetsService.getTweetsObservable().pipe(
            map((_message) => {
                return TweetsActions.LoadSuccess({
                    startTime: props.startTime,
                    keyword: props.keyword,
                    _message: _message,
                })
            }), 
            catchError(
                (error) => {
                    return of(TweetsActions.LoadFail());
                }
            )
        ))
    ));

    constructor(
        private actions$: Actions,
        private tweetsService: TweetsService
    ) {}
}