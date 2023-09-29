import type { MapViewProps } from "react-native-maps";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

export default function MapView(props: MapViewProps) {
    const lat = props.initialRegion?.latitude ?? 54
    const long = props.initialRegion?.longitude ?? 1
    return (
        <div style={{width: "100%", height: "90%"}}>
        <p>lat is {props.initialRegion?.latitude}</p>
        <p>long is {props.initialRegion?.longitude}</p>
            <MapContainer
                center={[lat, long]}
                zoom={13}
                scrollWheelZoom={false}
                style={{width: "100%", height: "100%"}}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
}
