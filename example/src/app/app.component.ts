import 'brace/theme/clouds';
import 'brace/mode/javascript';

import { Component, ViewChild } from '@angular/core';

import { AceComponent, AceDirective, AceConfigInterface } from 'ngx-ace-wrapper';

@Component({
  selector: 'my-app',
  moduleId: 'src/app/app.component',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent {
  public show: boolean = true;

  public type: string = 'component';

  public disabled: boolean = false;

  public config: AceConfigInterface = {
    mode: 'text',
    theme: 'github',
    readOnly : false
  };

  @ViewChild(AceComponent) componentRef: AceComponent;
  @ViewChild(AceDirective) directiveRef: AceDirective;

  constructor() {}

  toggleType() {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  toggleMode() {
    this.config.mode = (this.config.theme === 'text') ? 'javascript' : 'text';
  }

  toggleTheme() {
    this.config.theme = (this.config.theme === 'github') ? 'clouds' : 'github';
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  toggleReadonly() {
    this.config.readOnly = (this.config.readOnly === true) ? false : true;
  }

  clearEditorContent() {
    if (this.type === 'directive') {
      this.directiveRef.clear();
    } else if (this.type === 'component') {
      this.componentRef.directiveRef.clear();
    }
  }

  onEditorBlur(event: any) {
    console.log('Editor blur:', event);
  }

  onEditorFocus(event: any) {
    console.log('Editor focus:', event);
  }

  onValueChange(value: string) {
    console.log('Value change:', value);
  }

  onContentChange(event: any) {
    console.log('Content change:', event);
  }

  onSelectionChange(event: any) {
    console.log('Selection change:', event);
  }
}
