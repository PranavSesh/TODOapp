
function Category({ categoryName, todos, setTodos }) {

    function toggleTodos(categorySpecifier) {
        let element = document.getElementById(categorySpecifier);
        element.style.display === "block" ? element.style.display = "none" : element.style.display = "block";
    }

    function removeTask(todoAtr) {
        let temp = todos.filter((todo) => todo !== todoAtr);
        setTodos(temp);
    }

    return (
        <div className="categorySection">
            <button className={"toggleCategory"}
                    onClick={() => toggleTodos(categoryName)}>Toggle {categoryName}</button>
            {categoryName}
            <div id={categoryName}>
                {todos.map((todo, i) => (
                    todo.category === categoryName ?
                    <div className={"task"} key={i}>
                        {todo.task}
                        <button onClick={() => removeTask(todo)}>Remove task</button>
                    </div> : <div key={i}></div>)
                )}
            </div>
        </div>
    )
}


export default Category;