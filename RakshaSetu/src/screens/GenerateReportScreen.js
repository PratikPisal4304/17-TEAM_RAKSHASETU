import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GenerateReportScreen = ({ navigation }) => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const incidentTypes = ['Harassment', 'Stalking', 'Assault', 'Theft', 'Vandalism', 'Other'];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>File Report</Text>
        </View>

        {/* Incident Type Selection */}
        <Text style={styles.sectionTitle}>Incident Type</Text>
        <View style={styles.typeContainer}>
          {incidentTypes.map(type => (
            <TouchableOpacity 
              key={type} 
              style={styles.typeButton}
              onPress={() => setIncidentType(type)}
            >
              <Text>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Description Input */}
        <Text style={styles.sectionTitle}>Description</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Describe what happened..."
          value={description}
          onChangeText={setDescription}
        />

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.buttonText}>Generate Report</Text>
        </TouchableOpacity>

        {/* Preview Modal */}
        <Modal visible={showModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Report Preview</Text>
            <Text>Sample report content...</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#DDD',
    borderRadius: 8,
  }
});

export default GenerateReportScreen;