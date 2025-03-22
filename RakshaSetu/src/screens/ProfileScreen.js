import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const handleMenuPress = (menuName) => {
    // You can navigate or perform any action here
    console.log(`${menuName} pressed`);
    // navigation.navigate(menuName) or any other function
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Replace with any avatar image or Memoji you want */}
        <Image
          source={{
            uri: 'https://i.imgur.com/2nCt3Sbl.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Lucy</Text>
        <Text style={styles.userPhone}>+91 12345 67890</Text>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.content}>
        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMenuPress('Manage Friends')}
          >
            <View style={styles.listItemLeft}>
              <Ionicons name="people-outline" size={24} color="#333" />
              <Text style={styles.listItemText}>Manage Friends</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMenuPress('Change Language')}
          >
            <View style={styles.listItemLeft}>
              <Ionicons name="language-outline" size={24} color="#333" />
              <Text style={styles.listItemText}>Change Language</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMenuPress('Notification Settings')}
          >
            <View style={styles.listItemLeft}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <Text style={styles.listItemText}>Notification Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMenuPress('Avatars / Themes')}
          >
            <View style={styles.listItemLeft}>
              <Ionicons name="color-palette-outline" size={24} color="#333" />
              <Text style={styles.listItemText}>Avatars / Themes</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* More */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMenuPress('Help Line Numbers')}
          >
            <View style={styles.listItemLeft}>
              <Ionicons name="call-outline" size={24} color="#333" />
              <Text style={styles.listItemText}>Help Line Numbers</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMenuPress('Connectivity Settings')}
          >
            <View style={styles.listItemLeft}>
              <Ionicons name="wifi-outline" size={24} color="#333" />
              <Text style={styles.listItemText}>Connectivity Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMenuPress('Help & Support')}
          >
            <View style={styles.listItemLeft}>
              <Ionicons name="help-circle-outline" size={24} color="#333" />
              <Text style={styles.listItemText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMenuPress('About Us')}
          >
            <View style={styles.listItemLeft}>
              <Ionicons name="information-circle-outline" size={24} color="#333" />
              <Text style={styles.listItemText}>About Us</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation / SOS Button */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>Chat</Text>
        </TouchableOpacity>

        {/* SOS Button */}
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => handleMenuPress('SOS')}
        >
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.tabItemText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#FFB6C1', // Pink-ish
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  userPhone: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
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
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabItemText: {
    fontSize: 12,
    marginTop: 2,
    color: '#666',
  },
  sosButton: {
    backgroundColor: '#FF5C5C',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30, // Pull it up
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  sosText: {
    color: '#FFF',
    fontWeight: '700',
  },
});
