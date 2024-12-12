const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"タスクを入れてください"],
        trim: true,
        maxlength: [20,"タスク名は２０文字以内で入力してください。"]
    },
    completed: {
        type:Boolean,
        default:false,
    },
});
// idは自動的に作られる
module.exports = mongoose.model("Task",TaskSchema);