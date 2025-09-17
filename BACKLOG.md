### Backlog

this is a temporary note & backlog, until i find something i like

```plain
| symbols ===================================================================================================

  [+]: new, added
  [o]: completed
  [!]: issues
  [~]: on going, unfinished or planning
  [,]: not decided, pause
  [_]: drop, ideas or features
  [?]: unknown unknown, lost track of the topic
  
| sticky_list ===============================================================================================

- [!] continues trigger of 'select next occurrences' will not cause render lag until when it reach 
      round 300 cursor. they will be rendered with some delay after reaching certain numbers. 
      one way to solving this would be paging the render obejct but this will require major data
      structure refactoring. i would like to work on this eventually.

- [?] sometimes created decorationTypes does not have ascending decorationTypeID base on sequence, 
      causing malformed statsus block to be displayed. the only fix is to reload the vscode.
      need better method to have correct display order to prevent such an event.
- [?] direct config update on settings.json leaves selection status text. 
- [?] backgroundColor configuration or auto appply background color based on border colour. not sure yet.

- [~] maybe applying preset should have some sort of indicator or message popup that configurations are 
      being updated and will reload. 
- [~] probably document state indicator could be useful? not sure
- [~] configuration pattern improvement.
- [~] configuration code clean up.
- [~] implement new status block for tasks in vscode or from terminal.
- [~] to get back to configuration code at some point and clean up.

- [~] better type definitions
- [~] refactor some of unpolished configuration files

| version log ===============================================================================================

| 1.4.8 |

- [+] new configuration, multi-cursor overlay position has been added. 
      the configuration problems -> visibility -> overlayPosition will allow to choose
      between inital cursor position to last cursor position.
- [+] multi-cursor empty/non-empty decoration has been split/added
      + overlay configuration for both empty selection and non empty selections 
      + new modules has been added | code split from selection.ts to selection/*.ts
- [+] split numeric.ts to hex.ts, bin.tx
- [+] added top level namespace in numeric collection.
- [o] my initial design of multiCursor was incomplete to cover a lot of edge cases. 
      multiCursor now can handle most of edge cases. 
      + random edit cursor insert in any position 
      + un-select inconsistant cursor insert in a sequence
      + col, zcol position metadata has been added to overlay
- [o] there was a bug with margin-left spacing with diagnostic render option overlays. 
      it was hotfixed in 1.4.7.
- [o] i am not sure if the api have changed or not but the behaviour tab change event is different 
      than as i remembered. regardless, tab change event no longer need to be subscribed. 
- [o] mutline highlight/status has high rendering cost. have been constantly optimizing the cost ever 
      since. this will be onging until no longer spikes even with rapid-fire but maybe it is very 
      difficult without debounce. the problem with debounce or throttlign will introduce some delays 
      inbetween of responses. now that i am thinking an map could be an option here but the map object 
      still will be slower than object literal. the performance of multline is not as bad as before, 
      so i am going to keep it as is unless i come up with a better idea. 

- [_] implement new diggnostic position (auto-before) just like (auto-inline).
- [_] throttling or debouncing for multi-line selection and multi-cursor selection

************************************************************************************************************

| 1.4.5 |

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

| pre 1.3.4 | ... and before, (list has not been kept up)

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
