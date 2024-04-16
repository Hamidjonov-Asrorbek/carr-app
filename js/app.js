// const fullDay = document.getElementById('full-day');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const title_time = document.getElementById('title_time');
const formCreate = document.getElementById('form-create');
const inputCreate = document.getElementById('inputCreate');
const messageCreate = document.getElementById('message-create');
const messageCreateUrl = document.getElementById('message-create-url');
const formEdit = document.getElementById('form-edit');
const inputEdit = document.getElementById('inputEdit');
const listGroupTodo = document.getElementById('list-group-todo');
const closeEl = document.getElementById('close');
const add_btn = document.getElementById('add_btn');
const carName = document.getElementById('carName');
const speed = document.getElementById('speed');
const price = document.getElementById('price');
const imageUrl = document.getElementById('imageUrl');
const color = document.getElementById('color');


let carArr = JSON?.parse(localStorage.getItem('todos')) ? JSON?.parse(localStorage.getItem('todos')) : [];
createTodos(carArr);

// show error message
function ShowError(where, message){
    document.getElementById(`${where}`).textContent = message;
    
    setTimeout(() =>{
        document.getElementById(`${where}`).textContent = ''
        carNameEdit.value = ''
        speedEdit.value = ''
        priceEdit.value = ''
        imageUrl.value = ''
        inputCreate.value = '';
    }, 2000)
}

// form create submit

formCreate.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    let todo = {
        id: Math.floor(Math.random()*10000000),
        time: getTime(),
        carName: carName.value.trim(),
        speed: speed.value.trim(),
        price: price.value.trim(),
        imageUrl: imageUrl.value.trim(),
        color: color.value,
        completed: false,
        // time: getTime(),
    }
    if(todo.carName.length && todo.imageUrl.length && todo.imageUrl.includes("https://") && todo.speed>0 && todo.price>0){
        carArr.push(todo);
        localStorage.setItem("todos", JSON.stringify(carArr));
        carName.value = ""
        speed.value = ""
        price.value = ""
        imageUrl.value = ""
        color.value = "#000000"
        createTodos(carArr);
    }
    else{
        ShowError("message-create", "Please enter the text !")
        ShowError("message-create-url", "Please enter the image url !")
        ShowError("message-create-speed", "Please enter a positive number !")
        ShowError("message-create-price", "Please enter a positive number !")
    }
    
})



// create todo

function createTodos(data){
    listGroupTodo.innerHTML = ""
    carArr.forEach(({id, carName, speed, price, imageUrl, color, time}) => {
        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        ul.innerHTML = `
                        <li class='list-group-item'><img src="${imageUrl}" width='230' height='150' alt="car image">
                        </li>
                        <li class='list-group-item'><h3>${carName}</h3></li>
                        <li class='list-group-item'><h6>Speed: </h6>${speed} km/s</li>
                        <li class='list-group-item'><h6>Price: </h6>${price} $</li>
                        <li class='list-group-item'><h6>Color: </h6>${color} <span class='carColor' style="background: ${color};"></span></li>
                        <li class='list-group-item'>
                            <span class='opacity-50 me-5'>${time}</span>
                            <img src="./img/edit.svg" class = 'me-1' width='25' onclick="editTodo(${id})" alt="edit">
                            <img src="./img/delete.svg" width='25' onclick="deletTodo(${id})" alt="delete">
                        </li>`
        listGroupTodo.appendChild(ul)
        
    });
}



// delete todo
function deletTodo(itemId){
    carArr = carArr.filter(({id}) => id !== itemId);
    createTodos(carArr)
    localStorage.setItem("todos", JSON.stringify(carArr));

}

// edit todo

function editTodo(itemId){
    open();

    function editForm(e){
            e.preventDefault();
            if(carNameEdit.value.trim().length && imageUrlEdit.value.length && imageUrlEdit.value.includes("https://") && speedEdit.value>0 && priceEdit.value>0){
                carArr = carArr.map((item) =>{
                    if(item.id === itemId){
                        return {...item, 
                            carName: carNameEdit.value.trim(), 
                            speed: speedEdit.value.trim(),
                            price: priceEdit.value.trim(),
                            imageUrl: imageUrlEdit.value.trim(),
                            color: colorEdit.value,
                            time: getTime(),
                            };
                    }
                    return item;
                });
                close();
                createTodos(carArr);
                carNameEdit.value = ''
                speedEdit.value = ''
                priceEdit.value = ''
                imageUrlEdit.value = ''

                localStorage.setItem("todos", JSON.stringify(carArr));
                e.target.reset();
            }
            else{
                carNameEdit.value = ''
                ShowError("message-edit", "Please enter todo");
                ShowError("message-edit-url", "Please enter the image url !");
                ShowError("message-edit-speed", "Please enter a positive number !");
                ShowError("message-edit-price", "Please enter a positive number !");
            }
            return formEdit.removeEventListener("submit", editForm)
        }

    formEdit.addEventListener("submit", editForm);
    
};

closeEl.addEventListener("click", () =>{
    close()
})
overlay.addEventListener("click", () =>{
    close()
})

function open(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    
}

function close(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// time 

function getTime(){
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    // fullDay.textContent = date;
    // title_time.textContent = time;
    return `${hour}:${minute}, ${date}`;
}
// setInterval(getTime ,1000);