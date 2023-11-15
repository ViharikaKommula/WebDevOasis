let tasks = [];

function addTask() {
    const taskDescription = document.getElementById('newTask').value;
    const taskDeadline = new Date(document.getElementById('taskDeadline').value);
    const currentTime = new Date();

    if (taskDescription.trim() === '') {
        alert('Please enter a task description.');
        return;
    }

    if (taskDeadline <= currentTime || taskDeadline.getHours() - currentTime.getHours() < 1) {
        alert('Please choose a deadline at least one hour ahead from the present time.');
        return;
    }

    var task = {
        name: taskDescription,
        deadline: taskDeadline,
        description: document.getElementById('taskDescription').value
    };

    tasks.push(task);

    const taskElement = createTaskElement(task);
    document.getElementById('pendingTasks').appendChild(taskElement);

    document.getElementById('newTask').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskDescription').value = '';
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task">${task.name}</span>
        <span class="deadline">Deadline: ${task.deadline}</span>
        <span class="description">Description: ${task.description}</span>
        <div>
            <button class="complete-btn" onclick="completeTask(${tasks.length - 1})">Complete</button>
            <button class="delete-btn" onclick="deleteTask(${tasks.length - 1})">Delete</button>
            <button class="edit-btn" onclick="editTask(${tasks.length - 1})">Edit</button>
        </div>
    `;
    return li;
}

function completeTask(taskId) {
    tasks[taskId].completed = true;
    const taskElement = document.getElementById(`task-${taskId}`);
    taskElement.querySelector('.task').classList.add('completed');
    const completedTasks = document.getElementById('completedTasks');
    completedTasks.appendChild(taskElement);
}

function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    const taskElement = document.getElementById(`task-${taskId}`);
    taskElement.remove();
}

function editTask(taskId) {
    const task = tasks[taskId];
    const newTaskText = prompt('Edit Task:', task.name);

    if (newTaskText !== null && newTaskText !== '') {
        task.name = newTaskText;
        const taskElement = document.getElementById(`task-${taskId}`);
        taskElement.querySelector('.task').innerText = newTaskText;
    }
}

function clearCompleted() {
    const completedTasks = document.getElementById('completedTasks');
    completedTasks.innerHTML = '';
    tasks = tasks.filter(task => !task.completed);
}