import { useState } from "react";

function Entry({ setTodos, todos, categories }) {
    const [category, setCategory] = useState(categories[0]);
    const [task, setTask] = useState("");

    function addTask() {
        if (task.trim().length > 0) {
            setTodos([...todos, {task: task, category: category}])
             let element = document.getElementById(category);
             element.style.display = "block"
        }
    }

    return (
        <div className={"entryFields"}>
            <select onChange={(e) => setCategory(e.target[e.target.selectedIndex].value)}>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <input onChange={(e) => setTask(e.target.value)} placeholder={"Enter task"}/>
            <button onClick={addTask}>Add Task</button>
        </div>
    )
}

export default Entry;