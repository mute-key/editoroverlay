# Introduction

cursor/selection range highlight extension.

* cursor only: no selection range, only cursor on line.
* single line: when selection range is 1 line.
* multi line: when you select multiple lines in single selection.
* multi cursor: when selection is more than 1, meaning when you use multi cursor editing.

this extension will also display status text where the selection is.

## Setting Guide

`ctrl + shift + p` and search/open Settign UI, then search 'cursorline'


## Table of contents 
0. tl;dr
1. General
2. Status (Selection Status)
3. Cursor Only 
4. Single Line
5. Multi Line
6. Multi Cursor 
7. Diagnostic (Workspace Problems)
    - Bind to Current Editor 
    - Bind To workspace 

## 0. tl;dr





## 1. General

`General -> borderOpacity`
> Opacity of decoration border in __```%```__. __```1```__ is no opacity.

`General -> backgroundOpacity`
> Opacity of background color of selection in __```%```__. __```1```__ is no opacity.

## 2. Status (Selection)

`selectionText -> enabled`
> Enable inline status text.

`selectionText -> color`
> Change the Inline Status Text color. <br>Must be in format of hex color representation as __```#RRGGBB```__.

`selectionText -> backgroundColor`
> Change the Inline Status Text background color. <br>Must be in format of hex color representation as __```#RRGGBB```__, __```null```__ or __```""```__ (No background).

`selectionText -> opacity`
> Opacity of background color of selection in __```%```__. __```1```__ is no opacity.

`selectionText -> fontStyle`
> Font style of status text.

`selectionText -> fontWeight`
> Font weight of status text.

`selectionText -> cursorOnlyText`
> Status Text for Cursor Only Selection.<br>Example: `< Editing ... At (idx ${zCol}, zero-based)`

| Placeholder       | Description                                   |
| ----------------- | --------------------------------------------- |
| __```${col}```__  | Current position of cursor (as on status bar) |
| __```${zCol}```__ | count of characters in line (Zero based)      |
| __```${ln}```__   | current line number                           |

`selectionText -> singleLineText`
> Status Text for Single Line Selection.<br>Example: `< Selection ... Of (${char} Characters)`

| Placeholder       | Description                  |
| ----------------- | ---------------------------- |
| __```${char}```__ | character count of selection |
| __```${ln}```__   | current line number          |

`selectionText -> multiLineCursorText`
> Status Text for _'Multi Line Selection (Active Cursor)'_.<br>Example: `< Selection Cursor ... Of (${lc} Lines, ${char} Characters, Indent/EOL Ignored)`

| Placeholder       | Description                  |
| ----------------- | ---------------------------- |
| __```${ln}```__   | selection cursor line number |
| __```${lc}```__   | line count of selection      |
| __```${char}```__ | character count of selection |

`selectionText -> multiLineAnchorText`
> Status Text for _'Multi Line Selection (Anchor)'_.<br>Example: `< Selection Anchor ... Of (${lc} Lines, ${char} Characters, Indent/EOL Ignored)`

| Placeholder       | Description                  |
| ----------------- | ---------------------------- |
| __```${ln}```__   | selection anchor line number |
| __```${lc}```__   | line count of selection      |
| __```${char}```__ | character count of selection |

`selectionText -> multiCursorText`
> Status Text for _'Multi Cursor Selection'_.<br>Example: `< Multi Selection ... Of (${nth} of ${count}, with Total ${lc} Lines ${char} Characters)`

| Placeholder        | Description                        |
| ------------------ | ---------------------------------- |
| __```${nth}```__   | position of selection              |
| __```${count}```__ | count of selection                 |
| __```${lc}```__    | total line count of selection      |
| __```${ln}```__    | selection line number of last line |
| __```${char}```__  | total character count of selection |

## 3. Cursor Only

`cursorOnly -> borderColor`
> Change the border color. <br>Must be in format of hex color representation as __```#RRGGBB```__.

`cursorOnly -> backgroundColor`
> Change the background color. <br>Must be in format of hex color representation as __```#RRGGBB```__, __```null```__ or __```""```__ (No background).

`cursorOnly -> borderPosition`
> Border position on current selection.

`cursorOnly -> borderWidth`
> Border width, should use unit of __```'px'```__ or __```'em'```__.

`cursorOnly -> borderStyle`
> Main Border style on current line.

<!-- (not working yet) Use this border style only when [bottom | after Cursor]. this is border style for `cursorOnly.borderStyleWithafterCursor`
> previous range. -->

## 4. Single Line

`singleLine -> borderColor`
> Change the border color. <br>Must be in format of hex color representation as __```#RRGGBB```__.

`singleLine -> backgroundColor`
> Change the background color. <br>Must be in format of hex color representation as __```#RRGGBB```__, __```null```__ or __```""```__ (No background).

`singleLine -> borderPosition`
> Border position on current selection.

`singleLine -> borderWidth`
> Border width, should use unit of __```'px'```__ or __```'em'```__.

`singleLine -> borderStyle`
> Border style on current selection.

## 5. Multi Line

`multiLine -> borderColor`
> Change the border color. <br>Must be in format of hex color representation as __```#RRGGBB```__.

`multiLine -> backgroundColor`
> Change the background color. <br>Must be in format of hex color representation as __```#RRGGBB```__, __```null```__ or __```""```__ (No background).

`multiLine -> borderPosition`
> Border position on current selection.

`multiLine -> borderWidth`
> Border width, should use unit of __```'px'```__ or __```'em'```__.

`multiLine -> borderStyle`
> Border style on current selection.

## 6. Multi Cursor

`multiCursor -> borderColor`
> Change the border color. <br>Must be in format of hex color representation as __```#RRGGBB```__.

`multiCursor -> backgroundColor`
> Change the background color. <br>Must be in format of hex color representation as __```#RRGGBB```__, __```null```__ or __```""```__ (No background).

`multiCursor -> borderPosition`
> Border position on current selection.

`multiCursor -> borderWidth`
> Border width, should use unit of __```'px'```__ or __```'em'```__.

`multiCursor -> borderStyle`
> Border style on current selection

## 7. Diagnostic (Workspace problems) 




## Extra 

#### Color code 
<!-- 
#5eccff
#19b4fd // blue 
#009FFF
#52b100 // dark green 
#8ae71d // green
#b3b3b3 // grey
#fdf6e3 // white
#c2c0b9
#dc322e // red
#ff5755 // red
#ff706e // red
#eb5856
#ffd200
#ff6b69
#ff5b58
#a3d900
#89e71d

#d0ff438e

#FFD200
#c49600

#a3d900 -->

#8ae71d
#c49600
#909CB5
null
#8ae71d
null
#52b100
#5aaf10

