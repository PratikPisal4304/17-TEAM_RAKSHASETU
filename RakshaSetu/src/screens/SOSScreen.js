import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function SOSScreen() {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isSendingSOS, setIsSendingSOS] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let timer;
    if (isSOSActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    if (countdown === 0 && isSOSActive) {
      clearInterval(timer);
      setIsSendingSOS(true);
      setTimeout(() => {
        setIsSendingSOS(false);
        setIsSOSActive(false);
      }, 2000);
    }
    return () => timer && clearInterval(timer);
  }, [isSOSActive, countdown]);

  const startSOS = () => {
    setIsSOSActive(true);
    setCountdown(10);
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
    setCountdown(10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SOS Alert</Text>
      <Text style={styles.infoText}>Send an immediate alert.</Text>
      {!isSOSActive && !isSendingSOS && (
        <TouchableOpacity style={styles.sosButton} onPress={startSOS}>
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
      )}
      {isSOSActive && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>
            Alert in {countdown} seconds
          </Text>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelSOS}>
            <Text style={styles.cancelButtonText}>Cancel Alert</Text>
          </TouchableOpacity>
        </View>
      )}
      {isSendingSOS && (
        <View style={styles.sendingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.sendingText}>Sending SOS...</Text>
        </View>
      )}
      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
          >
            <Marker coordinate={location} title="SOS Location" />
          </MapView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd1e1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  header: {
    fontSize: 34,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20
  },
  sosButton: {
    backgroundColor: '#e60000',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 12
  },
  sosButtonText: {
    fontSize: 64,
    color: '#fff',
    fontWeight: 'bold'
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  countdownText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 10
  },
  cancelButton: {
    backgroundColor: '#888',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8
  },
  cancelButtonText: {
    fontSize: 20,
    color: '#fff'
  },
  sendingContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  sendingText: {
    fontSize: 22,
    color: '#333',
    marginTop: 10
  },
  mapContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  map: {
    width: '100%',
    height: '100%'
  }
});

export default SOSScreen;
