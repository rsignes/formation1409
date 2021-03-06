import { AuthInterceptor } from './http-interceptors/auth.interceptor';
import { entityConfig } from './store/app.state';
import { metadataReducer } from './store/reducers/metadata.reducer';
import { RaceEffects } from './store/effects/race.effects';
import { DataService } from './services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PoneyComponent } from './components/poney/poney.component';
import { RainbowDirective } from './directives/rainbow.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialComponentsModule } from './modules/material-components/material-components.module';
import { UnitPipe } from './pipes/unit.pipe';
import { RaceComponent } from './components/race/race.component';
import { RacingPipe } from './pipes/racing.pipe';
import { RaceListComponent } from './components/race-list/race-list.component';
import { RaceCreateComponent } from './components/race-create/race-create.component';
import { PoneyCreateComponent } from './components/poney-create/poney-create.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { raceReducer } from './store/reducers/race.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data'
import { InitService } from './services/init.service';

@NgModule({
  declarations: [
    AppComponent,
    PoneyComponent,
    RainbowDirective,
    UnitPipe,
    RaceComponent,
    RacingPipe,
    RaceListComponent,
    RaceCreateComponent,
    PoneyCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      races: raceReducer,
      metadata: metadataReducer
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      RaceEffects
    ]),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    {
      useClass: AuthInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (initService: InitService) => {
        return () => {
          initService.init()
        }
      },
      deps: [ InitService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
