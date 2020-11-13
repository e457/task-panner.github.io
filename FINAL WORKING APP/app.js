//Task One - include a click event, user input info displayed - include DOM 
document.querySelector('#addbutton').addEventListener('click', function(){
    const inputName = document.querySelector('#nameInput').value;
    const inputAssignedTo = document.querySelector('#assignedInput').value;
    const inputDescription = document.querySelector('#descriptionInput').value;
    const inputDueDate = document.querySelector('#dateInput').value;
    const inputStatus = document.querySelector('#statusInput').value;



    let allChecksPassed = validateForm(inputName, inputAssignedTo, inputDescription, inputDueDate, inputStatus);

    if(allChecksPassed == true){
        createTaskObject(inputName, inputAssignedTo, inputDescription, inputDueDate, inputStatus, myTaskManager.allTasks);
        let taskIndex = myTaskManager.allTasks.length-1;
        //test
        console.log(myTaskManager.allTasks[taskIndex]);
        myTaskManager.addTask(myTaskManager.allTasks[taskIndex])
    }

    
})

//Add event Listener, global event listener - button type*needs to be capital letters*
document.addEventListener('click', function(event){
    const isButton = (event.target.nodeName == 'BUTTON');
    if(isButton) {
        const element = event.target;
        myTaskManager.deleteTask(element);
    }  

})


//TASK 3 : Create Validation - create an if statement w/ logic, Des's length has to be more than 10 to appear on the cards

function validateForm(inputName, inputAssignedTo, inputDescription, inputDueDate, inputStatus) {
    //return of this is the answer to 'is the info valid format?'
    let isAllValid = false;

    if((inputName.length >= 3) && (inputAssignedTo.length >= 3) && (inputDescription.length >=10) && (inputDueDate) && (inputStatus != 'Choose...')){
        isAllValid =true;
    }

    return isAllValid;  
}

//Teneary Operator needs to be included for the ID, ID is not shown 
function createTaskObject(inputName, inputAssignedTo, inputDescription, inputDueDate, inputStatus, myTaskArray){
    myTaskManager.allTasks.push({
       "Name": inputName,
       "AssignedTo": inputAssignedTo,
       "Description": inputDescription,
       "DueDate": inputDueDate,
       "Status": inputStatus,
       "ID": `${myTaskArray.length < 1 ? 1 : myTaskArray.length+1}`
    })


    localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
    return myTaskManager.allTasks ;
}

// OOP - include class, constructor, this. + console.log it

class TaskManager {
    constructor(name){
        this.allTasks = [];
        this.name = name;
    }

    getAllTasks(){
        console.log(this.allTasks);


    }


    addTask(taskObj){

 //Appeareance of the cards, to display the user input (interpolates)

        let cardHTML =   `<div class="col-md-4" taskID="${taskObj.ID}">
                        <div class="card cardStyle">
                            <div class="card-header">
                                Task
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Name: ${taskObj.Name} </li>
                                <li class="list-group-item">Assigned To: ${taskObj.AssignedTo} </li>
                                <li class="list-group-item">Due Date: ${taskObj.DueDate} </li>
                                <li class="list-group-item">Description : ${taskObj.Description} </li>
                                <li class="list-group-item">Status: ${taskObj.Status} </li>
                            </ul>
                            <button type="button" class="btn btn-dark" job="delete" deleteID="${taskObj.ID}">Delete</button>
                        </div>
                    </div>`

        let cardsHTMLrow = document.querySelector('#cardsArea');
        cardsHTMLrow.innerHTML += cardHTML;

// content list group - to appear at the same time as the cards

        let listHTML = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskID="${taskObj.ID}">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Assigned To: ${taskObj.AssignedTo} </h5>
                            <small>Due Date: ${taskObj.DueDate} </small>
                        </div>
                        <small>Status: ${taskObj.Status}</small>
                        </a>`

        let listHTMLrow = document.querySelector('#tasksList');
        listHTMLrow.innerHTML += listHTML;          

    }

    deleteTask(element){
            
    //item removal from the array 

    let thistaskID = element.parentNode.parentNode.attributes.taskID.value;
    for(let i=0; i < this.allTasks.length; i++){
        if(this.allTasks[i].ID == thistaskID){
            this.allTasks.splice(i,1);
            localStorage.setItem("taskArray", JSON.stringify(myTaskManager.allTasks));
        }
    }

    console.log(this.allTasks);

    //removes card 
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)

    //removes task
    let elementsA = document.querySelectorAll('a');
    for(let i=0; i < elementsA.length; i++){
        element = elementsA[i];
        if(element.attributes.taskID.value == thistaskID){
            element.parentNode.removeChild(element);
        }
    }

    }

    
}



let myTaskManager = new TaskManager("observeTask");


//this gets the data back from local storage
let dataReturned = localStorage.getItem("taskArray");

if(dataReturned){
    myTaskManager.allTasks = JSON.parse(dataReturned);
    populatePage(myTaskManager.allTasks)
} else {
    myTaskManager.taskArray = [];
}


function populatePage(array){
    for(let i=0; i < array.length; i++){
        myTaskManager.addTask(array[i]);
    }
}











