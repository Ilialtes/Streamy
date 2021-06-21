import { createAction, props } from '@ngrx/store';

export const LoadTweets = createAction(
    '[Tweets] Load', 
    props<{
        keyword: string,
        startTime: number,
    }>()
);
export const LoadSuccess = createAction(
    '[Tweets] Load Success', props<{
        keyword: string,
        startTime: number,
        _message: any
    }>()
);
export const LoadFail = createAction('[Tweets] LoadFail');
export const ResetTweets = createAction('[Tweets] Reset Tweets');

