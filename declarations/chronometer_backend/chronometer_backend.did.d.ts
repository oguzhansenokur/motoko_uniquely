import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ToDo {
  'completed' : boolean,
  'description' : string,
  'priority' : bigint,
}
export interface _SERVICE {
  'addTodo' : ActorMethod<[string, bigint], bigint>,
  'clearCompleted' : ActorMethod<[], undefined>,
  'completeTodo' : ActorMethod<[bigint], undefined>,
  'deleteTodo' : ActorMethod<[bigint], boolean>,
  'getTodos' : ActorMethod<[], Array<ToDo>>,
  'showTodos' : ActorMethod<[], string>,
  'updatePriority' : ActorMethod<[bigint, bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
