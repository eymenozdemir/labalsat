import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
    //console.log("open: "+localStorage.getItem("customer"));
    const getTokenFromLocalStorage = localStorage.getItem("customer");
    return getTokenFromLocalStorage === null ? children : (<Navigate to={'/'} replace={true} />)
}