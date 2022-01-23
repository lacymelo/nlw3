import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// importação das páginas
import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";

function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/app" element={<OrphanagesMap />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;