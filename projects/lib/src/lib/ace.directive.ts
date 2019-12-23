import * as ace from 'brace';

import { Directive, Optional, Inject,
  OnInit, DoCheck, OnDestroy, OnChanges,
  Input, Output, EventEmitter, NgZone, ElementRef,
  KeyValueDiffer, KeyValueDiffers, SimpleChanges } from '@angular/core';

import { ACE_CONFIG, AceConfig, AceConfigInterface,
  AceEditorEvent, AceEditorEvents, AceSelectionEvent, AceSelectionEvents } from './ace.interfaces';

@Directive({
  selector: '[ace]',
  exportAs: 'ngxAce'
})
export class AceDirective implements OnInit, DoCheck, OnDestroy, OnChanges {
  private instance: ace.Editor | null = null;

  private configDiff: KeyValueDiffer<string, any> | null = null;

  @Input() disabled: boolean = false;

  @Input('ace') config?: AceConfigInterface;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  @Output() copy: EventEmitter<any> = new EventEmitter<any>();
  @Output() paste: EventEmitter<any> = new EventEmitter<any>();

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Output() changeCursor: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeSession: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeSelection: EventEmitter<any> = new EventEmitter<any>();

  constructor(private zone: NgZone,
    private elementRef: ElementRef, private differs: KeyValueDiffers,
    @Optional() @Inject(ACE_CONFIG) private defaults: AceConfigInterface) {}

  ngOnInit(): void {
    const params = new AceConfig(this.defaults);

    params.assign(this.config); // Custom configuration

    if (this.disabled) {
      params.readOnly = true;

      params.highlightActiveLine = false;
    }

    params.mode = 'ace/mode/' + (params.mode || 'text');
    params.theme = 'ace/theme/' + (params.theme || 'github');

    this.zone.runOutsideAngular(() => {
      this.instance = ace.edit(this.elementRef.nativeElement);

      this.instance.$blockScrolling = Infinity;

      this.instance.setOptions(params);
    });

    // Add native Ace event handling
    AceEditorEvents.forEach((eventName: AceEditorEvent) => {
      if (this.instance) {
        this.instance.on(eventName, (...args: any[]) => {
          if (args.length === 1) {
            args = args[0];
          }

          if (this[eventName]) {
            this.zone.run(() => {
              if (this[eventName].observers.length) {
                this[eventName].emit(args);
              }
            });
          }
        });
      }
    });

    // Add native Ace selection event handling
    AceSelectionEvents.forEach((eventName: AceSelectionEvent) => {
      if (this.instance) {
        this.instance.selection.on(eventName, (...args: any[]) => {
          if (args.length === 1) {
            args = args[0];
          }

          if (this[eventName]) {
            if (this[eventName].observers.length) {
              this[eventName].emit(args);
            }
          }
        });
      }
    });

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create();

      this.configDiff.diff(this.config || {});
    }
  }

  ngDoCheck(): void {
    if (this.configDiff) {
      const changes = this.configDiff.diff(this.config || {});

      if (changes) {
        this.ngOnDestroy();

        this.ngOnInit();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.instance) {
      if (this.instance.isFocused() as any as boolean) {
        this.blur.emit();
      }

      delete this.instance;

      this.instance = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
        this.zone.runOutsideAngular(() => {
          if (this.instance) {
            const params = new AceConfig(this.defaults);

            params.assign(this.config); // Custom configuration

            this.instance.clearSelection();

            const hlActive = (params.highlightActiveLine == null) ? true : false;

            this.instance.setHighlightActiveLine(this.disabled ? false : hlActive);

            this.instance.setReadOnly(this.disabled ? true : (params.readOnly || false));
          }
        });
      }
    }
  }

  public ace(): ace.Editor | null {
    return this.instance;
  }

  public clear(): void {
    if (this.instance) {
      this.instance.setValue('');

      this.instance.clearSelection();
    }
  }

  public getValue(): string | undefined {
    if (this.instance) {
      return this.instance.getValue();
    }
  }

  public setValue(value: string, cursorPos?: -1 | 1): void {
    if (this.instance) {
      this.instance.setValue(value || '', cursorPos);
    }
  }
}
