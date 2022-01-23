import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerImg from '../../images/map-marker.svg';
import { FiPlus } from "react-icons/fi";

import 'leaflet/dist/leaflet.css';

import './styles.css';

const OrphanagesMap = () => {
    return (
        <>
            <div id="page-map">
                <aside>
                    <header>
                        <img src={mapMarkerImg} alt="Happy" />

                        <h2>Escolha um orfanato no mapa</h2>

                        <p>Muitas Crianças estão esperando a sua visita :)</p>
                    </header>

                    <footer>
                        <strong>
                            Cametá
                        </strong>

                        <span>Pará</span>
                    </footer>

                </aside>

                <MapContainer 
                    center={[-2.243418, -49.502326]}
                    zoom={15}
                    style={{ width: '100%', height: '100%'}}>

                    <TileLayer
                        attribution='&amp; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[-2.243418, -49.502326]}>

                    </Marker>
                </MapContainer>,

                <Link to='' className="create-orphanage">
                    <FiPlus size={32} color="#FFF"/>
                </Link>
            </div>
        </>
    );
}

export default OrphanagesMap;