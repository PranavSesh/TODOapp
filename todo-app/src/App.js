import Category from "./categories";
import { useState } from "react";


function App() {

    const [todos, setTodos] = useState({
            "Urgent": [],
            "Daily": [],
            "Long-Term": []
        });

    function addTask(newVal, newCategory, edited=false, index=0) {
        let inputField =  document.getElementById("taskInput")
        let task = !edited ? inputField.value : newVal;
        if (!edited) inputField.value = '';
        if (task.trim().length > 0) {
            let selectElement = document.getElementById("categoryInput");
            let category = !edited ? selectElement.options[selectElement.selectedIndex].value : newCategory;
            if (todos[category].includes(task)) return;

            setTodos((todos) => ({
                ...todos,
                    [category]: [...todos[category].slice(0, index), task, ...todos[category].slice(index)]
            }))
            const cat = document.getElementById(category);
            cat.style.display = "flex";
            const catButton = document.getElementById("toggleButtonText" + category);
            catButton.innerText = "=" ;
        }
    }

    return <div>
        <div className="container">
            <div className="Header">
                To-Do List
            </div>
            {Object.keys(todos).map((category) => <Category category={category}
                                                            key={category}
                                                            setTodos={setTodos}
                                                            todos={todos}
                                                            addTask={addTask}/>)}
            <div className={"entryFields"}>
                <select id={"categoryInput"}>
                    {Object.keys(todos).map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
                <textarea id={"taskInput"} placeholder={"Enter task"}/>
                <button id={"addTaskButton"} onClick={addTask}>Add Task</button>
            </div>
        </div>
    </div>;
}

export default App;
