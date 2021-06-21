import { createReducer, on, Action } from '@ngrx/store';
import * as TweetsActions from './app.actions';

export interface TweetsState {
    tweets: {
        tweetsPerMinute: number;
        startTime: number;
        messages: any[];
        countries: any;
    }
}
const initialState: TweetsState = {
    tweets: {
        tweetsPerMinute: 0,
        startTime: Date.now(),
        messages: [],
        countries: {},
    }
}

const tweetsReducer = createReducer(
    initialState,
    on(TweetsActions.ResetTweets, (state) => {
        return {
            tweets: {
                tweetsPerMinute: 0,
                startTime: Date.now(),
                messages: [],
                countries: {},
            }
        }
    }),
    on(TweetsActions.LoadSuccess, (state, data) => {

        let keyword = data.keyword;
        let startTime = data.startTime;
        let _message = data._message;

        let text: string = _message.message.text;
        let countryCode: string = _message.message.place.country_code;
        let messages = state.tweets.messages;
        let countries = JSON.parse(JSON.stringify(state.tweets.countries));
        let tweetsPerMinute = state.tweets.tweetsPerMinute;

        if (text.toLowerCase().includes(keyword.toLowerCase())) {
          messages = [{
            text: _message.message.text,
            country: _message.message.place.country_code
          }, ...messages];
          if (!countries[countryCode]) {
            countries[countryCode] = 1;
          } else {
            countries[countryCode]++;
          }
          tweetsPerMinute = getTweetsPerMinute(startTime, messages);
        }

        return {
            tweets: {
                tweetsPerMinute: tweetsPerMinute,
                startTime: Date.now(),
                messages: messages,
                countries: countries,
            }
        }
    }),
    on(TweetsActions.LoadFail, (state) => {
        return {
            tweets: {
                tweetsPerMinute: 0,
                startTime: Date.now(),
                messages: [],
                countries: {},
            }
        }
    }),
)

function getTweetsPerMinute(startTime: number, messages: any[]) {
    let endTime = Date.now();
    let seconds = Math.round((endTime -startTime) / 1000);
    let minutes = seconds / 60;
    if (minutes == 0) {
        minutes = 1;
    }
    let length = messages.length;
    let tweetsPerMinute = Math.round(messages.length / minutes);
    tweetsPerMinute = (tweetsPerMinute > length) ? length : tweetsPerMinute;
    return tweetsPerMinute;
}

export function reducer(state: TweetsState | undefined, action: Action) {
    return tweetsReducer(state, action);
}