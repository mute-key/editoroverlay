### Backlog

```plain
==========================================================================================================
- [?] throttling or debouncing for multi-line selection and multi-cursor selection
- [?] backgroundColor configuration or auto appply background color based on border colour. not sure yet.
- [?] maybe applying preset should have some sort of indicator or message popup that configurations are being updated and will reload. 
- [~] to implement new status block for tasks in vscode or from terminal.
- [~] to get back to configuration code at some point and clean up.
- [~] mutline highlight/status has high rendering cost. have been constantly optimizing the cost ever since. 
      this will be onging until no longer spikes even with rapid-fire but maybe it is very difficult without debounce.
      the problem with debounce or throttlign will introduce some delays with input response. 
      im not sure if i will like that instead cripy response as of now.
==========================================================================================================

v1.4.0 Update
- [+] new configuration nextLine (auto) or previousLine (auto) for diagnotic visiblity has been added.
- [+] new autoLinePositionDatumPoint has been added to serve a base range point to auto inline diagnotic status 
      when next line length exceed datum point.
- [+] performance improvment for multiLine highlight as well as all types of staus selection status. 
      multi-cursor selection status no longer lags nor slowed on UI update when rapid-trigger.
      some large refactoring has been done for all selection status with maximized utilization of references.
- [+] new placeholder 'charOnly' has been added for multi-line that ignores indents and carriage returns. 
- [+] dignostic text placement next line will be displayed on same line when the cursor is on the last line of the document
- [+] bug has been fixed for when reloading the configuration when diagnotic was enabled/disabled is changed.

- [!] selection status does not work when a primary selection is more than 1 selection range 
     (composite range). this is ofc, should work but it would take some time to implement.

- [!] sometimes created decorationTypes does not have ascending decorationTypeID base on sequence, 
      causing malformed statsus block to be displayed. the only fix is to reload the vscode.
      need better method to have correct display order to prevent such an event.
- [!] direct config update on settings.json leaves selection status text. 



v1.3.4 Update
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
