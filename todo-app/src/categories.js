import { useState } from "react";

function Category({ category, todos, setTodos, addTask }) {
    const [currentEditingTask, setCurrentEditingTask] = useState(null);
    const [editedText, setEditedText] = useState("");

    function toggleCategory(category) {
        const categorySection = document.getElementById(category);
        categorySection.style.display = categorySection.style.display === "flex" ? "none" : "flex";
        const toggleCategoryButton = document.getElementById("toggleButtonText" + category);
        toggleCategoryButton.innerText = toggleCategoryButton.innerText === "<" ? "=" : "<";
    }

    function removeTask(taskFilter) {
        setTodos((todos) => ({
            ...todos,
            [category]: todos[category].filter((task) => task !== taskFilter),
        }));
        setCurrentEditingTask(null);
    }

    function toggleEdit(index, task, isCancel = false) {
        const taskId = `${index}-${category}`;

        if (currentEditingTask && currentEditingTask !== taskId) return;

        if (currentEditingTask === taskId) {
            if (isCancel) setEditedText(task);
            setCurrentEditingTask(null);
        } else {
            setCurrentEditingTask(taskId);
            setEditedText(task);
        }
    }

    function updateTask(index, category, originalTask) {
        if (editedText.trim() && editedText !== originalTask) {
            removeTask(originalTask);
            const index = todos[category].indexOf(originalTask)
            addTask(editedText, category, true, index);
        }
        setCurrentEditingTask(null);
    }

    return (
        <div className="categorySection">
            <div>
                <h3 id={"catHeader"}>{category}</h3>
                <button
                    className="toggleCategory"
                    onClick={() => toggleCategory(category)}
                >
                    <label id={"toggleButtonText" + category}>{"<"}</label>
                </button>
            </div>

            <div className={"categorySeparator"}></div>
            <div id={category} className={"todoList"}>
                {todos[category].map((task, i) => {
                    const taskId = `${i}-${category}`;
                    const isEditing = currentEditingTask === taskId;

                    return (
                        <div className="task" key={taskId}>
                            {isEditing ? (
                                <textarea
                                    className="taskEditField"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                />
                            ) : (
                                <textarea readOnly={true} className="taskDisplayField" value={task} />
                            )}
                            {isEditing ? (
                                <div>
                                    <button
                                        className="confirmButton"
                                        onClick={() => updateTask(i, category, task)}
                                    > Confirm
                                    </button>
                                    <button
                                        className="cancelButton"
                                        onClick={() => toggleEdit(i, task, true)}
                                    > Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="removeTaskButton"
                                        onClick={() => removeTask(task)}
                                    > Done
                                    </button>
                                    <button
                                        className="editButton"
                                        onClick={() => toggleEdit(i, task)}
                                    > Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Category;
