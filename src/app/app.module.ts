import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerritoryComponent } from './territory/territory.component';
import { MaterialModule } from './material-module';
import { TerritoryService } from './territory/territory.service';

@NgModule({
  declarations: [
    AppComponent,
    TerritoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [TerritoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
