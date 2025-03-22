import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#FF6699', '#FF3366']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Image
              source={{ uri: 'https://i.imgur.com/2nCt3Sbl.png' }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Lucy</Text>
            <Text style={styles.userPhone}>+91 12345 67890</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Ionicons name="create-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Preferences Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {[
            { title: 'Manage Friends', icon: 'people-outline' },
            { title: 'Change Language', icon: 'language-outline' },
            { title: 'Notification Settings', icon: 'notifications-outline' },
            { title: 'Customize / Themes', icon: 'color-palette-outline' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              activeOpacity={0.7}
            >
              <View style={styles.listItemLeft}>
                <Ionicons name={item.icon} size={22} color="#666" />
                <Text style={styles.listItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#aaa" />
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
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              activeOpacity={0.7}
            >
              <View style={styles.listItemLeft}>
                <Ionicons name={item.icon} size={22} color="#666" />
                <Text style={styles.listItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#aaa" />
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
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#FDEDF1',
  },
  editIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});