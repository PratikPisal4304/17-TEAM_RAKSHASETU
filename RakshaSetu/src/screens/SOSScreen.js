import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function SOSScreen() {
  const { t } = useTranslation();

  // Static data for location and countdown display
  const staticLocation = { latitude: 37.78825, longitude: -122.4324 };
  const staticCountdown = 10;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('sos.header')}</Text>
      <Text style={styles.infoText}>{t('sos.infoText')}</Text>
      <TouchableOpacity style={styles.sosButton}>
        <Text style={styles.sosButtonText}>{t('sos.sosButton')}</Text>
      </TouchableOpacity>
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>
          {t('sos.countdown', { count: staticCountdown })}
        </Text>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>{t('sos.cancelAlert')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sendingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.sendingText}>{t('sos.sendingText')}</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: staticLocation.latitude,
            longitude: staticLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={staticLocation} title={t('sos.header')} />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd1e1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 34,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  sosButton: {
    backgroundColor: '#e60000',
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 12,
  },
  sosButtonText: {
    fontSize: 64,
    color: '#fff',
    fontWeight: 'bold',
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#888',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  sendingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  sendingText: {
    fontSize: 22,
    color: '#333',
    marginTop: 10,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default SOSScreen;