import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.imgur.com/2nCt3Sbl.png' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Lucy</Text>
          <Text style={styles.userPhone}>+91 12345 67890</Text>
          <TouchableOpacity style={styles.editIcon}
          onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="create-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {[
            { title: 'Manage Friends', icon: 'people-outline' },
            { title: 'Change Language', icon: 'language-outline' },
            { title: 'Notification Settings', icon: 'notifications-outline' },
            { title: 'Customize / Themes', icon: 'color-palette-outline' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <Ionicons name={item.icon} size={24} color="#666" />
                <Text style={styles.listItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>
          ))}
        </View>

        {/* More Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>More</Text>
          {[
            { title: 'Help Line Numbers', icon: 'call-outline' },
            { title: 'Connectivity Settings', icon: 'wifi-outline' },
            { title: 'Help & Support', icon: 'help-circle-outline' },
            { title: 'About Us', icon: 'information-circle-outline' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <Ionicons name={item.icon} size={24} color="#666" />
                <Text style={styles.listItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Extra spacing for smooth scrolling */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    paddingBottom: 20, // Ensures smooth scrolling
  },
  header: {
    backgroundColor: '#FF6699',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  userPhone: {
    fontSize: 14,
    color: '#FDEDF1',
    marginTop: 4,
  },
  editIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
});

