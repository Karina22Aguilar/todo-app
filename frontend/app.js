const API_URL = 'http://localhost:3000';

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', loadTasks);

// Función para cargar todas las tareas
async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const tasks = await response.json();
        
        renderTasks(tasks);
        updateTasksCount(tasks.length);
    } catch (error) {
        console.error('Error cargando tareas:', error);
        alert('Error al cargar las tareas');
    }
}

// Función para renderizar las tareas en la lista
function renderTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskItem.innerHTML = `
            <div class="task-content" onclick="toggleTask(${task.id}, ${!task.completed})">
                <span class="task-title">${task.title}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
        `;

        tasksList.appendChild(taskItem);
    });
}

// Función para agregar nueva tarea
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value.trim();

    if (!title) {
        alert('Por favor escribe una tarea');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title })
        });

        if (response.ok) {
            taskInput.value = '';
            loadTasks(); // Recargar la lista
        } else {
            throw new Error('Error al crear tarea');
        }
    } catch (error) {
        console.error('Error agregando tarea:', error);
        alert('Error al agregar la tarea');
    }
}

// Función para alternar estado de tarea (completada/pendiente)
async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed })
        });

        if (response.ok) {
            loadTasks(); // Recargar la lista
        } else {
            throw new Error('Error al actualizar tarea');
        }
    } catch (error) {
        console.error('Error actualizando tarea:', error);
        alert('Error al actualizar la tarea');
    }
}

// Función para eliminar tarea
async function deleteTask(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadTasks(); // Recargar la lista
        } else {
            throw new Error('Error al eliminar tarea');
        }
    } catch (error) {
        console.error('Error eliminando tarea:', error);
        alert('Error al eliminar la tarea');
    }
}

// Función para actualizar contador de tareas
function updateTasksCount(count) {
    document.getElementById('tasksCount').textContent = `Total: ${count} tareas`;
}

// Permitir agregar tarea con Enter
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
