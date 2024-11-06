import { useState } from "react";

function Category({ category, todos, setTodos, addTask }) {
    const [currentEditingTask, setCurrentEditingTask] = useState(null);
    const [editedText, setEditedText] = useState("");

    function toggleCategory(category) {
        const element = document.getElementById(category);
        element.style.display = element.style.display === "block" ? "none" : "block";
    }

    function removeTask(taskFilter) {
        setTodos((todos) => ({
            ...todos,
            [category]: todos[category].filter((task) => task !== taskFilter),
        }));
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
            addTask(editedText, category, true);
        }
        setCurrentEditingTask(null);
    }

    return (
        <div className="categorySection">
            <>{category}</>
            <button
                className="toggleCategory"
                onClick={() => toggleCategory(category)}
            >
                Toggle {category}
            </button>
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
                                <>
                                    <button
                                        className="confirmButton"
                                        onClick={() => updateTask(i, category, task)}
                                    > Confirm </button>
                                    <button
                                        className="cancelButton"
                                        onClick={() => toggleEdit(i, task, true)}
                                    > Cancel </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="removeTaskButton"
                                        onClick={() => removeTask(task)}
                                    > Remove
                                    </button>
                                    <button
                                        className="editButton"
                                        onClick={() => toggleEdit(i, task)}
                                    > Edit
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Category;
