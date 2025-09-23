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
import type * as Config from './configuration';
import type * as Common from './common';
import type * as Command from './command';
import type * as Decoration from './decoration';
import type * as Diagnostic from './diagnostic';
import type * as Editor from './editor';
import type * as Event from './event';
import type * as Regex from './regex';
import type * as Selection from './selection';
import type * as Status from './status';
import type * as Numeric from './numeric';
import type * as Workspace from './workspace';

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
    Numeric,
    Workspace
};