(function(){

// создаём и возращаем заголовок приложения
function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}

// создаём и возращаем форму для создания дела
function createTodoItemForm() {
    const form = document.createElement('form'),
          input = document.createElement('input'),
          buttonWraper = document.createElement('div'),
          button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control'); 
    input.placeholder = 'Введите название нового дела';
    buttonWraper.classList.add('input-group-apennd');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWraper.append(button);
    form.append(input);
    form.append(buttonWraper);

    return {
        form, 
        input, 
        button,
    };
}

function createTodoList() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItem(name) {
    const item = document.createElement('li');
    //кнопки помещаем в элемент который покажет их в одной группе
    const buttonGroup = document.createElement('div'),
          doneButton = document.createElement('button'),
          deleteButton = document.createElement('button');
    //устанавливаем стили для этих элементов списка, а так же размещения кнопок в его првой части с помощью flex
    item.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    //Вкладываем кнопкив в отдельный элемент, что бы они объединились в один блок.
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    //приложению нужен доступ к самому элементу и кнопкам, что бы обработать события нажатия 
    return{
        item, doneButton, deleteButton
    };
}

function createTodoApp(container, title = 'список дел') {

    const todoAppTitle = createAppTitle(title),
          todoItemForm = createTodoItemForm(),
          todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    //браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e){
        e.preventDefault();
        /*  эта строчка необходима для того что бы предотвратить стандартное действие браузера. (что бы не перезагружалась страница) */
        
        //игнорируем создание элемента если пользователь ничего не ввёл
        if (!todoItemForm.input.value) {
            return;
        }

        // код заменён >>>
        // //создаём и добовляем список новое дело с названием из поля для ввода
        // todoList.append(createTodoItem(todoItemForm.input.value).item);
        let todoItem = createTodoItem(todoItemForm.input.value);

        todoItem.doneButton.addEventListener('click', function() {
            todoItem.item.classList.toggle('list-group-item-success');
        });
        todoItem.deleteButton.addEventListener('click', function() {
            if(confirm('Вы уверены?')) {
                todoItem.item.remove();
            }
        });

        // создаём и добавляем в список новое дело с названием из поля для ввода.
        todoList.append(todoItem.item);


        //обнуляем значение в поле, что бы не пришлось стирать его в ручную
        todoItemForm.input.value = '';
    });
}

// если нужно расположить несколько дела на разных страницах
window.createTodoApp = createTodoApp;

// если нужно расположить несколько дел на одной странице
// document.addEventListener('DOMContentLoaded', function() {
//     createTodoApp(document.getElementById('my-todos'), 'Мои дела');
//     createTodoApp(document.getElementById('mom-todos'), 'Дела для мамы');
//     createTodoApp(document.getElementById('dad-todos'), 'Дела для папы');
// });


})();

