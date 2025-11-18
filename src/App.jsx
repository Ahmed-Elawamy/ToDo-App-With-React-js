import "./App.css";
import ToDoList from "./component/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./component/contexts/todosContext";
import { useState } from "react";

// Others
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
    typography: {
        fontFamily: ["AlexFont"],
    },
    palette: {
        primary: {
            main: "#dd2c00",
        },
    },
});
function App() {
    const initailTodos = [
        {
            id: uuidv4(),
            title: "انشئ مهمتك الأولى",
            details: "راقب إنجازاتك",
            isCompleted: false,
        },
    ];

    const [todos, setTodos] = useState(initailTodos);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <TodosContext.Provider value={{ todos, setTodos }}>
                    <ToDoList />
                </TodosContext.Provider>
            </div>
        </ThemeProvider>
    );
}

export default App;
