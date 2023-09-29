import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';

export default function App() {
  const [region, setRegion] = useState<Region>();
  return (
    <View style={styles.container}>
      <Text onPress={() => setRegion({
          latitude: 51.53487,
          longitude: -0.1233946,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        })}>Open up App.tsx to start working on your app!</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.53487,
          longitude: -0.1233946,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
        region={region}
        onMapReady={(event) => console.log("onMapReady", event)}
        onRegionChange={(event) => console.log("onRegionChange", event)}
      ></MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
