import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
