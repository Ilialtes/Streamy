import { Injectable } from "@angular/core";
import * as PubNub from "pubnub";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TweetsService {

    pubnub: PubNub;

    constructor(){
        this.pubnub = new PubNub({
            subscribeKey: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
        });
    }

    getTweetsObservable(): Observable<any> {
        this.pubnub.unsubscribeAll();
        return new Observable((observer) => {
            this.pubnub.addListener({
                message: (_message) => {
                    observer.next(_message);
                }
            });
            this.pubnub.subscribe({
                channels: ['pubnub-twitter'],
            });
            return {
                unsubscribe: () => {
                    this.pubnub.unsubscribeAll();
                }
            };
        });
    }

}