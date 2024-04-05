import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUserName] = useState("");

    const isUserLoggedIn = (user) => {
        setUserName(user);
    };
    return <AuthContext.Provider value={{ username, isUserLoggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
