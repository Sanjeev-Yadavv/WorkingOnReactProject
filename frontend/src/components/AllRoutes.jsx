import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Tickets from "../pages/Tickets" 
import PrivateRoute from "./PrivateRoute"
import TicketCreate from "../pages/TicketCreate"
import TicketEdit from "../pages/TicketEdit"
import TicketView from "../pages/TicketView"




 
export default function AllRoutes() {
   
  
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/about" element={<PrivateRoute><About/></PrivateRoute>}/>
            <Route path="/contact" element={<PrivateRoute><Contact/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/tickets/create" element={<PrivateRoute><TicketCreate/></PrivateRoute>}/>
            <Route path='/tickets/view/:id' element={<PrivateRoute><TicketView/></PrivateRoute>}/>
            <Route path="/tickets/edit/:id" element={<PrivateRoute><TicketEdit/></PrivateRoute>}/>
            <Route path="/tickets" element={<PrivateRoute><Tickets/></PrivateRoute>}/>
        </Routes>
    )
}