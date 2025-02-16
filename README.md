all the functions are working with selection change but config code is not fully complete.

### backlog

- [o]config diversify for differernt selection type and fully programmable config
    - [o]cursorOnly
    - [o]singleLine
    - [o]multiLine
    - [o]multiCurso
- [o]apply decoration on differernt selection type
- [o]more config options, global opacity configuration
- [o]config update on change without window reload.
- [o]more config option incude border position, more border options.
- [o]border position flips on mult-line selection, border on top on start pos, border on bottom on end pos.

___

- [>]maybe more optimisation
- [>]backgroundColor configuration or auto appply background color based on border colour. not sure yet.
- [>]range coordinator on different border position

___

- [x]better border width funciton, maybe.
- [x]cursor type indicator on gutter, maybe later.
- [x]screenshot of editor selection decorations.

___

- [?]changing config recreate all decoroation, breaks the refernce to previous decoroationType. gc will handle it but perhaps it is better to displose the changed decorationType and recreate?