const userContainer = document.getElementById('container');

const getUsers = async () => {
  const response = await fetch('https://dummyjson.com/todos?limit=12');
  const data = await response.json();
  return data.todos;
};

const displayUsers = async () => {
  const users = await getUsers();
  users.forEach(item => {
    const div = document.createElement('div');
    const userName = document.createElement('input');
    const ids = document.createElement('span');
    const checkbox = document.createElement('input');
    const icon = document.createElement('i');

    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    icon.classList.add('fa', 'fa-trash');
    ids.appendChild(icon);
    userName.value = item.todo;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });

    icon.addEventListener('click', () => {
      deleteUser(item.id);
      div.remove();
    });

    div.appendChild(checkbox);
    div.appendChild(userName);
    div.appendChild(ids);
    div.setAttribute('key', item.id);
    div.setAttribute('class', 'people');
    userContainer.appendChild(div);
  });
};

const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.log(error);
  }
};

displayUsers();

const addForm = document.getElementById('addForm');
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const newTask = taskInput.value;
  taskInput.value = '';

  if (newTask) {
    const div = document.createElement('div');
    const userName = document.createElement('input');
    const ids = document.createElement('span');
    const checkbox = document.createElement('input');
    const icon = document.createElement('i');

    checkbox.type = 'checkbox';
    checkbox.checked = false;
    icon.classList.add('fa', 'fa-trash');
    ids.appendChild(icon);
    userName.value = newTask;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });

    div.appendChild(checkbox);
    div.appendChild(userName);
    div.appendChild(ids);
    div.setAttribute('key', Date.now());
    div.setAttribute('class', 'people');
    userContainer.prepend(div);
  }
});
