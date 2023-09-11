import 'brace';

import 'brace/mode/text';
import 'brace/theme/github';

import 'brace/theme/clouds';
import 'brace/mode/javascript';

import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { AceComponent, AceDirective, AceConfigInterface } from 'ngx-ace-wrapper';

@Component({
  selector: 'my-app',
  moduleId: 'src/app/app.component',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  public show: boolean = true;

  public type: string = 'component';

  public content: string = 'Some example content';

  public disabled: boolean = false;

  public config: AceConfigInterface = {
    mode: 'text',
    theme: 'github',
    readOnly : false,
  };

  @ViewChild(AceComponent, { static: false }) componentRef?: AceComponent;
  @ViewChild(AceDirective, { static: false }) directiveRef?: AceDirective;

  constructor() {}

  ngAfterViewInit(): void {
    // To get the Ace instance:

    // this.directiveRef.ace();
    // this.componentRef.directiveRef.ace();
  }

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleMode(): void {
    this.config.mode = (this.config.mode === 'text') ? 'javascript' : 'text';
  }

  public toggleTheme(): void {
    this.config.theme = (this.config.theme === 'github') ? 'clouds' : 'github';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleReadonly(): void {
    this.config.readOnly = (this.config.readOnly === true) ? false : true;
  }

  public clearEditorContent(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.clear();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.clear();
    }
  }

  public onEditorBlur(event: any): void {
    console.log('Editor blur:', event);
  }

  public onEditorFocus(event: any): void {
    console.log('Editor focus:', event);
  }

  public onValueChange(value: string): void {
    console.log('Value change:', value);
  }

  public onContentChange(event: any): void {
    console.log('Content change:', event);
  }

  public onSelectionChange(event: any): void {
    console.log('Selection change:', event);
  }
}
