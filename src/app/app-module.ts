import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
