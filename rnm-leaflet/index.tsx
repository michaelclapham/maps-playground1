import type {MapViewProps} from "react-native-maps";

export default function MapView(props: MapViewProps) {
    return <div>
        <p>lat is {props.initialRegion?.latitude}</p>
        <p>long is {props.initialRegion?.longitude}</p>
    </div>
}