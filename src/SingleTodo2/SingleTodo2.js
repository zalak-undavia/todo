import { useState } from "react";
import "./SingleTodo2.css";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

import useSound from "use-sound";
import Highlighter from "react-highlight-words";

import DeleteConfirmationModal from "./DeleteConfirmationModal";
import TodoDetailModal from "./TodoDetailModal";

export default function SingleTodo2({ todo, searchInput, onTodoUpdate, onTodoDelete, onTodoDone }) {
    const [playDoneTodoSound] = useSound("./tap.mp3");

    const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
    const [isTodoDetailModalOpen, setIsTodoDetailModalOpen] = useState(false);

    const onDoneUpdate = () => {
        const updatedTodo = { ...todo, timeWhenEdited: Date.now() };
        updatedTodo.done = !updatedTodo.done;

        if (updatedTodo.done) {
            playDoneTodoSound();
        }

        onTodoDone(updatedTodo);
    };

    const onDeleteCancel = () => {
        setIsDeleteConfirmationModalOpen(false);
    };

    const onDeleteConfirm = () => {
        setIsDeleteConfirmationModalOpen(false);
        onTodoDelete(todo);
    };

    return (
        <>
            <Paper sx={{ my: 1, mx: 1 }} elevation={4}>
                <div className="single-todo">
                    <div className="todo-row-one">
                        <Checkbox sx={{ marginRight: "5px" }} checked={todo.done} onChange={onDoneUpdate} />

                        <Typography
                            className={todo.done && "done-todo"}
                            sx={{ flex: "1", display: "flex", alignSelf: "center" }}
                            variant="h6"
                        >
                            <Highlighter
                                highlightClassName="YourHighlightClass"
                                searchWords={[searchInput]}
                                autoEscape={true}
                                textToHighlight={todo.name.slice(0, 1).toUpperCase() + todo.name.slice(1)}
                            />
                        </Typography>

                        {!todo.done && (
                            <IconButton sx={{ mx: "5px" }} onClick={() => setIsTodoDetailModalOpen(true)}>
                                <EditIcon />
                            </IconButton>
                        )}

                        <IconButton sx={{ mx: "5px" }} onClick={() => setIsDeleteConfirmationModalOpen(true)}>
                            <DeleteIcon />
                        </IconButton>

                        {!todo.done && (
                            <IconButton className="drag-handle">
                                <DragHandleIcon />
                            </IconButton>
                        )}
                    </div>

                    {todo.description !== "" && (
                        <div className="todo-row-two">
                            <Typography
                                sx={{
                                    width: "min(100%, 800px)",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                    wordBreak: "break-all",
                                    overflow: "hidden",
                                }}
                            >
                                Description : {todo.description}
                            </Typography>
                        </div>
                    )}
                    <div className="todo-row-three">
                        <div>Time: {new Date(todo.timeWhenCreated).toLocaleString()}</div>
                        {todo.timeWhenEdited && (
                            <div>Edited Time: {new Date(todo.timeWhenEdited).toLocaleString()}</div>
                        )}
                    </div>
                </div>
            </Paper>
            {isTodoDetailModalOpen && (
                <TodoDetailModal
                    todo={todo}
                    onTodoUpdate={(todo) => {
                        setIsTodoDetailModalOpen(false);
                        onTodoUpdate(todo);
                    }}
                    onCancel={() => setIsTodoDetailModalOpen(false)}
                />
            )}
            {isDeleteConfirmationModalOpen && (
                <DeleteConfirmationModal onCancel={onDeleteCancel} onConfirm={onDeleteConfirm} />
            )}
        </>
    );
}

// const now = Date.now() <- Current instant in ms
// Have tare ene human readable format ma laavvi hoi tom
// const time = new Date(now);
// time.toLocaleString()
// time.toISOString();
