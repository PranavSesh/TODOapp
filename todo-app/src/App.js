import Title from "./title";
import Category from "./categories";
import {useEffect, useState} from "react";
import Entry from "./entry";


function App() {

    const [todos, setTodos] = useState([]);
    const categories = ["Urgent", "Daily", "Long-Term"]

    return <div className="App">
        <div className="container">
          <Title />
            {categories.map((category) => <Category categoryName={category}
                                                     key={category}
                                                     setTodos={setTodos}
                                                     todos={todos} />)}
          <Entry categories={categories} todos={todos} setTodos={setTodos} />
        </div>
    </div>;
}

export default App;
