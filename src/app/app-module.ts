import { inject, NgModule, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { SharedAppStateService } from './shared/services/shared-app-state.service';
import { SharedModule } from './shared/shared.module';
import { AppUtils } from './helpers/app.utils';

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
    {
      provide: 'HTTP_INTERCEPTORS',
      useClass: AuthInterceptor,
      multi: true
    },
    provideAppInitializer(() => {
      inject(SharedAppStateService);
      inject(AppUtils);
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
