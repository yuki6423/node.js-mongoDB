const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const tskCompletedDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

// 一つの特定のタスクを所得する
const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
        const { completed, _id, name } = task;
        taskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        if(completed){
            tskCompletedDOM.checked = true;
        };
    }catch(err){    
        console.log(err);
    }
};

showTask();

//タスクの編集
editFormDOM.addEventListener("submit",  async (e) =>{
    e.preventDefault();
    try{
        const taskName = taskNameDOM.value;
        taskCompleted = tskCompletedDOM.checked;
        const {data:task} = await axios.patch(`/api/v1/tasks/${id}`,{
            name : taskName,
            completed: taskCompleted,
        });
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "編集に成功しました。";
        formAlertDOM.classList.add("text-success");
    }catch(err){
        console.log(err)
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});