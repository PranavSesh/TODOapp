import Category from "./categories";
import { useState } from "react";
import Entry from "./entry";


function App() {

    const [currentEditingTask, setCurrentEditingTask] = useState(null);

    const [todos, setTodos] = useState({
            "Urgent": [],
            "Daily": [],
            "Long-Term": []
        });

    function addTask(newVal, newCategory, edited=false) {
        let inputField =  document.getElementById("taskInput")
        let task = !edited ? inputField.value : newVal;
        if (!edited) inputField.value = '';
        if (task.trim().length > 0) {
            let selectElement = document.getElementById("categoryInput");
            let category = !edited ? selectElement.options[selectElement.selectedIndex].value : newCategory;
            if (todos[category].includes(task)) return;

            setTodos((todos) => ({
                ...todos,
                    [category]: [...todos[category], task]
            }))
            document.getElementById(category).style.display = "flex"
        }
    }

    return <div className="App">
        <div className="container">
            <div className="Header">
                To-Do List
                <div id={"titleSeparator"}></div>
            </div>
            {Object.keys(todos).map((category) => <Category category={category}
                                                            key={category}
                                                            setTodos={setTodos}
                                                            todos={todos}
                                                            addTask={addTask} />)}
            <Entry categories={Object.keys(todos)}
                   addTask={addTask}/>
        </div>
    </div>;
}

export default App;
