import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Button, CardActions, Stack } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EastIcon from "@mui/icons-material/East";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import "./IntroPage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

export default function IntroPage() {
    const [userNameInput, setUserName] = useState("");

    const auth = useAuth();
    const nav = useNavigate();

    const ontoGoTodolist = (e) => {
        e.preventDefault();
        auth.isUserLoggedIn(userNameInput);
        nav("/todoList");
    };

    return (
        <div>
            <div className="App">
                <div className="main-container">
                    <Card
                        elevation={8}
                        sx={{
                            p: 10,
                            textAlign: "center",
                            borderRadius: "5px",
                        }}
                    >
                        <Typography sx={{ marginTop: "20px" }} color={"grey"} variant="h3" component="div">
                            DO LIST
                        </Typography>

                        <div className="intro-img-box">
                            <CardMedia
                                sx={{ height: "20vh" }}
                                component="img"
                                image="https://i.pinimg.com/564x/78/2c/0c/782c0cb2cd1b9f9af5775d6074fe0cb4.jpg"
                            />
                        </div>

                        <CardContent
                            sx={{
                                marginTop: "-10px",
                            }}
                        >
                            <Typography
                                sx={{ textAlign: "center", marginBottom: "10px", color: "grey", fontWeight: "bold" }}
                                variant="h5"
                                component="div"
                            >
                                WELCOME TO DO LIST
                            </Typography>
                            <Typography color="text.secondary">
                                Do list will helps you <br /> to stay organized and <br /> perform your tasks much
                                faster.
                            </Typography>
                        </CardContent>

                        <form className="intro-form" onSubmit={(e) => ontoGoTodolist(e)}>
                            <Stack sx={{ marginBottom: "10px", width: "300px", marginLeft: "5px" }}>
                                <TextField
                                    autoFocus
                                    label="Name"
                                    fullWidth
                                    value={userNameInput}
                                    onChange={(e) => setUserName(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <EastIcon edge="end"></EastIcon>
                                        </InputAdornment>
                                    }
                                />
                            </Stack>

                            <CardActions>
                                <Button
                                    type="submit"
                                    sx={{ width: "300px", py: "15px" }}
                                    variant="contained"
                                    endIcon={<ArrowCircleRightIcon />}
                                >
                                    Let's start
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
