import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Linking,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
const PINK = '#ff5f96';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  
  // Static user data
  const [username] = useState('Lucy Patil');
  const [avatarUrl] = useState(null);
  
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  // Static notifications list (for demo purposes)
  const staticNotifications = [
    {
      id: '1',
      title: 'Welcome!',
      message: 'Thanks for joining our platform.',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      title: 'Reminder',
      message: 'Don’t forget to check out our new features.',
      timestamp: new Date(),
      read: true,
    },
  ];
  const [notifications] = useState(staticNotifications);
  const [loading] = useState(false);

  // Animated values for scale and opacity
  const modalScale = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  // Animate modal when visibility changes
  useEffect(() => {
    if (notificationModalVisible) {
      Animated.parallel([
        Animated.timing(modalScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [notificationModalVisible, modalOpacity, modalScale]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Notification Modal */}
      <Modal
        transparent={true}
        visible={notificationModalVisible}
        onRequestClose={() => setNotificationModalVisible(false)}
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={() => setNotificationModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{ scale: modalScale }],
                  opacity: modalOpacity,
                },
              ]}
            >
              <View style={styles.notificationHeader}>
                <Ionicons name="notifications" size={20} color="#fff" />
                <Text style={styles.notificationHeaderText}>Notifications</Text>
              </View>

              <ScrollView style={styles.notificationBody}>
                {loading ? (
                  <ActivityIndicator color={PINK} size="small" style={{ padding: 20 }} />
                ) : notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <View
                      key={notification.id}
                      style={[
                        styles.notificationItem,
                        { backgroundColor: notification.read ? '#F8F8F8' : '#FFF0F5' },
                      ]}
                    >
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <Text style={styles.notificationTime}>
                        {notification.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        · {notification.timestamp.toLocaleDateString()}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyNotification}>
                    <Ionicons name="notifications-off-outline" size={40} color="#DDD" />
                    <Text style={styles.emptyNotificationText}>No new notifications</Text>
                  </View>
                )}
              </ScrollView>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[styles.closeButton, { flex: 1 }]}
                  onPress={() => setNotificationModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Dismiss</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        {/* Pink Header with Curve */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={avatarUrl ? { uri: avatarUrl } : require('../../assets/icon.png')}
              style={styles.avatar}
            />
            <Text style={styles.greeting}>{t('home.greeting')}</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => setNotificationModalVisible(true)}>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity onPress={() => navigation.navigate('FakeCall')} style={styles.actionButton}>
            <Image
              source={require('../../assets/fake-call.png')}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>{t('home.fakeCall')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={require('../../assets/livelocation.png')}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>{t('home.shareLiveLocation')}</Text>
          </TouchableOpacity>
        </View>

        {/* Add Close People Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.addClosePeopleTitle')}</Text>
            <Text style={styles.sectionSubtitle}>{t('home.addClosePeopleSubtitle')}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddFriends')}>
            <Text style={styles.addButtonText}>{t('home.addFriendsButton')}</Text>
            <Ionicons name="person-add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Skill Development Section */}
        <TouchableOpacity 
          style={styles.skillSection} 
          onPress={() => navigation.navigate('SkillDevelopment')}
        >
          <View style={styles.skillContent}>
            <View style={styles.skillIconContainer}>
              <Image
                source={require('../../assets/skill.png')}
                style={styles.skillIcon}
              />
            </View>
            <View style={styles.skillTextContainer}>
              <Text style={styles.skillTitle}>{t('home.skillTitle')}</Text>
              <Text style={styles.skillSubtitle}>{t('home.skillSubtitle')}</Text>
              <View style={styles.skillProgress}>
                <View style={styles.progressBar}>
                  <View style={styles.progressFill} />
                </View>
                <Text style={styles.progressText}>{t('home.skillProgressText')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.skillArrowContainer}>
            <Ionicons name="chevron-forward" size={24} color={PINK} />
          </View>
        </TouchableOpacity>

        {/* AI Report Generator Section */}
        <TouchableOpacity style={styles.journeySection} onPress={() => navigation.navigate('GenerateReport')}> 
          <View style={styles.journeyContent}>
            <Image
              source={require('../../assets/report.png')}
              style={styles.journeyIcon}
            />
            <View>
              <Text style={styles.journeyTitle}>{t('home.generateReportTitle')}</Text>
              <Text style={styles.journeySubtitle}>{t('home.generateReportSubtitle')}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: PINK,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 40,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'column',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  actionText: {
    textAlign: 'center',
    color: '#000',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#FF4B8C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 25,
    gap: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
  skillSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: PINK,
  },
  skillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  skillIconContainer: {
    backgroundColor: PINK + '15',
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  skillIcon: {
    width: 40,
    height: 40,
  },
  skillTextContainer: {
    flex: 1,
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  skillSubtitle: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  skillProgress: {
    width: '100%',
    marginTop: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    width: '100%',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    width: '40%',
    backgroundColor: PINK,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
  },
  skillArrowContainer: {
    backgroundColor: PINK + '10',
    padding: 8,
    borderRadius: 20,
  },
  journeySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  journeyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  journeyIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  journeyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  journeySubtitle: {
    color: '#666',
    fontSize: 12,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContainer: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 55,
    right: 15,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  notificationHeader: {
    backgroundColor: PINK,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  notificationHeaderText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  notificationBody: {
    padding: 12,
    maxHeight: 350,
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: PINK,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'right',
  },
  emptyNotification: {
    padding: 25,
    alignItems: 'center',
  },
  emptyNotificationText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeButtonText: {
    color: PINK,
    fontWeight: '600',
    fontSize: 15,
  },
});
