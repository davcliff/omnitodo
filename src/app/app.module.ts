import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoEntryComponent } from './components/todo-entry/todo-entry.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActionsComponent } from './components/actions/actions.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { ForecastComponent } from './components/forecast/forecast.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MatChipsModule } from '@angular/material/chips';
import { ListComponent } from './components/list/list.component';
import { MatDialogModule } from '@angular/material/dialog';

import { DateOrPipe } from './pipes/date-or';
import { DatePipe } from '@angular/common';
import { StringOrPipe } from './pipes/string-or';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { TodoEffects } from './effects/todos.effects';
import { AuthInterceptor } from './services/auth.interceptor';
const materialModules = [
  MatDialogModule,
  MatSidenavModule,
  MatToolbarModule,
  MatChipsModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatBottomSheetModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    TodoEntryComponent,
    ActionsComponent,
    ForecastComponent,
    InboxComponent,
    ProjectsComponent,
    ListComponent,
    DateOrPipe,
    StringOrPipe,
    LoginComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...materialModules,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AuthEffects, TodoEffects])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
