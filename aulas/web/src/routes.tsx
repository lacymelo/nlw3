import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// importação das páginas
import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";
import CreateOrphanage from "./pages/CreateOrphanage";
import Orphanage from "./pages/Orphanage";

function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/app" element={<OrphanagesMap />}/>
                <Route path="/orphanages/create" element={<CreateOrphanage/>}/>
                <Route path="/orphanages/:id" element={<Orphanage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;