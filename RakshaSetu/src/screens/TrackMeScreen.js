import React from 'react';
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
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const PINK = '#ff5f96';

// Custom map style (static)
const customMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
];

function TrackMeScreen() {
  // Static dummy values
  const staticLocation = { latitude: 37.78825, longitude: -122.4324 };
  const staticDestinationCoord = { latitude: 37.75825, longitude: -122.4624 };
  const staticRouteCoords = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.77825, longitude: -122.4424 },
    { latitude: 37.76825, longitude: -122.4524 },
    { latitude: 37.75825, longitude: -122.4624 },
  ];
  const staticETA = "15 mins";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Me (Static)</Text>
        <Text style={styles.headerSubtitle}>
          Distance: 2.5 km | Heading: 90° | ETA: {staticETA}
        </Text>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: staticLocation.latitude,
            longitude: staticLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={customMapStyle}
          showsUserLocation
        >
          <Marker coordinate={staticDestinationCoord}>
            <Ionicons name="location" size={30} color="#FF6347" />
          </Marker>
          <Polyline
            coordinates={staticRouteCoords}
            strokeWidth={4}
            strokeColor={PINK}
          />
        </MapView>
      </View>

      {/* Search Card (Static) */}
      <View style={styles.searchCard}>
        <Ionicons name="search" size={20} color="#666" style={{ marginLeft: 10 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter destination (static)"
          placeholderTextColor="#666"
          value="Golden Gate Bridge"
          editable={false}
        />
        <TouchableOpacity onPress={() => Alert.alert('Reset', 'Static reset action')}>
          <Ionicons name="close-circle" size={20} color="#aaa" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>

      {/* Floating Controls */}
      <TouchableOpacity
        style={styles.recenterButton}
        onPress={() => Alert.alert('Recenter', 'Static recenter action')}
      >
        <Ionicons name="locate" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.routeButton}
        onPress={() => Alert.alert('Route', 'Static route action')}
      >
        <Text style={styles.routeButtonText}>Show Route</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.journeyButton}
        onPress={() => Alert.alert('Journey', 'Static journey action')}
      >
        <Text style={styles.journeyButtonText}>Start Journey</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.instructionsButton}
        onPress={() => Alert.alert('Instructions', 'Static instructions action')}
      >
        <Text style={styles.instructionsButtonText}>Instructions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PINK },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: PINK,
  },
  headerTitle: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 3 },
  headerSubtitle: { fontSize: 14, color: '#fff' },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  map: { width: '100%', height: '100%' },
  searchCard: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  recenterButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PINK,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  routeButton: {
    position: 'absolute',
    bottom: 140,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 5,
  },
  routeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  journeyButton: {
    position: 'absolute',
    bottom: 200,
    alignSelf: 'center',
    backgroundColor: PINK,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  journeyButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  instructionsButton: {
    position: 'absolute',
    bottom: 260,
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 5,
  },
  instructionsButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default TrackMeScreen;
