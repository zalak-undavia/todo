import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "./EmptyList.css";

export default function EmptyList() {
    return (
        <Box className="main-empty-box">
            <img
                className="todo-empty-list"
                src="https://img.freepik.com/free-vector/home-garden-flat-composition-with-woman-lying-hammock-with-home-plants-vector-illustration_1284-63117.jpg"
            ></img>
            <Typography sx={{ p: 2, color: "text.secondary" }} align="center">
                Sit back and relax, all tasks are done!
            </Typography>
        </Box>
    );
}
