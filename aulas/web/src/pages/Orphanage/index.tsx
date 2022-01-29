import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../server/api";

import Sidebar from "../../components/Sidebar";
import happyMapIcon from "../../utils/mapIcon";

import './styles.css';

interface OrphanageType{
  name: string,
  latitude: number,
  longitude: number,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: Array<{
    id: number;
    url: string;
  }>
}

export default function Orphanage() {
  const navigate = useNavigate();

  const params = useParams();
  const [orphanage, setOrphanage] = useState<OrphanageType>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      async function handleOrphanages(){
          await api.get(`/orphanages/${params.id}`)
          .then((response) => {
              setOrphanage(response.data);
              console.log(response.data);
          }).catch((err) => {
              alert(err.error);
          });
      }

      handleOrphanages();
  }, [params.id]);

  function toBack(){
    return navigate('/app');
  }

  function viewImage(index: number){
    setActiveImageIndex(index);
  }

  if(!orphanage){
    return <p>Carregando...</p>
  }
  
  return (
    <div id="page-orphanage">
      <Sidebar goBack={toBack}/>

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {
              orphanage.images.map((image, index) => (
                <button
                  className={index === activeImageIndex ? 'active' : ''}
                  type="button"
                  key={image.id}
                  onClick={() => viewImage(index)}
                  >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              ))
            }
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <MapContainer 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </MapContainer>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} target='_blank' rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>

              {
                orphanage.open_on_weekends ? 
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                :
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </div>
              }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}