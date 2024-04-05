import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";

import "./TodoDetailModal.css";
import BootstrapDialog from "./BootstrapDialog";
import SubTask from "./SubTask";

export default function TodoDetailModal({ todo, onTodoUpdate, onCancel }) {
    const [localTodo, setLocalTodo] = useState(todo);

    const onNameUpdate = (e) => {
        setLocalTodo({ ...localTodo, name: e.target.value });
    };

    const onDescriptionUpdate = (e) => {
        setLocalTodo({ ...localTodo, description: e.target.value });
    };

    const onCommitChanges = (e) => {
        console.log("localtodo", localTodo);
        localTodo.subTasks = localTodo.subTasks.filter((v, i) => {
            return v.subTaskName !== "";
        });

        e.preventDefault();
        onTodoUpdate({ ...localTodo, timeWhenEdited: Date.now() });
    };

    const onDeleteSubTask = (i) => {
        localTodo.subTasks.splice(i, 1);
        setLocalTodo({ ...localTodo });
    };
    const onAddSubTask = () => {
        const subTask = {
            subTaskChecked: false,
            subTaskName: "",
            isEditModeOn: true,
        };
        setLocalTodo({ ...localTodo, subTasks: [...localTodo.subTasks, subTask] });
    };

    const onTaskUpdate = (task, index) => {
        localTodo.subTasks[index] = task;
        setLocalTodo({ ...localTodo });
    };

    return (
        <BootstrapDialog open fullWidth>
            <DialogTitle>
                Update Todo "{localTodo.name.slice(0, 1).toUpperCase() + localTodo.name.slice(1)}"
            </DialogTitle>

            <DialogContent dividers sx={{ height: "70vh" }}>
                <form id="save-changes-btn-id" className="save-from" onSubmit={onCommitChanges}>
                    <TextField
                        autoFocus
                        sx={{ marginBottom: 2 }}
                        label="Name"
                        fullWidth
                        value={localTodo.name}
                        onChange={onNameUpdate}
                    />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={localTodo.description}
                        onChange={onDescriptionUpdate}
                    ></TextField>
                </form>

                <Button onClick={() => onAddSubTask()} variant="text" startIcon={<AddIcon />}>
                    Add-sub-task
                </Button>
                <div className="task-and-category-list">
                    <div className="sub-task-container">
                        {localTodo.subTasks.map((v, i) => {
                            return (
                                <div key={i}>
                                    <div>{console.log("v", v)}</div>
                                    <SubTask
                                        task={v}
                                        onDeleteSubTask={() => onDeleteSubTask(i)}
                                        onTaskUpdate={(task) => onTaskUpdate(task, i)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button sx={{ mx: 2 }} onClick={onCancel}>
                    Cancel
                </Button>
                <Button form="save-changes-btn-id" type="submit" variant="contained" color="success">
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
