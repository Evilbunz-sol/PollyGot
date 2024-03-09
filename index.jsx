import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"
import Nav from "./Components/Nav"
import Translator from "./Components/Translator"
import Chat from "./Components/Chat"

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Translator />} /> 
                <Route path="/chat" element={<Chat />} /> 
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)