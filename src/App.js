import { Route, Routes } from "react-router-dom";

import IntroPage from "./IntroPage/IntroPage";
import TodoListPage from "./TodoListPage/TodoListPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ReqAuth } from "./ReqAuth";
import { AuthProvider } from "./auth";

const theme = createTheme({
    typography: {
        fontFamily: "Fira Sans",
    },
});

function App() {
    return (
        <>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route path="/" element={<IntroPage />}></Route>
                        <Route
                            path="/todoList"
                            element={
                                <ReqAuth>
                                    <TodoListPage />
                                </ReqAuth>
                            }
                        ></Route>
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
            <div className="name-footer">
                Created with ❤️ by
                <a className="profile-link" target="_blank" href="https://github.com/zalak-undavia/todo">
                    Zalak Undavia
                </a>
            </div>
        </>
    );
}

export default App;
