import "./TodoListPage.css";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import EmptyList from "../EmptyList/EmptyList";
import SingleTodo2 from "../SingleTodo2/SingleTodo2";
import { v4 as uuidv4 } from "uuid";
import { Paper, Stack, Typography } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useAuth } from "../auth";

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

    const onTodoDelete = (index) => {
        data.splice(index, 1);
        setData([...data]);
    };

    const checkedArr = data.filter((v, i) => {
        return v.done === true;
    });

    const renderListSection = () => {
        return (
            <div className="list-of-todos">
                <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
                    {data
                        .filter((v, index) => {
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
                    .filter((v, index) => {
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
    //
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
                    <div className="input-left">
                        <form id="submit-description-id" onSubmit={handleSubmit}>
                            <TextField
                                sx={{ marginRight: 1 }}
                                fullWidth
                                required
                                value={inputValue}
                                type="text"
                                onChange={(e) => setInputValue(e.target.value)}
                                label="Add Task"
                                autoFocus
                            />
                            <TextField
                                sx={{ marginTop: "10px" }}
                                fullWidth
                                size="small"
                                value={descriptionInput}
                                type="text"
                                onChange={(e) => setDescriptionInput(e.target.value)}
                                label="Description"
                                multiline
                                rows={3}
                            />
                        </form>
                    </div>
                </div>
                <div className="form-btn">
                    <Button
                        form="submit-description-id"
                        type="submit"
                        sx={{
                            py: "15px",
                            marginLeft: "10px",
                        }}
                        size="large"
                        variant="contained"
                        color="success"
                    >
                        submit
                    </Button>
                </div>
            </div>
        );
    };
    //
    const renderSearchSection = () => {
        const avtarName = auth.username.split(" ");

        const name = avtarName
            .filter((_, i) => {
                if (i < 2) {
                    return true;
                } else {
                    return false;
                }
            })
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
                        sx={{ maxWidth: "800px" }}
                        value={searchInput}
                        onChange={(e) => searchOnChangeFun(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
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
            <Dialog sx={{ wordSpacing: "4px" }} open={openClearAllModal} onClose={() => setOpenClearAllModal(false)}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ARE YOU SURE YOU WANT TO DELETE ALL TASKS ?
                    </DialogContentText>
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
            <div className="search-section">
                <div className="search-section-middle">{renderSearchSection()}</div>
            </div>
            {/* to do info section */}
            <div className="todo-info">
                <div className="todo-info-detail">
                    <div>
                        {data.length > 0 && (
                            <Typography variant="subtitle">
                                {checkedArr.length} out of {data.length} done!
                            </Typography>
                        )}
                    </div>
                    <div>
                        {data.length > 0 && (
                            <Button
                                // sx={{
                                //     height: "40px",
                                //     display: "flex",
                                //     alignSelf: "center",
                                //     marginRight: "20px",
                                // }}
                                onClick={() => setOpenClearAllModal(true)}
                                variant="text"
                                size="small"
                            >
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
//  1.ma text overflow valu joje
// 2.state managment
