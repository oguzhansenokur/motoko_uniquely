import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor Assistant {

  type ToDo = {
    description: Text;
    completed: Bool;
    priority: Nat; 

  };

  func natHash(n : Nat) : Hash.Hash { 
    Text.hash(Nat.toText(n))
  };

  var todos = Map.HashMap<Nat, ToDo>(0, Nat.equal, natHash);
  var nextId : Nat = 0;

  public query func getTodos() : async [ToDo] {
    Iter.toArray(todos.vals());
  };

  public func addTodo(description : Text, priority: Nat) : async Nat {
    let id = nextId;
    todos.put(id, { description = description; completed = false; priority });
    nextId += 1;
    id
  };

  public func completeTodo(id : Nat) : async () {
    ignore do ? {
      let description = todos.get(id)!.description;
      todos.put(id, { description; completed = true; priority = todos.get(id)!.priority});
    }
  };

  public query func showTodos() : async Text {
    var output : Text = "\n___TO-DOs___";
    for (todo : ToDo in todos.vals()) {
      output #= "\n" # todo.description;
      if (todo.completed) { output #= " ✔"; };
    };
    output # "\n"
  };

  public func updatePriority(id: Nat, newPriority: Nat) : async Bool {
    switch (todos.get(id)) {
        case (null) { false };
        case (?todo) {
            todos.put(id, {
                description = todo.description;
                completed = todo.completed;
                priority = newPriority;
            });
            true;
        };
    };
};

  public func deleteTodo(id: Nat) : async Bool {
    let exists = todos.get(id);
    if (exists != null) {
        todos.delete(id);
        true;
    } else {
        false;
    }
};

  public func clearCompleted() : async () {
    todos := Map.mapFilter<Nat, ToDo, ToDo>(todos, Nat.equal, natHash, 
              func(_, todo) { if (todo.completed) null else ?todo });
  };
}