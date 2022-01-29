import React from "react";

import { FiArrowLeft} from "react-icons/fi";
import mapMarkerImg from '../../images/map-marker.svg';

import './styles.css';

interface SidebarProps{
    goBack: () => void,
}

const Sidebar: React.FC<SidebarProps> = ({ goBack }) => {
    return(
        <>
            <aside>
                <img src={mapMarkerImg} alt="Happy" />

                <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
                </footer>
            </aside>
        </>
    );
}

export default Sidebar;