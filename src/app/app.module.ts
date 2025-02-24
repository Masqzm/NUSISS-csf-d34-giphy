import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form.component';
import { DisplayComponent } from './components/display.component';
import { provideHttpClient } from '@angular/common/http';
import { GiphyService } from './giphy.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [ provideHttpClient(), GiphyService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
