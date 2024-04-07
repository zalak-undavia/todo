import { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { v4 as uuidv4 } from "uuid";

import EmptyList from "../EmptyList/EmptyList";
import SingleTodo2 from "../SingleTodo2/SingleTodo2";

import { useAuth } from "../auth";

import "./TodoListPage.css";

export default function TodoListPage() {
    const [inputValue, setInputValue] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [openClearAllModal, setOpenClearAllModal] = useState(false);

    const [data, setData] = useState([]);
    const [doneData, setDoneData] = useState([]);

    const auth = useAuth();

    const onDrop = ({ removedIndex, addedIndex }) => {
        setData((items) => arrayMoveImmutable(items, removedIndex, addedIndex));
    };

    const onTodoDone = (todo, index) => {
        if (todo.done) {
            data.splice(index, 1);

            setData([...data]);
            setDoneData([...doneData, todo]);
        } else {
            doneData.splice(index, 1);

            setDoneData([...doneData]);
            setData([...data, todo]);
        }
    };

    const onTodoUpdate = (todo, index) => {
        data[index] = todo;
        setData([...data]);
    };

    const doneCount = doneData.length;
    const totalCount = data.length + doneData.length;

    const renderListSection = () => {
        return (
            <div className="list-of-todos">
                <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
                    {data
                        .filter((v) => {
                            return v.name.includes(searchInput);
                        })
                        .map((v, i) => {
                            return (
                                <Draggable key={v.id}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ flex: 1 }}>
                                            <SingleTodo2
                                                todo={v}
                                                searchInput={searchInput}
                                                onTodoDone={(t) => onTodoDone(t, i)}
                                                onTodoUpdate={(todoObj) => onTodoUpdate(todoObj, i)}
                                                onTodoDelete={() => {
                                                    data.splice(i, 1);
                                                    setData([...data]);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Draggable>
                            );
                        })}
                </Container>
                {doneData
                    .filter((v) => {
                        return v.name.includes(searchInput);
                    })
                    .map((v, i) => {
                        return (
                            <div key={v.id} style={{ display: "flex" }}>
                                <div style={{ flex: 1 }}>
                                    <SingleTodo2
                                        todo={v}
                                        searchInput={searchInput}
                                        onTodoDone={(t) => onTodoDone(t, i)}
                                        onTodoUpdate={(todoObj) => onTodoUpdate(todoObj, i)}
                                        onTodoDelete={() => {
                                            doneData.splice(i, 1);
                                            setDoneData([...doneData]);
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    };

    const renderInputSection = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            const foo = {
                description: descriptionInput,
                id: uuidv4(),
                done: false,
                name: inputValue,
                editState: false,
                editedInput: inputValue,
                timeWhenCreated: Date.now(),
                timeWhenEdited: null,
                indexOfTodo: "",
                subTasks: [],
            };

            setData([...data, foo]);
            setInputValue("");
            setDescriptionInput("");
        };

        return (
            <div className="paper-input-box">
                <div className="input-form-section">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Add Task"
                            margin="dense"
                            size="small"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoFocus
                            fullWidth
                            required
                        />
                        <TextField
                            size="small"
                            margin="dense"
                            value={descriptionInput}
                            onChange={(e) => setDescriptionInput(e.target.value)}
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: 1 }}></div>
                            <Button sx={{ marginTop: 1 }} type="submit" variant="contained">
                                submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderSearchSection = () => {
        const avtarName = auth.username.split(" ");

        const name = avtarName
            .filter((_, i) => i < 2) // need only the first two words
            .map((value) => value[0].toUpperCase())
            .join("");

        const searchSubmitFun = (e) => {
            e.preventDefault();
        };

        const searchOnChangeFun = (e) => {
            setSearchInput(e.target.value);
        };

        return (
            <>
                <form
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    onSubmit={(e) => searchSubmitFun(e)}
                >
                    <TextField
                        sx={{ maxWidth: "600px" }}
                        label="Search"
                        margin="dense"
                        size="small"
                        value={searchInput}
                        onChange={searchOnChangeFun}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                </form>

                <div className="avtar-todo-username">
                    <Avatar>{name}</Avatar>
                </div>
            </>
        );
    };

    const onClearAllTasksFun = () => {
        setData([]);
        setOpenClearAllModal(false);
    };

    const renderClearAllModal = () => {
        return (
            <Dialog open={openClearAllModal} onClose={() => setOpenClearAllModal(false)}>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete all tasks?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            width: "100px",
                        }}
                        onClick={() => setOpenClearAllModal(false)}
                    >
                        CANCEL
                    </Button>
                    <Button
                        sx={{
                            width: "100px",
                        }}
                        color="error"
                        variant="contained"
                        onClick={() => onClearAllTasksFun()}
                        autoFocus
                    >
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };
    return (
        <div className="todolist-container">
            {/* search -section */}
            <Box sx={{ p: 2 }} className="search-section">
                <div className="search-section-middle">{renderSearchSection()}</div>
            </Box>
            {/* to do info section */}
            <div className="todo-info">
                <div className="todo-info-detail">
                    <div>
                        {data.length > 0 && (
                            <Typography variant="subtitle">
                                {doneCount} out of {totalCount} done
                            </Typography>
                        )}
                    </div>
                    <div>
                        {data.length > 0 && (
                            <Button onClick={() => setOpenClearAllModal(true)} variant="text" size="small">
                                CLEAR ALL
                            </Button>
                        )}
                        {renderClearAllModal()}
                    </div>
                </div>
            </div>
            {/* list-section */}
            {data.length === 0 && doneData.length === 0 ? (
                <div className="list-section">
                    <EmptyList />
                </div>
            ) : (
                <div className="list-section">{renderListSection()}</div>
            )}
            {/* input section */}
            {renderInputSection()}
        </div>
    );
}

// notes -
// 2.state managment
