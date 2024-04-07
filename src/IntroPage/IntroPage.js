import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import EastIcon from "@mui/icons-material/East";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import { useAuth } from "../auth";

import "./IntroPage.css";

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
        <Box sx={{ p: 3 }} className="main-container">
            <Card elevation={8} sx={{ p: 10 }}>
                <Typography variant="h4" align="center">
                    TODO | Material UI
                </Typography>

                <CardMedia
                    sx={{ height: "20vh", py: 4 }}
                    component="img"
                    image="https://i.pinimg.com/564x/78/2c/0c/782c0cb2cd1b9f9af5775d6074fe0cb4.jpg"
                />

                <CardContent>
                    <Typography align="center" sx={{ marginBottom: 2, color: "text.secondary", fontWeight: "bold" }}>
                        Welcome to TODO
                    </Typography>
                    <Typography align="center" sx={{ maxWidth: "400px", color: "text.secondary" }}>
                        TODO list will help you to stay organized and perform your tasks much faster. This TODO list
                        uses Material UI to give you familiar look and feel.
                    </Typography>
                </CardContent>

                <form className="intro-form" onSubmit={ontoGoTodolist}>
                    <TextField
                        sx={{ width: "400px", marginTop: 2 }}
                        margin="dense"
                        size="small"
                        label="User Name"
                        value={userNameInput}
                        onChange={(e) => setUserName(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <EastIcon edge="end"></EastIcon>
                            </InputAdornment>
                        }
                        autoFocus
                        fullWidth
                    />

                    <CardActions>
                        <Button
                            sx={{ width: "400px" }}
                            type="submit"
                            size="large"
                            variant="contained"
                            endIcon={<ArrowCircleRightIcon />}
                        >
                            Let's start
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </Box>
    );
}
