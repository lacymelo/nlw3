import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerImg from '../../images/map-marker.svg';
import { FiPlus, FiArrowRight } from "react-icons/fi";
import api from "../../server/api";

import happyMapIcon from "../../utils/mapIcon";
import './styles.css';

interface Orphanage{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const OrphanagesMap = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        async function handleOrphanages(){
            await api.get('orphanages')
            .then((response) => {
                setOrphanages(response.data);
            }).catch((err) => {
                alert(err.error);
            });
        }

        handleOrphanages();
    }, []);

    useEffect(() => {
        async function loadPosition() {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
    
                setInitialPosition([latitude, longitude]);
            });
        }

        loadPosition();
    }, []);

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

                {
                    initialPosition[0] && (
                        <MapContainer 
                            center={[initialPosition[0], initialPosition[1]]}
                            zoom={15}
                            style={{ width: '100%', height: '100%'}}>
        
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />
        
                            {
                                orphanages.map(orphanage => (
                                    <Marker
                                        position={[orphanage.latitude, orphanage.longitude]}
                                        icon={happyMapIcon}
                                        key={orphanage.id}
                                        >
                                            <Popup
                                                closeButton={false}
                                                minWidth={240}
                                                maxWidth={240}
                                                className="map-popup"
                                            >
                                                {orphanage.name}
                
                                                <Link to={`/orphanages/${orphanage.id}`}>
                                                    <FiArrowRight size={20} color="#FFF"/>
                                                </Link>
                                            </Popup>
                                    </Marker>
                                ))
                            }
                        </MapContainer>
                    )
                }

                <Link to='/orphanages/create' className="create-orphanage">
                    <FiPlus size={32} color="#FFF"/>
                </Link>
            </div>
        </>
    );
}

export default OrphanagesMap;