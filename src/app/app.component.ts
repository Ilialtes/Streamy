import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { TweetsService } from './services/tweets.service';
import { TweetsState } from './state/app.reducer';
import { selectTweets } from './state/app.selectors';
import * as TweetsActions from './state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  searchForm: FormGroup;
  searchText = "";
  
  tweetsSub: Subscription;
  tweetsData = {
    tweetsPerMinute: 0,
    startTime: 0,
    messages: [],
    countries: {},
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<TweetsState>
  ) {

    this.searchForm = fb.group({
      searchInput: [null, Validators.required],
    });

    this.tweetsSub = this.store.pipe(select(selectTweets)).subscribe(
      (response) => {
        this.tweetsData = response;
      }
    );
  }

  onSearch() {
    this.searchText = this.searchForm.controls.searchInput.value;
    this.store.dispatch(TweetsActions.ResetTweets());
    this.store.dispatch(TweetsActions.LoadTweets({ 
      keyword: this.searchText,
      startTime: Date.now(),
    }));
  }

  ngOnDestroy() {
    this.tweetsSub.unsubscribe();
  }

}
