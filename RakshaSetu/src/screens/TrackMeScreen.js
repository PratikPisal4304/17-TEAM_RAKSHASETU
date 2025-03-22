import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#ff5f96';

function TrackMeScreen() {
  const [mapType, setMapType] = useState('standard');

  // Static dummy values
  const staticLocation = { latitude: 37.78825, longitude: -122.4324 };
  const staticDestinationCoord = { latitude: 37.75825, longitude: -122.4624 };
  const staticRouteCoords = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.77825, longitude: -122.4424 },
    { latitude: 37.76825, longitude: -122.4524 },
    { latitude: 37.75825, longitude: -122.4624 },
  ];
  
  const toggleMapType = () => {
    setMapType((prevType) =>
      prevType === 'standard' ? 'satellite' : prevType === 'satellite' ? 'hybrid' : 'standard'
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Me</Text>
        <Text style={styles.headerSubtitle}>Distance: 2.5 km | ETA: 15 mins</Text>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          mapType={mapType}
          initialRegion={{
            latitude: staticLocation.latitude,
            longitude: staticLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
        >
          <Marker coordinate={staticDestinationCoord}>
            <Ionicons name="location" size={30} color="#FF6347" />
          </Marker>
          <Polyline coordinates={staticRouteCoords} strokeWidth={4} strokeColor={PRIMARY_COLOR} />
        </MapView>
      </View>

      {/* Search Card */}
      <View style={styles.searchCard}>
        <Ionicons name="search" size={20} color="#666" style={{ marginLeft: 10 }} />
        <TextInput style={styles.searchInput} placeholder="Enter destination" placeholderTextColor="#666" value="Golden Gate Bridge" editable={false} />
        <TouchableOpacity onPress={() => Alert.alert('Reset', 'Reset action')}>
          <Ionicons name="close-circle" size={20} color="#aaa" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>

      {/* Floating Controls */}
      <TouchableOpacity style={styles.toggleMapButton} onPress={toggleMapType}>
        <MaterialIcons name="layers" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.recenterButton} onPress={() => Alert.alert('Recenter', 'Recenter action')}>
        <Ionicons name="locate" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.routeButton} onPress={() => Alert.alert('Route', 'Route action')}>
        <Text style={styles.routeButtonText}>Show Route</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.journeyButton} onPress={() => Alert.alert('Journey', 'Journey started')}>
        <Text style={styles.journeyButtonText}>Start Journey</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_COLOR },
  header: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: PRIMARY_COLOR },
  headerTitle: { fontSize: 26, fontWeight: '700', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#fff' },
  mapContainer: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
  map: { width: '100%', height: '100%' },
  searchCard: { position: 'absolute', top: 20, alignSelf: 'center', width: width * 0.9, backgroundColor: '#fff', borderRadius: 15, padding: 10, elevation: 5, flexDirection: 'row', alignItems: 'center' },
  searchInput: { flex: 1, height: 40, paddingHorizontal: 10, fontSize: 16, color: '#333' },
  toggleMapButton: { position: 'absolute', bottom: 80, left: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  recenterButton: { position: 'absolute', bottom: 80, right: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  routeButton: { position: 'absolute', bottom: 140, alignSelf: 'center', backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, elevation: 5 },
  routeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  journeyButton: { position: 'absolute', bottom: 200, alignSelf: 'center', backgroundColor: PRIMARY_COLOR, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, elevation: 5 },
  journeyButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});

export default TrackMeScreen;
