import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Alert } from 
'react-native';
import * as Location from 'expo-location';
export default function App() {
 const [location, setLocation] = useState(null);
 const [errorMsg, setErrorMsg] = useState(null);
 useEffect(() => {
 (async () => {
 let { status } = await 
Location.requestForegroundPermissionsAsync();
 if (status !== 'granted') {
 setErrorMsg('Permissão para acessar a localização foi negada');
 return;
 }
 let location = await Location.getCurrentPositionAsync({});
 setLocation(location);
 })();
 }, []);
 let content = <ActivityIndicator size="large" color="#0000ff" />;
 if (errorMsg) {
 content = <Text style={styles.error}>{errorMsg}</Text>;
 } else if (location) {
 content = (
 <View>
 <Text style={styles.text}>Latitude: 
{location.coords.latitude}</Text>
 <Text style={styles.text}>Longitude: 
{location.coords.longitude}</Text>
 </View>
 );
 }
 return (
 <View style={styles.container}>
 <Text style={styles.title}>Localização Atual</Text>
 {content}
 </View>
 );
}
const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 padding: 16,
 },
 title: {
 fontSize: 22,
 fontWeight: 'bold',
 marginBottom: 20,
 },
 text: {
 fontSize: 18,
 },
 error: {
 fontSize: 16,
 color: 'red',
 },
});
