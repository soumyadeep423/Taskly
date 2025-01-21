document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            todos.push({ 
                text: li.textContent.replace('Delete', '').trim(), 
                completed: li.classList.contains('completed') 
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        savedTodos.forEach(todo => {
            const li = createTodoElement(todo.text, todo.completed);
            todoList.appendChild(li);
        });
    }

    function createTodoElement(text, completed = false) {
        const li = document.createElement('li');
        li.textContent = text;

        if (completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';

        deleteBtn.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        li.appendChild(deleteBtn);
        return li;
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const li = createTodoElement(todoText);
        todoList.appendChild(li);

        todoInput.value = '';
        saveTodos();
    }

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    loadTodos();
});