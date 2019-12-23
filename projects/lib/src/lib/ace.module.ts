import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AceComponent } from './ace.component';
import { AceDirective } from './ace.directive';

@NgModule({
  declarations: [ AceComponent, AceDirective ],
  imports: [ CommonModule ],
  exports: [ CommonModule, AceComponent, AceDirective ],
  providers: []
})
export class AceModule {
}
