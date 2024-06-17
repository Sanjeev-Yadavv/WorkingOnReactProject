import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Task from "../pages/Task" 
import PrivateRoute from "./PrivateRoute"




 
export default function() {
   
  
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/about" element={<PrivateRoute><About/></PrivateRoute>}/>
            <Route path="/contact" element={<PrivateRoute><Contact/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/task" element={<PrivateRoute><Task/></PrivateRoute>}/>
        </Routes>
    )
}