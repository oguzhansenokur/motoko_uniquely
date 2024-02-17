import { html, render } from 'lit-html';
import { chronometer_backend } from 'declarations/chronometer_backend';

class App {
  constructor() {
    this.todos = [];
    this.fetchTodos();
  }

  async fetchTodos() {
    this.todos = await chronometer_backend.getTodos();
    this.lastUpdated = new Date(); // Update a property to force re-render
    this.render();
}

async handleSubmit(e) {
  e.preventDefault();
  const desc = document.getElementById('desc').value;
  const priority = parseInt(document.getElementById('priority').value, 10);
  await chronometer_backend.addTodo(desc, priority); 
  await this.fetchTodos();
}

  async toggleComplete(id) {
    await chronometer_backend.completeTodo(id); 
    await this.fetchTodos(); 
  }

  async deleteTodo(id) {
    await chronometer_backend.deleteTodo(id); 
    await this.fetchTodos(); 
  }

render() {
    const listTemplate = html`
      <ul>
        ${this.todos.map((todo, index) => html`
          <li>
            ${todo.description} - Priority: ${todo.priority}
            <button @click=${() => this.toggleComplete(index)}>Toggle Complete</button>
            <button @click=${() => this.deleteTodo(index)}>Delete</button>
          </li>
        `)}
      </ul>
    `;

    const bodyTemplate = html`
      <main>
        <h1>To-Do List</h1>
        <form id="todoForm" @submit=${this.handleSubmit}>
          <input id="desc" name="desc" type="text" placeholder="Add a new to-do" />
          <input id="priority" name="priority" type="number" placeholder="Priority" min="1" max="5" />
          <button type="submit">Add</button>
        </form>
        ${listTemplate}
      </main>
    `;
    render(bodyTemplate, document.body);
}
}

export default App;