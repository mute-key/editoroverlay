# Introduction

cursor/selection range highlight extension.

* cursor only: no selection range, only cursor on line.
* single line: when selection range is 1 line.
* multi line: when you select multiple lines in single selection.
* multi cursor: when selection is more than 1, meaning when you use multi cursor editing.

this extension will also display status text where the selection is.

## Setting Guide

`ctrl + shift + p` and search/open Settign UI, then search 'cursorline'

## General

`General -> borderOpacity`
> Opacity of decoration border in __```%```__. __```1```__ is no opacity.

`General -> backgroundOpacity`
>Opacity of background color of selection in __```%```__. __```1```__ is no opacity.

## Status text

`statusText.enabled`
>Enable inline status text.

`statusText -> color`
>Change the Inline Status Text color. Color must be in hex color of __```#RRGGBB```__.

`statusText -> backgroundColor`
>Change the Inline Status Text background color. Color must be in hex color of __```#RRGGBB```__,  __```null```__ or __```""```__ (No background).

`statusText -> opacity`
>Opacity of background color of selection in __```%```__. __```1```__ is no opacity.

`statusText -> fontStyle`
>Border position on current selection.

`statusText -> fontWeight`
>Border position on current selection.

`statusText -> cursorOnlyText`
>Status Text for _'Cursor Only Selection'_.

| placeholder | description |
| -------- | ------- |
| __```${col}```__ | Current position of cursor (as on status bar) |
| __```${zCol}```__ | count of characters in line (Zero based)|
| __```${ln}```__ | current line number |

`statusText -> singleLineText`
> Status Text for _'Single Line Selection'_.

| placeholder | description |
| -------- | ------- |
| __```${char}```__ | character count of selection |
| __```${ln}```__ | current line number |

`statusText -> multiLineCursorText`
>Status Text for _'Multi Line Selection (Active Cursor)'_. __```${ln}```__, __```${char}```__ is where meta/delta information will be displayed.

| placeholder | description |
| -------- | ------- |
| __```${ln}```__ | selection cursor line number |
| __```${lc}```__ | line count of selection |
| __```${char}```__ | character count of selection |

`statusText -> multiLineAnchorText`
>Status Text for _'Multi Line Selection (Anchor)'_. __```${ln}```__, __```${char}```__ is where meta/delta information will be displayed.

| placeholder | description |
| -------- | ------- |
| __```${ln}```__ | selection anchor line number |
| __```${lc}```__ | line count of selection |
| __```${char}```__ | character count of selection |

`statusText -> multiCursorText`
>Status Text for _'Multi Cursor Selection'_. __```${nth}```__, __```${count}```__, __```${ln}```__, __```${char}```__ is where meta/delta information will be displayed.

| placeholder | description |
| -------- | ------- |
| __```${nth}```__ | position of selection |
| __```${count}```__ | count of selection |
| __```${lc}```__ | total line count of selection |
| __```${ln}```__ | selection line number of last line |
| __```${char}```__ | total character count of selection |

## Cursor Only

`cursorOnly -> borderColor`
> Change the border color. Color must be in hex color of __```#RRGGBB```__.

`cursorOnly -> backgroundColor`
> Change the background color. Color must be in hex color of __```#RRGGBB```__,  __```null```__ or __```""```__ (No background).

`cursorOnly -> borderPosition`
> Border position on current selection.

`cursorOnly -> borderWidth`
> Border width, should use unit of __```'px'```__ or __```'em'```__.

`cursorOnly -> borderStyle`
> Main Border style on current line.

(not working yet) Use this border style only when [bottom | after Cursor]. this is border style for `cursorOnly.borderStyleWithafterCursor`
> previous range.

## Single Line

`singleLine -> borderColor`
> Change the border color. Color must be in hex color of __```#RRGGBB```__.

`singleLine -> backgroundColor`
> Change the background color. Color must be in hex color of __```#RRGGBB```__,  __```null```__ or __```""```__ (No background).

`singleLine -> borderPosition`
> Border position on current selection.

`singleLine -> borderWidth`
> Border width, should use unit of __```'px'```__ or __```'em'```__.

`singleLine -> borderStyle`
> Border style on current selection.

## Multi Line

`multiLine -> borderColor`
> Change the border color. Color must be in hex color of __```#RRGGBB```__.

`multiLine -> backgroundColor`
> Change the background color. Color must be in hex color of __```#RRGGBB```__,  __```null```__ or __```""```__ (No background).

`multiLine -> borderPosition`
> Border position on current selection.

`multiLine -> borderWidth`
> Border width, should use unit of __```'px'```__ or __```'em'```__.

`multiLine -> borderStyle`
> Border style on current selection.

## Multi Cursor

`multiCursor -> borderColor`
> Change the border color. Color must be in hex color of __```#RRGGBB```__.

`multiCursor -> backgroundColor`
> Change the background color. Color must be in hex color of __```#RRGGBB```__,  __```null```__ or __```""```__ (No background).

`multiCursor -> borderPosition`
> Border position on current selection.

`multiCursor -> borderWidth`
> Border width, should use unit of __```'px'```__ or __```'em'```__.

`multiCursor -> borderStyle`
> Border style on current selection
