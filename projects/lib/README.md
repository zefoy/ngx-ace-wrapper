# Angular Ace Wrapper

<a href="https://badge.fury.io/js/ngx-ace-wrapper"><img src="https://badge.fury.io/js/ngx-ace-wrapper.svg" align="right" alt="npm version" height="18"></a>

This is an Angular wrapper library for the [Ace](http://ace.c9.io/). To use this library you should get familiar with the Ace documentation as well since this documentation only explains details specific to this wrapper.

### Quick Links

[Example application](https://zefoy.github.io/ngx-ace-wrapper/)
 |
[StackBlitz example](https://stackblitz.com/github/zefoy/ngx-ace-wrapper/tree/master)
 |
[Ace documentation](http://ace.c9.io/#nav-api)

### Building the library

```bash
npm install
npm run build
```

### Running the example

```bash
npm install
npm run start
```

### Installing and usage

```bash
npm install ngx-ace-wrapper --save
```

##### Load the module for your app (with global configuration):

Providing the global configuration is optional and when used you should only provide the configuration in your root module.

```javascript
import { AceModule } from 'ngx-ace-wrapper';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
};

@NgModule({
  ...
  imports: [
    ...
    AceModule
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ]
})
```

##### Use it in your HTML template (with custom configuration):

This library provides two ways to create a Ace element, component for simple use cases and directive for more custom use cases.

**COMPONENT USAGE**

Simply replace the element that would ordinarily be passed to `Ace` with the ace component.

You also need to import brace and the used mode(s) and theme(s):

```javascript
import 'brace';
import 'brace/mode/text';
import 'brace/theme/github';
```

```html
<ace [config]="config" [mode]="'text'" [theme]="'github'" [(value)]="value"></ace>
```

```javascript
[config]                     // Custom config to override the global defaults.

[mode]                       // Mode for the editor (import mode manually!).
[theme]                      // Theme for the editor (import theme manually!).
[value]                      // Input value of the ace editor content (text).
[disabled]                   // Disables all functionality (focus & editing).

[useAceClass]                // Use ace class (use provided default styles).

(valueChange)                // Event handler for the input value change event.
```

**DIRECTIVE USAGE**

You need to always import brace and the used mode(s) and theme(s):

```javascript
import 'brace';
import 'brace/mode/text';
import 'brace/theme/github';
```

Ace directive can be used in correctly structured div element with optional custom configuration:

```html
<div class="ace" [ace]="config">text</div>
```

```javascript
[ace]                        // Custom config to override the global defaults.

[disabled]                   // Disables all functionality (focus & editing).
```

##### Available configuration options (custom / global configuration):

```javascript
mode                         // Mode for the editor (import mode manually!).
theme                        // Theme for the editor (import theme manually!).

wrap                         // Sets text wrapping to be enabled or disabled.
tabSize                      // Size in spaces of the soft tabs (Default: 4).

showPrintMargin              // Sets showing of the print margin (Default: false).
printMarginColumn            // Sets the column where the print margin should be.
```

For more detailed documentation with all the supported config options see the Ace documentation.

##### Available control / helper functions (provided by the directive):

```javascript
ace()                        // Returns the Ace instance reference for full API access.

clear()                      // Clears the editor document and resets text selection.

getValue()                   // Returns the current text value of the editor document.

setValue(value, cursorPos?)  // Text value for the editor document. Cursor position:
                             // 0 = select all, -1 = document start, 1 = document end.
```

Above functions can be accessed through the directive reference (available as directiveRef in the component).
