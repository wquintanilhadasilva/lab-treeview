import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerritoryComponent } from './territory/territory.component';
import { MaterialModule } from './material-module';
import { TerritoryService } from './territory/territory.service';
import { TerritoryDetailComponent } from './territory-detail/territory-detail.component';
import { TerritoryDetailActionsComponent } from './territory-detail-actions/territory-detail-actions.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TerritoryComponent,
    TerritoryDetailComponent,
    TerritoryDetailActionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [TerritoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
