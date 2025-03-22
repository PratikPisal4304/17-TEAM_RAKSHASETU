import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PINK_BG = '#ffd1e1';
const PINK = '#ff5f96';
const GREEN = '#4CAF50';

function FakeCallScreen({ navigation }) {
  const [contacts, setContacts] = useState([
    {
      id: '1',
      name: 'Mom',
      phone: '+1 (555) 123-4567',
      avatar: 'https://via.placeholder.com/200/E9967A/FFFFFF?text=M',
    },
    {
      id: '2',
      name: 'Dad',
      phone: '+1 (555) 987-6543',
      avatar: 'https://via.placeholder.com/200/6495ED/FFFFFF?text=D',
    },
  ]);

  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState({ name: '', phone: '', avatar: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleBack = () => navigation.goBack();

  const handleAddContact = () => {
    setIsEditing(false);
    setCurrentContact({ name: '', phone: '', avatar: '' });
    setContactModalVisible(true);
  };

  const handleEditContact = (contact) => {
    setIsEditing(true);
    setCurrentContact(contact);
    setContactModalVisible(true);
  };

  const handleSaveContact = () => {
    if (!currentContact.name.trim()) {
      Alert.alert('Error', 'Name is required.');
      return;
    }
    if (!currentContact.phone.trim()) {
      Alert.alert('Error', 'Phone is required.');
      return;
    }
    if (isEditing) {
      setContacts((prev) =>
        prev.map((c) => (c.id === currentContact.id ? currentContact : c))
      );
    } else {
      const initial = currentContact.name.charAt(0).toUpperCase();
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const newContact = {
        ...currentContact,
        id: Date.now().toString(),
        avatar:
          currentContact.avatar ||
          `https://via.placeholder.com/200/${randomColor}/FFFFFF?text=${initial}`,
      };
      setContacts((prev) => [...prev, newContact]);
    }
    setContactModalVisible(false);
  };

  const handleCancelContact = () => {
    setContactModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={PINK_BG} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Fake Call</Text>
      </View>

      <Text style={styles.subtitle}>
        The Fake Call feature allows you to simulate an incoming call to quickly exit
        uncomfortable or risky situations.
      </Text>

      <ScrollView style={styles.contactList} contentContainerStyle={{ paddingBottom: 140 }}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Image source={{ uri: contact.avatar }} style={styles.avatar} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleEditContact(contact)}>
              <MaterialIcons name="edit" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={handleAddContact}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {contactModalVisible && (
        <Modal animationType="slide" transparent={true} visible={contactModalVisible}>
          <View style={styles.contactModalContainer}>
            <View style={styles.contactModalContent}>
              <Text style={styles.modalHeader}>
                {isEditing ? 'Edit Contact' : 'Add Contact'}
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Name"
                value={currentContact.name}
                onChangeText={(text) =>
                  setCurrentContact({ ...currentContact, name: text })
                }
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Phone"
                value={currentContact.phone}
                onChangeText={(text) =>
                  setCurrentContact({ ...currentContact, phone: text })
                }
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Avatar URL (optional)"
                value={currentContact.avatar}
                onChangeText={(text) =>
                  setCurrentContact({ ...currentContact, avatar: text })
                }
              />
              <View style={styles.modalButtonsRow}>
                <TouchableOpacity style={styles.modalButton} onPress={handleSaveContact}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                  onPress={handleCancelContact}
                >
                  <Text style={[styles.buttonText, { color: '#333' }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PINK_BG,
    paddingHorizontal: 20,
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: PINK,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    marginTop: 15,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  contactList: {
    flex: 1,
    marginTop: 20,
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ddd',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  contactPhone: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 240,
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: PINK,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  contactModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactModalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: PINK,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FakeCallScreen;