/**
 * [type declarations]
 * 
 * current implementation of export types is done in such a way as of this; 
 * import type * as D from '../type/type.d';
 * 
 * D itself will serve as the top level namespace for the type definitions 
 * and collection of namespaces which, i thought it was very explicit. 
 * 
 * as the code gets more conceptually deeper, i have began to see the seperation 
 * of data type itself with descriptive data structore type and call signature 
 * and categorizing them; which can be applied to the type defitions and it's 
 * logical structur within the filesystem with use of namespaces. 
 * 
 * the idea, at this point is as following, 
 * 
 * - seperate the types that can be considered primitives. 
 * - seperate the types that are structural descriptions. 
 * - seperate teh types that are use to validate the function call 
 * 
 * i need to find a way to introduce a way to categorize them 
 * yet, it have not designed in my mind.
 */
import type * as Config from './configuration.d';
import type * as Common from './common.d';
import type * as Command from './command.d';
import type * as Decoration from './decoration.d';
import type * as Diagnostic from './diagnostic.d';
import type * as Editor from './editor.d';
import type * as Event from './event.d';
import type * as Regex from './regex.d';
import type * as Selection from './selection.d';
import type * as Status from './status.d';
import type * as Numeric from './numeric.d';

export type {
    Config,
    Common,
    Command,
    Decoration,
    Diagnostic,
    Editor,
    Event,
    Regex,
    Selection,
    Status,
    Numeric
};