import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';


const TrackMeScreen = () => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState('2 Buck St');
  const [mapType, setMapType] = useState('standard'); // Default map view

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  // Toggle between different map views
  const toggleMapType = () => {
    const types = ['standard', 'satellite', 'terrain', 'hybrid'];
    const currentIndex = types.indexOf(mapType);
    setMapType(types[(currentIndex + 1) % types.length]);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Track Me</Text>
        <Text style={styles.subtitle}>Track Me ensures your loved ones can monitor your location in real-time.</Text>
      </View>

      {/* Location Input */}
      <View style={styles.locationCard}>
        <TextInput style={styles.input} placeholder="Your location" />
        <TextInput style={styles.input} value={destination} onChangeText={setDestination} />
        <View style={styles.transportOptions}>
          <TouchableOpacity style={styles.option}><Text>🚶‍♂️ 2 min</Text></TouchableOpacity>
          <TouchableOpacity style={styles.option}><Text>🚗 3 min</Text></TouchableOpacity>
          <TouchableOpacity style={styles.option}><Text>🚲 2 min</Text></TouchableOpacity>
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          mapType={mapType} // Dynamic map type
          initialRegion={{
            latitude: location ? location.latitude : 37.78825,
            longitude: location ? location.longitude : -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {location && <Marker coordinate={location} title="You are here" />}
        </MapView>

        {/* Map View Toggle Button */}
        <TouchableOpacity style={styles.mapToggleButton} onPress={toggleMapType}>
        <Icon name="satellite" size={36} color="#ff5f96" />
          <Text style={styles.mapToggleText}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8a3b9' },
  header: { padding: 20, backgroundColor: '#f8a3b9', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 14, color: 'white', marginTop: 5 },
  locationCard: { backgroundColor: 'white', padding: 15, borderRadius: 20, marginHorizontal: 20, marginTop: -30, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10 },
  input: { backgroundColor: '#eee', padding: 12, borderRadius: 10, marginBottom: 10 },
  transportOptions: { flexDirection: 'row', justifyContent: 'space-between' },
  option: { padding: 10, backgroundColor: '#ddd', borderRadius: 10 },
  mapContainer: { flex: 1, overflow: 'hidden', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  map: { width: '100%', height: '100%' },
  mapToggleButton: { position: 'absolute', bottom: 100, right: 20, backgroundColor: 'white', padding: 20, borderRadius: 30 },
  mapToggleText: { color: 'white', fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  navButton: { padding: 10 },
  
});

export default TrackMeScreen;
