import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TweetEffects } from './state/app.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    StoreModule.forRoot([reducer]),
    EffectsModule.forRoot([TweetEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
