import "./App.css";
import IntroPage from "./IntroPage/IntroPage";
import TodoListPage from "./TodoListPage/TodoListPage";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AuthProvider } from "./auth";
import { ReqAuth } from "./ReqAuth";

function App() {
    return (
        <div>
            <AuthProvider>
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
            </AuthProvider>
        </div>
    );
}

export default App;
