import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AceModule, AceConfigInterface, ACE_CONFIG } from 'ngx-ace-wrapper';

import { AppComponent } from './app.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
  tabSize: 2
};

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    AceModule,
    BrowserModule,
    FlexLayoutModule
  ],
  exports: [
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ]
})
export class AppModule {}
