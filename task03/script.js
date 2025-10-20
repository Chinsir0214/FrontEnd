class Todo {
    constructor(text) {
        this.id = Date.now();
        this.text = text;
        this.completed = false;
    }
}

class TodoApp {
    constructor() {

        this.todos = this.loadFromLocalStorage() || [];
        this.currentFilter = 'all';

        this.todoForm = document.querySelector('.todo-form');
        this.todoInput = document.querySelector('.todo-input');
        this.todoList = document.querySelector('.todo-list');
        this.filterButtons = document.querySelector('.filter-buttons');
        this.summaryText = document.querySelector('.summary-text');
        this.addEventListeners();
        this.render();
    }

    addEventListeners() {

        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = this.todoInput.value.trim();
            if (text) {
                this.addTodo(text);
                this.todoInput.value = '';
            }
        });


        this.todoList.addEventListener('click', (e) => {
            const target = e.target;
            const todoItem = target.closest('.todo-item');
            if (!todoItem) return;

            const todoId = Number(todoItem.dataset.id);

            if (target.type === 'checkbox' || target.classList.contains('todo-text')) {
                this.toggleTodo(todoId);
            }

            if (target.classList.contains('delete-btn')) {
                this.deleteTodo(todoId);
            }
        });


        this.filterButtons.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                this.currentFilter = e.target.dataset.filter;
                this.render();
            }
        });
    }


    addTodo(text) {
        const newTodo = new Todo(text);
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        this.render();
    }


    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.saveToLocalStorage();
        this.render();
    }


    deleteTodo(id) {
        const todoElement = this.todoList.querySelector(`[data-id="${id}"]`);

        if (todoElement) {
            todoElement.classList.add('fade-out');
            setTimeout(() => {
                this.todos = this.todos.filter(todo => todo.id !== id);
                this.saveToLocalStorage();
                this.render();
            }, 400);
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'pending':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default: // all
                return this.todos;
        }
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '<p class="empty-state">没有待办事项</p>';
        } else {
            filteredTodos.forEach(todo => {
                const todoElement = this.createTodoElement(todo);
                this.todoList.appendChild(todoElement);
            });
        }

        this.updateFilterButtons();
        this.updateSummary();
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn">🗑️</button>
        `;
        return li;
    }

    updateFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.filter === this.currentFilter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateSummary() {
        const pendingCount = this.todos.filter(todo => !todo.completed).length;
        const totalCount = this.todos.length;
        this.summaryText.textContent = `${pendingCount} 个未完成, ${totalCount} 个总计`;
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocalStorage() {
        const todosJson = localStorage.getItem('todos');
        return todosJson ? JSON.parse(todosJson) : [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});