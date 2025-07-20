### Backlog

```plain
************************************************************************************************************

|Sticky List| [!]: issues [?]: not decided [~]: planning, on going

- [!] sometimes created decorationTypes does not have ascending decorationTypeID base on sequence, 
      causing malformed statsus block to be displayed. the only fix is to reload the vscode.
      need better method to have correct display order to prevent such an event.
- [!] direct config update on settings.json leaves selection status text. 

- [?] throttling or debouncing for multi-line selection and multi-cursor selection
- [?] backgroundColor configuration or auto appply background color based on border colour. not sure yet.
- [?] maybe applying preset should have some sort of indicator or message popup that configurations are 
      being updated and will reload. 
- [?] probably document state indicator could be useful? not sure

- [~] configuration pattern improvement.
- [~] configuration code clean up.
- [~] implement new status block for tasks in vscode or from terminal.
- [~] to get back to configuration code at some point and clean up.
- [~] mutline highlight/status has high rendering cost. have been constantly optimizing the cost ever 
      since. this will be onging until no longer spikes even with rapid-fire but maybe it is very 
      difficult without debounce. the problem with debounce or throttlign will introduce some delays 
      with input response. im not sure if i will like that instead cripy response as of now.
- [~] implement new diggnostic position (auto-before) just like (auto-inline).

************************************************************************************************************

i think some people actually prefer top-bottom border, as i saw in vscode release note.
not sure if the one that i saw is my extension or not though
maybe change the way the borders are being handled in configuration to make it more intuitive? 
hm, 

i quite like the syles of this backlog, maybe i can make the app or extenion out of it 
no todo apps ever scratched my itchings. perhaps this is the time to make myself one. 

- [+] new command to set auto next line for status
- [+] 



************************************************************************************************************

|1.4.5 Update|

- [+] new configuration nextLine (auto) or previousLine (auto) for diagnotic visiblity has been added.
- [+] new autoLinePositionDatumPoint has been added to serve a base range point to auto inline 
      diagnotic status when next line length exceed datum point.
- [+] performance improvment for multiLine highlight as well as all types of staus selection status. 
      multi-cursor selection status no longer lags nor slowed on render on UI even when rapid-trigger.
      some large performance improvement refactoring has been done for all selection status.
      the refactoring was focused on maximum usage of references and pointer-like handling. 
- [+] new placeholder 'charOnly' has been added for multi-line that ignores indents and carriage returns. 
- [+] dignostic text placement next line will be displayed on same line when the cursor is on the 
      last line of the document
- [+] bug has been fixed for reloading the configuration when diagnotic was enabled/disabled is changed.
- [+] composite range has been fixed as to be handled by multi-cursor correctly.
- [+] fixed a bug where decoration being rendered on both tab column on editor shift columns. 

************************************************************************************************************

|1.3.4 Update| ... and before, (list has not been kept up)

- [o] preset format and color preset
- [o] changing config recreate all decoroation, de-refernce to previous decoroationType from the object.
- [o] config diversify for differernt selection type and fully programmable config
    + cursorOnly
    + singleLine
    + multiLine
    + multiCursor
- [o] apply decoration on differernt selection type
- [o] more config options, global opacity configuration
- [o] config update on change without window reload.
- [o] more config option incude border position, more border options.
- [o] border position flips on mult-line selection, border on top on start pos, border on bottom on end pos.
- [o] range coordinator on different border position
- [o] border-type added/removed.
    + cursorOnly: bottom | before cursor.
    + cursorOnly: bottom | after cursor.
- [o] border width no longer template literals. re-implemented in numeric enum.
- [o] border width data tree to const object literal.
- [o] more configuration, background colors. and background opacity for all decoration types.
- [o] auto dismiss message when configuration change.
- [o] fixed a bug where not activating when inital load without active editor, e,g settings.
    * entry function will load all config whether if active editor is present or not and bind all events with config.
    * changing editor will trigger its event, starting to apply decoraiton on active editor, workign as intanded.
- [o] editor ui config overwrite for line highlight to gutter and cursor style and false to rounded selection.
- [o] config info object literal moved to constant.ts.
- [o] inline status text has been added. 
    - cursorOnly: 
    - singleLine: 
    - multiLine: 
    - multiCursor: 
- [o] better optimisation. i want faster response on cursor/selection change.

```
