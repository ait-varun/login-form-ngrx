import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
// npm install @ngrx/store-devtools --save
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { loginReducer } from './Store/reducers/login.reducer';
import { LoginEffects } from './Store/effects/login.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomepageComponent, UsersComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: loginReducer }, {}),
    EffectsModule.forRoot([LoginEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 2, logOnly: true }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
