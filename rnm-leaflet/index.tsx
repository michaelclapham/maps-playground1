import type { MapViewProps } from "react-native-maps";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import { Map } from "leaflet";
import type { NativeSyntheticEvent } from "react-native";

function createSyntheticEvent<T>(nativeEvent: T): NativeSyntheticEvent<T> {
    return {
        nativeEvent: nativeEvent,
        currentTarget: 0,
        target: 0,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        preventDefault: () => {},
        isDefaultPrevented: () => false,
        stopPropagation: () => {},
        isPropagationStopped: () => false,
        persist: () => {},
        timeStamp: new Date().getTime(),
        type: ""
    }
}

export default function MapView(props: MapViewProps) {
    const initialLat = props.initialRegion?.latitude ?? 54;
    const initialLong = props.initialRegion?.longitude ?? 1;
    const [mapRef, setMap] = useState<Map | null>(null);

    useEffect(() => {
        if (mapRef != null && props.region != null) {
            const halfLat = props.region.latitudeDelta / 2;
            const halfLon = props.region.longitudeDelta / 2;
            const bounds = [
                [
                    props.region?.latitude - halfLat,
                    props.region?.longitude - halfLon,
                ],
                [
                    props.region?.latitude + halfLat,
                    props.region?.longitude + halfLon,
                ]
            ];
            mapRef.fitBounds(bounds);
            mapRef.panTo({lat: props.region?.latitude, lng: props.region?.longitude})
        }
    }, [props.region])

    function onMapRef(map: Map) {
        console.log("onMapRef", map);
        setMap(map);
        if (map != null) {
            if (props.onMapReady) {
                props.onMapReady(createSyntheticEvent({}))
            }
            map.addEventListener("move", (event) => {
                console.log("move event leaflet", event);
                const bounds = map.getBounds();
                const center = bounds.getCenter();
                props.onRegionChange?.({
                    latitude: center.lat,
                    longitude: center.lng,
                    latitudeDelta: bounds.getNorth() - bounds.getSouth(),
                    longitudeDelta: bounds.getEast() - bounds.getWest()
                }, {isGesture: true})
            });
        }
    }
    return useMemo(
        () => (<div style={{width: "100%", height: "100%"}}>
            <MapContainer
                center={[initialLat, initialLong]}
                zoom={13}
                scrollWheelZoom={true}
                style={{width: "100%", height: "100%"}}
                ref={onMapRef}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>),
        []
    );
}
