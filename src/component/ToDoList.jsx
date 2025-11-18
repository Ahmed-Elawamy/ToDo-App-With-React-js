import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// component
import ToDo from "./ToDo";
import { v4 as uuidv4 } from "uuid";

import { useState, useContext, useEffect } from "react";
import { TodosContext } from "./contexts/todosContext";

export default function ToDoList() {
    const { todos, setTodos } = useContext(TodosContext);

    const [titleInput, setTitleInput] = useState("");

    const [displayTodosType, setDisplayTodosType] = useState("all");

    // Filtration Arrays
    const completedTodos = todos.filter((t) => {
        return t.isCompleted;
    });
    const notCompletedTodos = todos.filter((t) => {
        return !t.isCompleted;
    });

    let todosTobeRendered = todos;

    if (displayTodosType == "completed") {
        todosTobeRendered = completedTodos;
    } else if (displayTodosType == "not-completed") {
        todosTobeRendered = notCompletedTodos;
    } else {
        todosTobeRendered = todos;
    }

    const todosJSX = todosTobeRendered.map((t) => {
        return <ToDo key={t.id} todo={t} />;
    });

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(storageTodos);
    }, []);

    // useEffect(() => {
    //     console.log("Calling useEffect");
    // }, [titleInput]); // Depend Chainging in titleInput
    // useEffect(() => {
    //     console.log("Calling useEffect");
    // }, [titleInput]); // Run Once Only Depend Loading page first time

    function handleAddClick() {
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            details: "",
            isCompleted: false,
        };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTitleInput("");
    }

    function changeDisplayedType(e) {
        setDisplayTodosType(e.target.value);
    }
    return (
        <Container maxWidth="sm" sx={{ direction: "rtl", textAlign: "center" }}>
            <Card sx={{ minWidth: 275 }} style={{maxHeight: "80vh", overflow: "scroll"}}>
                <CardContent>
                    <Typography variant="h2" >
                        مهامي
                    </Typography>
                    <Divider sx={{ my: 1 }} />

                    <ToggleButtonGroup
                        value={displayTodosType}
                        onChange={changeDisplayedType}
                        color="primary"
                        exclusive
                        sx={{ mt: 1, direction: "ltr" }} // مهم
                    >
                        <ToggleButton value="not-completed">
                            غير منجز
                        </ToggleButton>
                        <ToggleButton value="completed">منجز</ToggleButton>
                        <ToggleButton value="all">الكل</ToggleButton>
                    </ToggleButtonGroup>

                    {/* All Todos */}
                    {todosJSX}

                    {/* Input + Btn */}
                    <Grid container style={{ marginTop: "20px" }} spacing={2}>
                        <Grid
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                            size={8}
                            sx={{}}
                        >
                            <TextField
                                style={{ width: "100%" }}
                                id="outlined-basic"
                                label="عنوان المهمة"
                                variant="outlined"
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                            size={4}
                            sx={{}}
                        >
                            <Button
                                variant="contained"
                                style={{ width: "100%", height: "100%", transition: "0.4s" }}
                                onClick={() => {
                                    handleAddClick();
                                }}
                                disabled={titleInput.length == 0}
                            >
                                إضافة
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
