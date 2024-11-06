import { useState } from "react";

function Entry({ addTask, categories }) {

    return (
        <div className={"entryFields"}>
            <select id={"categoryInput"}>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <input id={"taskInput"} placeholder={"Enter task"}/>
            <button onClick={addTask}>Add Task</button>
        </div>
    )
}

export default Entry;