import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PINK_BG = '#ffd1e1';
const PINK = '#ff5f96';
const GREEN = '#4CAF50';

// Phone number validation regex
const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!currentContact.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!currentContact.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!PHONE_REGEX.test(currentContact.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => navigation.goBack();

  const handleAddContact = () => {
    setIsEditing(false);
    setCurrentContact({ name: '', phone: '', avatar: '' });
    setErrors({});
    setContactModalVisible(true);
  };

  const handleEditContact = (contact) => {
    setIsEditing(true);
    setCurrentContact(contact);
    setErrors({});
    setContactModalVisible(true);
  };

  const handleSaveContact = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (isEditing) {
        setContacts((prev) =>
          prev.map((c) => (c.id === currentContact.id ? currentContact : c))
        );
      } else {
        const initial = currentContact.name.charAt(0).toUpperCase();
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const newContact = {
          ...currentContact,
          id: Date.now().toString(),
          avatar: currentContact.avatar || `https://via.placeholder.com/200/${randomColor}/FFFFFF?text=${initial}`,
        };
        setContacts((prev) => [...prev, newContact]);
      }
      setContactModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save contact');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelContact = () => {
    setContactModalVisible(false);
    setErrors({});
  };

  const formatPhoneNumber = (text) => {
    // Simple phone number formatting
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={PINK_BG} />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Contact Manager</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Manage your emergency contacts for quick access in need.
      </Text>

      {/* Contact List */}
      <ScrollView 
        style={styles.contactList}
        contentContainerStyle={styles.listContent}
        keyboardDismissMode="on-drag"
      >
        {contacts.map((contact) => (
          <TouchableOpacity 
            key={contact.id} 
            style={styles.contactCard}
            activeOpacity={0.9}
          >
            <View style={styles.contactInfo}>
              <Image 
                source={{ uri: contact.avatar }} 
                style={styles.avatar}
                defaultSource={require('../../assets/fake-call.png')} // Add a local placeholder
              />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>
                  {formatPhoneNumber(contact.phone)}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => handleEditContact(contact)}
              style={styles.editButton}
            >
              <MaterialIcons name="edit" size={20} color="#666" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={handleAddContact}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Add/Edit Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={handleCancelContact}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.contactModalContent}>
              <Text style={styles.modalHeader}>
                {isEditing ? 'Edit Contact' : 'New Contact'}
              </Text>

              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={[styles.modalInput, errors.name && styles.inputError]}
                placeholder="John Doe"
                value={currentContact.name}
                onChangeText={(text) =>
                  setCurrentContact({ ...currentContact, name: text })
                }
                maxLength={30}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={[styles.modalInput, errors.phone && styles.inputError]}
                placeholder="(555) 123-4567"
                value={currentContact.phone}
                onChangeText={(text) =>
                  setCurrentContact({ ...currentContact, phone: text })
                }
                keyboardType="phone-pad"
                maxLength={14}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

              <Text style={styles.inputLabel}>Avatar URL (optional)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="https://example.com/avatar.jpg"
                value={currentContact.avatar}
                onChangeText={(text) =>
                  setCurrentContact({ ...currentContact, avatar: text })
                }
                autoCapitalize="none"
              />

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={handleCancelContact}
                  disabled={loading}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveContact}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.saveButtonText}>
                      {isEditing ? 'Update' : 'Create'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PINK_BG,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
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
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 20,
  },
  contactList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
  },
  contactDetails: {
    marginLeft: 12,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PINK,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contactModalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginTop: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff6f6',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: PINK,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default FakeCallScreen;