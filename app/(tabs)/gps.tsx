import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function GPSScreen() {
  // Estado da localização com tipo explícito
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Solicita permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      // Monitora a localização continuamente
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // atualiza a cada 5 segundos
          distanceInterval: 1, // ou a cada 1 metro
        },
        (newLocation: Location.LocationObject) => {
          setLocation(newLocation);
        }
      );
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Obtendo localização...</Text>
      </View>
    );
  }

  const { latitude, longitude } = location.coords;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua localização atual</Text>
      <Text>Latitude: {latitude.toFixed(6)}</Text>
      <Text>Longitude: {longitude.toFixed(6)}</Text>

      <MapView
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Você está aqui" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  map: {
    width: '90%',
    height: '60%',
    marginTop: 20,
    borderRadius: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
