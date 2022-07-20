import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/mat/material.module';
import { DialogComponent } from './components/template/dialog/dialog.component';
import { AddEditUserComponent } from './components/custom/add-edit-user/add-edit-user.component';
import { ChipsAutocompleteComponent } from './components/template/chips-autocomplete/chips-autocomplete.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/template/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    AddEditUserComponent,
    ChipsAutocompleteComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
