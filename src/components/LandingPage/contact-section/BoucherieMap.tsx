import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, {LatLngTuple} from "leaflet";
import React, {useState} from "react";
import {Pointer} from "lucide-react"; // Ajout de l'icône HandPointer pour indiquer l'activation

// Corrige le problème de l'icône manquante de Leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface BoucherieMapProps {
    height: number;
}

const BoucherieMap: React.FC<BoucherieMapProps> = ({height}) => {
    const position: LatLngTuple = [45.192305452287336, 5.695558125700014];

    // État pour l'activation de la carte
    const [isMapActive, setIsMapActive] = useState(false);

    // Fonction pour activer la carte lorsqu'on appuie dessus
    const handleActivateMap = () => {
        setIsMapActive(true);
    };

    return (
        <div style={{height: `${height}px`, width: "100%", position: "relative"}}>
            {!isMapActive ? (
                // Superposition pour indiquer à l'utilisateur d'activer la carte
                <div
                    className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/70 text-white"
                    onClick={handleActivateMap}
                >
                    <div className="text-center">
                        <Pointer size={48} className="mx-auto mb-4"/> {/* Icône de doigt */}
                        <p className="text-xl font-semibold">Appuyez pour activer la carte</p>
                    </div>
                </div>
            ) : (
                <MapContainer
                    center={position}
                    zoom={20}
                    style={{height: `${height}px`, width: "100%"}}
                    scrollWheelZoom={true} // La carte est activée après le clic
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            <h1 className="pb-2 text-sm font-bold">Bmarket<br/> 39 Av. du Vercors, 38600 Fontaine</h1>
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default BoucherieMap;
