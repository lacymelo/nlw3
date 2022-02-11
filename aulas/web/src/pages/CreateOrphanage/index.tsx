import React, {useState, useEffect, ChangeEvent} from "react";
import { MapContainer, Marker, TileLayer} from 'react-leaflet';
import { useNavigate } from "react-router-dom";

import { FiPlus, FiX } from "react-icons/fi";
import './styles.css';
import Sidebar from "../../components/Sidebar";
import api from "../../server/api";

import Markers from "../../components/Markers";

export default function CreateOrphanage() {
    const navigate = useNavigate();
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [openOnWeekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    function toBack(){
        return navigate('/app');
    }

    useEffect(() => {
        async function loadPosition() {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                setInitialPosition([latitude, longitude]);
            });
        }

        loadPosition();
    }, []);

    async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        const dataForm = new FormData();

        dataForm.append("name", name);
        dataForm.append("latitude", String(selectedPosition[0]));
        dataForm.append("longitude", String(selectedPosition[1]));
        dataForm.append("about", about);
        dataForm.append("instructions", instructions);
        dataForm.append("opening_hours", openingHours);
        dataForm.append("open_on_weekends", String(openOnWeekends));

        images.forEach(image => {
            dataForm.append('images', image);
        })

        await api.post('orphanages', dataForm)
        .then(() => {
            alert('Cadastro realizado com sucesso!');
            toBack();
        }).catch((err) => {
            alert(err.data.error);
        });  
    }

    function handleSelectedImage(event: ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return;
        }

        const selectedImages = Array.from(event.target.files);

        selectedImages.map(image => {
            setImages([...images, image]);
            setPreviewImages([...previewImages, URL.createObjectURL(image)]);   
        })  
    }

    function removeImage(position: number){
        if (position !== -1) {
            const arrayPreview = previewImages.filter((item, index) => {
                return position !== index
            });

            const arrayImages = images.filter((item, index) => {
                return position !== index
            });

            setPreviewImages(arrayPreview);
            setImages(arrayImages);  
        }   
    }

    return (
        <div id="page-create-orphanage">
            
            <Sidebar goBack={toBack}/>

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                <fieldset>
                    <legend>Dados</legend>

                    {
                        initialPosition[0] && (
                            <MapContainer
                            center={[initialPosition[0], initialPosition[1]]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            >
                                <TileLayer 
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />

                                {selectedPosition ?
                                    <Markers position={selectedPosition}
                                    functionSelectedPosition={setSelectedPosition}
                                    /> 
                                : <Marker
                                    position={initialPosition}
                                    />}
                            </MapContainer>
                        )
                    }

                    <div className="input-block">
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </div>

                    <div className="input-block">
                        <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                        <textarea
                            id="about"
                            maxLength={300}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            />
                    </div>

                    <div className="input-block">
                        <label htmlFor="images">Fotos</label>

                        <div className="uploaded-image">
                            <div className="images-container">

                                {
                                    previewImages.map((image, index) => (
                                        <div className="box-image" key={index}>
                                            <FiX size={27} color="#FF669D" className="close" onClick={() => removeImage(index)} />
                                            <img src={image} alt="images" />
                                        </div>
                                    ))
                                }

                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>
                            
                            <input multiple onChange={(e) => handleSelectedImage(e)} type="file" id="image[]" />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Visitação</legend>

                    <div className="input-block">
                        <label htmlFor="instructions">Instruções</label>
                        <textarea
                            id="instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="opening_hours">Horário de Funcionamento</label>
                        <input
                            id="opening_hours"
                            value={openingHours}
                            onChange={(e) => setOpeningHours(e.target.value)}
                            />
                    </div>

                    <div className="input-block">
                        <label htmlFor="open_on_weekends">Atende fim de semana</label>

                        <div className="button-select">
                            <button
                                type="button"
                                className={openOnWeekends ? 'active' : ''}
                                onClick={() => setOpenOnWeekends(true)}
                                >
                                Sim
                            </button>

                            <button
                                type="button"
                                className={openOnWeekends ? '' : 'active'}
                                onClick={() => setOpenOnWeekends(false)}
                                >
                                Não
                            </button>
                        </div>
                    </div>
                </fieldset>

                <button className="confirm-button" type="submit">
                    Confirmar
                </button>
                </form>
            </main>
        </div>
    );
}
