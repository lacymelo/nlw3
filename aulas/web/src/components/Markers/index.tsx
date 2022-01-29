import React from "react";
import { Marker, useMapEvents} from 'react-leaflet';
import happyMapIcon from "../../utils/mapIcon";

interface MarkersProps{
    functionSelectedPosition: (number: [number,number]) => void;
    position: [number, number]; 
}

const Markers: React.FC<MarkersProps> = ({ functionSelectedPosition, position }) => {
    useMapEvents({
        click(e) { 
            //recupera a latitude e longitude do ponto definido pelo usuário no mapa
            functionSelectedPosition([
                e.latlng.lat,
                e.latlng.lng
            ]);     
        },            
    })

    return (
        position ? 
            <Marker           
            position={position}
            interactive={false}
            icon={happyMapIcon}
            />
        : <p>Carregando mapa...</p>
    )     
}

export default Markers;