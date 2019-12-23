import 'brace';

import 'brace/mode/text';
import 'brace/theme/github';

import { Component,
  AfterViewInit, Input, Output, EventEmitter,
  ViewChild, HostBinding, ViewEncapsulation } from '@angular/core';

import { AceDirective } from './ace.directive';
import { AceConfigInterface } from './ace.interfaces';

@Component({
  selector: 'ace',
  exportAs: 'ngxAce',
  templateUrl: './ace.component.html',
  styleUrls: [ './ace.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AceComponent implements AfterViewInit {
  private content: string = '';

  @Input()
  get value(): string {
    return this.content;
  }
  set value(value: string) {
    this.setContent(value);
  }

  @Input() disabled: boolean = false;

  @Input() mode: string = '';
  @Input() theme: string = '';

  @Input() config?: AceConfigInterface;

  @HostBinding('class.ace')
  @Input() useAceClass: boolean = true;

  @Output() blur = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();

  @Output() copy = new EventEmitter<any>();
  @Output() paste = new EventEmitter<any>();

  @Output() change = new EventEmitter<any>();

  @Output() valueChange = new EventEmitter<string>();

  @Output() changeCursor = new EventEmitter<any>();
  @Output() changeSession = new EventEmitter<any>();
  @Output() changeSelection = new EventEmitter<any>();

  @ViewChild(AceDirective, { static: true }) directiveRef?: AceDirective;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.content != null) {
      this.setContent(this.content, true);
    }
  }

  private setContent(value: string, force?: boolean): void {
    if (force || value !== this.content) {
      if (this.directiveRef) {
        this.directiveRef.setValue(value, 1);
      }

      this.content = value;
    }
  }

  public getConfig(): AceConfigInterface {
    this.config = this.config || {};

    this.config.mode = this.mode || this.config.mode;

    this.config.theme = this.theme || this.config.theme;

    return this.config;
  }

  public onContentChange(event: any): void {
    if (this.directiveRef) {
      this.change.emit(event);

      this.content = this.directiveRef.getValue() || '';

      this.valueChange.emit(this.value);
    }
  }
}
