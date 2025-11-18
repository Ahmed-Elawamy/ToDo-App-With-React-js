/* eslint-disable react/prop-types */
import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";

// Dialog Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { useContext } from "react";
import { TodosContext } from "./contexts/todosContext";
import TextField from "@mui/material/TextField";
import { Height } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ToDo({ todo }) {
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    const [open, setOpen] = useState(false);

    const [updatedToDo, setUpdatedToDo] = useState({
        title: todo.title,
        details: todo.details,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { todos, setTodos } = useContext(TodosContext);

    function handleCheckClick() {
        const updatedTodos = todos.map((t) => {
            if (t.id == todo.id) {
                t.isCompleted = !t.isCompleted;
            }
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    function handleDeleteConfirm() {
        const updatedTodos = todos.filter((t) => {
            return t.id != todo.id;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    function handleUpdateClose() {
        setShowUpdateDialog(false);
    }
    function handleUpdateClick() {
        setShowUpdateDialog(true);
    }
    function handleUpdateConfirm() {
        const updatedTodos = todos.map((t) => {
            if (t.id == todo.id) {
                return {
                    ...t,
                    title: updatedToDo.title,
                    details: updatedToDo.details,
                };
            } else {
                return t;
            }
        });
        setTodos(updatedTodos);
        setShowUpdateDialog(false);
    }
    return (
        <>
            {/* Delete Dialog */}

            <Dialog
                style={{ direction: "rtl" }}
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"هل أنت متأكد من حذف هذه المهمة"}</DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>لا</Button>
                    <Button onClick={handleDeleteConfirm}> نعم احذف</Button>
                </DialogActions>
            </Dialog>

            {/* End Delete Dialog */}

            {/* UPDATE DIALOG */}
            <Dialog
                style={{ direction: "rtl" }}
                open={showUpdateDialog}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleUpdateClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"عدِّل المهمة"}</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="عنوان المهمة"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={updatedToDo.title}
                        onChange={(e) =>
                            setUpdatedToDo({
                                ...updatedToDo,
                                title: e.target.value,
                            })
                        }
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="تفاصيل"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={updatedToDo.details}
                        onChange={(e) =>
                            setUpdatedToDo({
                                ...updatedToDo,
                                details: e.target.value,
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>اغلق</Button>
                    <Button onClick={handleUpdateConfirm}> تأكيد</Button>
                </DialogActions>
            </Dialog>

            {/*=== End UPDATE DIALOG ===*/}
            <Card
                className="todocard"
                sx={{
                    minWidth: { xs: "90%", sm: 500 }, // 90% عرض الشاشة على الهواتف، 500px على الشاشات الكبيرة
                    width: "100%", // لتجنب تجاوز الشاشة
                    background: "#283593",
                    color: "white",
                    mt: 5,
                    p: 1,
                    direction: "rtl",
                    mx: "auto", // تمركز الكارد أفقياً
                }}
            >
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        {/* النص */}
                        <Grid size={6} style={{ textAlign: "right" }}>
                            <Typography
                                style={{
                                    fontSize: "20px",
                                    textDecoration: todo.isCompleted
                                        ? "line-through"
                                        : "none",
                                }}
                                variant="h4"
                            >
                                {todo.title}
                            </Typography>
                            <Typography
                                style={{ fontSize: "15px" }}
                                variant="h6"
                            >
                                {todo.details}
                            </Typography>
                        </Grid>

                        {/* الأيقونات */}
                        <Grid
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                            size={6}
                            sx={{
                                gap: 1,
                            }}
                        >
                            {/* Check  Icon Button */}
                            <IconButton
                                onClick={() => handleCheckClick()}
                                className="iconButton"
                                sx={{
                                    color: todo.isCompleted
                                        ? "white"
                                        : "8bc34a",
                                    background: todo.isCompleted
                                        ? "#8bc34a"
                                        : "white",
                                    border: "1px solid #8bc34a",
                                }}
                            >
                                <CheckIcon />
                            </IconButton>
                            {/* End Check  Icon Button */}

                            {/*== Start Edit ==*/}
                            <IconButton
                                onClick={handleUpdateClick}
                                className="iconButton"
                                sx={{
                                    color: "#1769aa",
                                    background: "white",
                                    border: "1px solid #1769aa",
                                }}
                            >
                                <ModeEditOutlinedIcon />
                            </IconButton>
                            {/*== Start Edit ==*/}

                            {/* Delete Button */}
                            <IconButton
                                onClick={handleClickOpen}
                                className="iconButton"
                                sx={{
                                    color: "#b23c17",
                                    background: "white",
                                    border: "1px solid #b23c17",
                                }}
                            >
                                {/* Delete Button */}
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
