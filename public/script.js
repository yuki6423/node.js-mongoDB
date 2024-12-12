const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

//api/v1/taks　からたすくを取得する
const showTasks = async () => {
    try{
        // 自作のapiをたたく
        const {data: tasks} = await axios.get("/api/v1/tasks");

        //タスクが一つもないとき
        if(tasks.length < 1){
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません<h5>`
            //returnがない場合タスクがなくてもあってもほかのコードを読みに行ってしまう。
            return;
        };

        // タスクを出力
        const allTasks = tasks.map((task) => {
            const { completed, _id, name } = task;

            return `<div class="single-task ${completed && "task-completed"}">
                <h5>
                    <span><i class="fas fa-check-circle"></i></span>${name}
                </h5>
                <div class="task-links">
                    <a href="edit.html?id=${_id}" class="edit-link">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button type="button" class="delete-btn" data-id="${_id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`;
        })
        .join("");
        tasksDOM.innerHTML = allTasks;
    }catch(err) {
        console.log(err);
    }
};

showTasks();
// タスクを新規作成する
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDOM.value;

    try{
        // 一つ目nameはmodelsのTask.jsのnameを使っている
        // 二つ目nameは40行のname
        await axios.post("/api/v1/tasks", {name: name});
        showTasks();
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "タスクを追加しました。";
        formAlertDOM.classList.add("text-success");
    } catch (err){
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。もう一度やりなしてください。"
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

//タスクを削除する

tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    // 親タグを表示するmethod(parentElement)
    // delete-btnが含まれている場合という意味
    if(element.parentElement.classList.contains("delete-btn")){
        //親要素のdateの中の(classとか)のidをさしている
        const id = element.parentElement.dataset.id;
        try{
            await axios.delete(`/api/v1/tasks/${id}`)
            showTasks();
        }catch(err){
            console.log(err);
        }
    }
});