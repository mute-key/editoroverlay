# Introduction

Highly customizable cursor/selection highlight extension.
This extension will also display selection status text which is equivelant of 'Editor Selection' in status bar as well as diagnostic count of editor/workspace same as in 'Problem view'.
You can enabled/disabled only the feetures you want if you don't need them all. Here are the examples of this extension with default confuguration as out of the box.

#### ___Cursor Only Highlight___


<img src="./resource/doc/cursorOnly.png" alt ="GIF" style=""><br>

#### ___SingleLine Highlight___

<img src="./resource/doc/singleLine.png" alt ="GIF" style=""><br>

#### ___MultiLine Highlight___

<img src="./resource/doc/multiLine.png" alt ="GIF" style=""><br>

#### ___MultiCursor Highlight___

<img src="./resource/doc/multiCursor.png" alt ="GIF" style=""><br>

#### ___Diagnostic___

<img src="./resource/doc/diagnostic.png" alt ="GIF" style=""><br>

> So this extension will display the diagnostic status of current editor/workspace.
You can confugure visibily, fixtures, position, format or text/glyph/emoji.

<img src="./resource/doc/linePosition.png" alt ="GIF" style=""><br>

> And Editor diagonotic will direct where the problem lines are based on current cursor position. <br>


So far, everything in the examples are on default configuration.<br><br>

There are no apply preset features yet, which i will add soon in future iteration.<br>
Also, feel free to leave feedback or comment if you like.<br>

# Feature Guide

`ctrl + shift + p` and search/open Settign UI, then search 'cursorline'<br>

<img src="./resource/doc/setting.png" alt ="GIF" style=""><br>
Most of configraions are should be self-explantory, so i will detail the ones that are not so much straight-forward.<br>

1. Cursor/selection highlight
2. Selection Status
3. Diagnostic Status

## Cursor/selection highlight

As the examples in the introduction, you can apply the borders and background to selection lines.
The confugrations are very clear to understand, the only thing that you need to know is that highlight color values shares
same opacity value from 'General.' You can also use string literal 'null' to disable the color for border and background.

## Selection Status

You can disable this feature if not necessary.

This feature is probably the main reason that i made this extension. The status bar is too small to read from distance, and it is even more inconvient
if you are using wide display as the editor selection is on bottom right side of vscode. It also does not tells you how many lines are i selection.
The value 'Col' in status bar 'Editor selection' is not zero based, as it refers to the actaully column grid of the editor.

Most of configurations are quite straight foword and they are well explained in configuration section.

<img src="./resource/doc/pinned.png" alt ="GIF" style=""><br>

You will see cpu usage spike when you repeatly/rapidly drag up and down while you are on multi-line selection.
This is due to the selection change event interface being triggered at average rate at 1000 per second.
The event even could reach 0.3ms between the event call. I would like to implement throttling features to reduce the cpu usage of event calls in the next iterations.
I tried optimise the performace of multi-line selection and cpu usage, and it is better than past versions of the extensions but it still can spike some.
It is not so much of the code, but it is the rendering cost but this is my specularation as the vscode API doc advices to keep the decoration object as light as possible.
Perhaps that is the reason but it is only my assumption.

It is the only multi-line selection with high frequant change of seleciton and it should be ok once if throttling is imlemented so if the rendering rate of multi-line decoration is reduced (e.g. 10ms).

If there is a problem with your configruation or if you want to revert to the default, find a Cog button next to configuration section and click 'Reset Setting'.
⚙️ is hidden but it will appear when you click on the section itself.

<img src="./resource/doc/reset.png" alt ="GIF" style=""><br>

## Diagnostic status

You can disable this feature if not necessary.

Diagnostic status indicate the same entry in probelm view as the screenshot.

<img src="./resource/doc/problem.png" alt ="GIF" style=""><br>

The configurations are some what complicated, due to complexcity of customizability of status block.

It kinda over-extend when selection status is enabled too, especially if you use horizontally split editors.
I would advice to change the position of diagnostics from setting 'Visibilty'


<img src="./resource/doc/nextLine.png" alt ="GIF" style=""><br>

Setting to next line put diagnostic on the line bellow where the cursor is.

<img src="./resource/doc/nextLine2.png" alt ="GIF" style=""><br>

Currently, There aren't many styles for diagnostic block but those will be in future update definitely such as background color, border radious and etc,
so the diagnotic block is more  visibly distint from others on the display.

I would like to kindly advice to read the 📌 pinned description thoroughly and try it youself.
i will try to list the template strucutre briefly.

- All Ok Placeholder ContentText
  - Template Fixture + [body]
    - body: [prefix] + All Ok ContentText + [postfix]
- Problem Placeholder ContentText
  - Template Fixture + [body: Editor + workspace]
    - Editor
      - [prefix] + ok ContentText + [postfix]
      - [prefix] + warning ContentText + [postfix]
      - [prefix] + error ContentText + [postfix]
    - workspace
      - [prefix] + ok ContentText + [postfix]
      - [prefix] + warning ContentText + [postfix]
      - [prefix] + error ContentText + [postfix]

## Lastly

Next update will include configuration preset, that will auto apply with command execution and more style configruations.
configuration code is not very polished, so i might need to spend some time with it as well as types and interface declarations.

I only used glyphs because you can apply the color of your choice.
Of course, you can use emoji to replace the glyps as well.
Or, if you use glyph fonts such as pwoerline or nerdfont, those can be used to customize the contentText.

I may add font family configuration in the future.

Feel free to open isseus if you find one, or any feedback or comment is more than welcome.

Thank you for reading.






