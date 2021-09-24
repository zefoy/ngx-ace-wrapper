import { InjectionToken } from '@angular/core';

export const ACE_CONFIG = new InjectionToken<AceConfigInterface>('ACE_CONFIG');

export type AceEditorEvent = 'blur' | 'focus' | 'copy' | 'paste' | 'change' | 'changeSession';

export type AceSelectionEvent = 'changeCursor' | 'changeSelection';

export const AceEditorEvents: AceEditorEvent[] = [
  'blur',
  'focus',

  'copy',
  'paste',

  'change',
  'changeSession'
];

export const AceSelectionEvents: AceSelectionEvent[] = [
  'changeCursor',
  'changeSelection'
];

export interface AceConfigInterface {
  readOnly?: boolean,
  cursorStyle?: 'ace' | 'slim' | 'smooth' | 'wide',
  selectionStyle?: 'line' | 'text',
  mergeUndoDeltas?: boolean | 'always',
  behavioursEnabled?: boolean,
  highlightActiveLine?: boolean,
  highlightSelectedWord?: boolean,
  wrapBehavioursEnabled?: boolean,
  copyWithEmptySelection?: boolean,
  navigateWithinSoftTabs?: boolean,
  autoScrollEditorIntoView?: boolean,

  mode?: string,
  wrap?: boolean,
  tabSize?: number,
  overwrite?: boolean,
  useWorker?: boolean,
  foldStyle?: string,
  newLineMode?: string,
  useSoftTabs?: boolean,
  firstLineNumber?: number,

  theme?: string,
  minLines?: number,
  maxLines?: number,
  fontSize?: number | string,
  fontFamily?: string,
  showGutter?: boolean,
  printMargin?: number,
  scrollPastEnd?: boolean,
  animatedScroll?: boolean,
  showInvisibles?: boolean,
  fadeFoldWidgets?: boolean,
  showFoldWidgets?: boolean,
  showLineNumbers?: boolean,
  showPrintMargin?: boolean,
  fixedWidthGutter?: boolean,
  printMarginColumn?: boolean,
  displayIndentGuides?: boolean,
  highlightGutterLine?: boolean,
  hScrollBarAlwaysVisible?: boolean,
  vScrollBarAlwaysVisible?: boolean,

  dragDelay?: number,
  dragEnabled?: boolean,
  scrollSpeed?: number,
  focusTimeout?: number,
  tooltipFollowsMouse?: boolean,

  enableBasicAutocompletion?: boolean | { getCompletions: (editor: any, session: any, pos: any, prefix: any, callback: any) => void; }[],
  enableLiveAutocompletion?: boolean,
  enableSnippets?: boolean,
  enableEmmet?: boolean,
  useElasticTabstops?: boolean
}

export class AceConfig implements AceConfigInterface {
  readOnly?: boolean;
  cursorStyle?: 'ace' | 'slim' | 'smooth' | 'wide';
  selectionStyle?: 'line' | 'text';
  mergeUndoDeltas?: boolean | 'always';
  behavioursEnabled?: boolean;
  highlightActiveLine?: boolean;
  highlightSelectedWord?: boolean;
  wrapBehavioursEnabled?: boolean;
  copyWithEmptySelection?: boolean;
  navigateWithinSoftTabs?: boolean;
  autoScrollEditorIntoView?: boolean;

  mode?: string;
  wrap?: boolean;
  tabSize?: number;
  overwrite?: boolean;
  useWorker?: boolean;
  foldStyle?: string;
  newLineMode?: string;
  useSoftTabs?: boolean;
  firstLineNumber?: number;

  theme?: string;
  minLines?: number;
  maxLines?: number;
  fontSize?: number | string;
  fontFamily?: string;
  showGutter?: boolean;
  printMargin?: number;
  scrollPastEnd?: boolean;
  animatedScroll?: boolean;
  showInvisibles?: boolean;
  fadeFoldWidgets?: boolean;
  showLineNumbers?: boolean;
  showFoldWidgets?: boolean;
  showPrintMargin?: boolean;
  fixedWidthGutter?: boolean;
  printMarginColumn?: boolean;
  displayIndentGuides?: boolean;
  highlightGutterLine?: boolean;
  hScrollBarAlwaysVisible?: boolean;
  vScrollBarAlwaysVisible?: boolean;

  dragDelay?: number;
  dragEnabled?: boolean;
  scrollSpeed?: number;
  focusTimeout?: number;
  tooltipFollowsMouse?: boolean;

  enableBasicAutocompletion?: boolean | { getCompletions: (editor: any, session: any, pos: any, prefix: any, callback: any) => void; }[];
  enableLiveAutocompletion?: boolean;
  enableSnippets?: boolean;
  enableEmmet?: boolean;
  useElasticTabstops?: boolean;

  constructor(config: AceConfigInterface = {}) {
    this.assign(config);
  }

  assign(config: AceConfigInterface | any = {}, target?: any) {
    target = target || this;

    for (const key in config) {
      if (config[key] && !Array.isArray(config[key]) && typeof config[key] === 'object') {
        target[key] = {};

        this.assign(config[key], target[key]);
      } else {
        target[key] = config[key];
      }
    }
  }
}
