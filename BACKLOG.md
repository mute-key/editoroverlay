### Backlog

this is a temporary note & backlog  

```plain
| symbols ===================================================================================================

  [+]: new, added
  [o]: completed
  [!]: issues
  [~]: on going, unfinished or planning
  [,]: not decided, pause
  [_]: drop, ideas or features
  [?]: unknown unknown, maybe fixed
  
| sticky_list ===============================================================================================

- [~] current method to creating a store object is to make a copy from const object where it is defined, 
      maybe it is better to just change it all to some state/store object...? um.... i need to think about it
- [~] maybe applying preset should have some sort of indicator or message popup that configurations are 
      being updated and will reload. 
- [~] probably document state indicator could be useful? not sure
- [~] configuration pattern improvement.
- [~] configuration code clean up.
- [~] implement new status block for tasks in vscode or from terminal.
- [~] to get back to configuration code at some point and clean up.
- [~] better type definitions
- [~] refactor some of unpolished configuration files

- [?] direct config update on settings.json leaves selection status text. 
- [?] backgroundColor configuration or auto appply background color based on border colour. not sure yet.

- [!] continues trigger of 'select next occurrences' will not cause render lag until when it reach 
      round 300 cursor. they will be rendered with some delay after reaching certain numbers. 
      one way to solving this would be paging the render obejct but this will require major data
      structure refactoring. i would like to work on this eventually.

| version log ===============================================================================================

| 1.6.4 - planned |

- [+] font-family configurations for all text overlays
- [+] font-decoration configurations for all text overlays
- [+] queue strategies for textEditorDecorationTypes across all overlays so that every overlay 
      can have ascending sequence.
- [+] an ability to change the overlay positions in sequence.

************************************************************************************************************

| 1.6.3 - current |

- [+] unc path handling added for cross-os-workspace for git overlay, no arbitary string will be put in
      spawn, and all spawn execution path will be directed by cwd option for all 
      win32, wsl (cross-os-workspace), and posix.
- [+] added git branch + status information overlay.
      if the current file on editor is ignored, the overlay will display greyed out icon with tag message
      if the current file is indexed by git, the overlay will display active svg, with total numbers of
      changes in current branch include mod, add, del and etc.
- [+] added git overlay configruations in setting. 

- [0] bug fix on warning source not displaying on overlay.

- [_] initially, cross-os-workspace was going to use posix uri path, but it would be not very secure, 
      although i can be safe but the problem is that it would need change the directory within the 
      shell, meaning it would need change directory with string literal has been parsed on userland. 
      more i think of, no method would make it as secure as unc path with cwd option to nodejs spanw(),
      setting option: editoroverlay.scmText.WSLRemoteDirectoryAccessMethod
      -> "uri | over the network remote address like path", "e.g, protocol://path/to/resource"
      is removed and will enforce to use unc path.
      althoguh, this can be re-implemented for ssh-remote workspace. now that im thinking, there can be 
      couple of optiopns to make the feature secure, one method would be an remote-installed extenion 
      that will serve the functions and stream back the data to the extension on host-enviroment. or 
      function that will add path to openned shell process, but i will need to learn and research a lot more. 
      then again, this would take a weeks to make it so im not rushing to implement it yet and no plan 
      for now as well.


************************************************************************************************************

| 1.6.2 |

- [+] found a bug in multiCursor function in debug mode, which causing async function crashing the runtime.
      as i understand, it is because the function uses circular referenced object with closure. it had better
      performance but the execution cycle was somewhat loose and makes some function calls irrelevant.

      perhaps mixing pointer/ref + async is harder to implement properly and not as necessary to use both.

************************************************************************************************************

| 1.6.1 |

- [+] engine updated to ^1.104.0.

- [0] fixed cross-os support for both win/nix (inc wsl).
      last update introduced ext stop working for cross-os, which it was fine before. it was new-old issue.
      to be exact, it was cross-os while it did work for both win/nix in 1.4.6. so i thought it was an easy 
      fix but it wasn't. in fact... most of the fixes were not it, causing me ending up updating the vsix 
      to see what wend wrong until in found how to debug it better. the issue took me half a day to figure 
      why it did not and resolved, and mostly, it was due to some of the references weren't established on 
      certain execution points, although they should have had established already in theory; which i think 
      it would be great if i can learn and distinguish how they work. then, i will have better understanding 
      of whole memory flow. i still have a lot to learn.

      perhaps, if i were to add more functions in this codebase, better to add a test suite, i think but
      not sure which functions to add or to add a test suite yet.

- [_] sometimes created decorationTypes does not have ascending decorationTypeID base on sequence, 
      causing malformed statsus block to be displayed. the only fix is to reload the vscode.
      need better method to have correct display order to prevent such an event.

************************************************************************************************************

| 1.6.0 |

- [0] temp update, please read @1.6.01.

************************************************************************************************************

| 1.5.2 |

- [0] there was a type D.Editor.Tp.RenderGroupFuncSign<T>, which i wish did auto arguement type overlading, 
      which works really well on debug but it fails on build. had to remove the type completely. 
      i assume it somewhat useful during the runtime but not on the build time. 

************************************************************************************************************

| 1.4.9 |

- [0] forgot to build with correct package opiton, vsce package --no-dependencies.
      this is kinda of hotfix. removed vsix packages that were included in last commit.
      
- [+] readme update

************************************************************************************************************

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

      after using the dev tool to get the profile of all rendering tasks, i was able to identify the 
      one of the performance bottleneck but not sure if it is my code or the api, (i forgot which it was)
      i was able to identify why and where in stack trace but i forogt to exactly where it was. 
      regardless, it is not much of an issues as of now to use this extenion so i will move on.

      

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
