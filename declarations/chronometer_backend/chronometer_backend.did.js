export const idlFactory = ({ IDL }) => {
  const ToDo = IDL.Record({
    'completed' : IDL.Bool,
    'description' : IDL.Text,
    'priority' : IDL.Nat,
  });
  return IDL.Service({
    'addTodo' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Nat], []),
    'clearCompleted' : IDL.Func([], [], []),
    'completeTodo' : IDL.Func([IDL.Nat], [], []),
    'deleteTodo' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getTodos' : IDL.Func([], [IDL.Vec(ToDo)], ['query']),
    'showTodos' : IDL.Func([], [IDL.Text], ['query']),
    'updatePriority' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
