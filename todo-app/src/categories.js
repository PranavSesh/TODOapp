import {useEffect, useState} from "react";

function Category({ category, todos, setTodos, addTask }) {

    function toggleCategory(category) {
        let element = document.getElementById(category);
        element.style.display === "block" ? element.style.display = "none" : element.style.display = "block";
    }

    function removeTask(taskFilter) {
        setTodos((todos) => ({
            ...todos, [category]: todos[category].filter((task) => task !== taskFilter)
        }))
    }

    function toggleEdit(index, category, undo=true) {
        let inputField = document.getElementById(index + category + "Edit");
        inputField.readOnly === true ? inputField.readOnly = false : inputField.readOnly = true;
        let confirmButton = document.getElementById(index + category + "Confirm");
        confirmButton.style.display === "none" ? confirmButton.style.display = "block" : confirmButton.style.display = "none";
        if (undo) {
            inputField.value = inputField.defaultValue;
        }
    }

    function updateTask(index, category, todoFilter) {
        let inputField = document.getElementById(index + category + "Edit");
        if (inputField.value !== inputField.defaultValue) {
            removeTask(todoFilter)
            addTask(inputField.value, category, true);
        }
        toggleEdit(index, category, false)
    }

    return (
        <div className="categorySection">
            {category}
            <button className={"toggleCategory"}
                    onClick={() => toggleCategory(category)}>Toggle {category}</button>
            <div id={category}>
                {todos[category].map((task, i) => (
                        <div className={"task"} key={i}>
                            <input id={i + category + "Edit"} readOnly={true} defaultValue={task} />
                            <button onClick={() => toggleEdit(i, category)}>Edit</button>
                            <button onClick={() => removeTask(task)}>Remove task</button>
                            <button id={i + category + "Confirm"} style={{display: "none"}} onClick={() => updateTask(i, category, task)}>Confirm</button>
                        </div>))
                }
            </div>
        </div>
    )
}

export default Category;