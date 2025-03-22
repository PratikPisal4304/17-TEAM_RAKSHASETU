import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { db } from '../../config/firebaseConfig';

const storage = getStorage();
const auth = getAuth();

const InAppChatScreen = () => {
  const [state, setState] = useState({
    user: null,
    searchTerm: '',
    searchResults: [],
    requests: [],
    messagesList: [],
    chatData: {},
    selectedChat: null,
    inputText: '',
    previewImage: null,
    deleteMessage: null,
    deleteChatModalVisible: false
  });

  const chatListRef = useRef(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setState(prev => ({...prev, user: { uid: currentUser.uid, ...docSnap.data() }}));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!state.user?.uid) return;
    const q = query(collection(db, 'requests'), where('toUserId', '==', state.user.uid), where('status', '==', 'pending'));
    onSnapshot(q, (snapshot) => {
      const reqs = [];
      snapshot.forEach((docSnap) => reqs.push({ id: docSnap.id, ...docSnap.data() }));
      setState(prev => ({...prev, requests: reqs}));
    });
  }, [state.user?.uid]);

  const handleSendMessage = async () => {
    if (!state.inputText.trim() || !state.selectedChat?.threadId) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: 'me',
      text: state.inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setState(prev => ({
      ...prev,
      chatData: {
        ...prev.chatData,
        [state.selectedChat.threadId]: [...(prev.chatData[state.selectedChat.threadId] || []), newMsg]
      },
      inputText: ''
    }));

    try {
      await addDoc(collection(db, 'threads', state.selectedChat.threadId, 'messages'), {
        senderId: state.user.uid,
        text: state.inputText.trim(),
        createdAt: serverTimestamp()
      });
    } catch (error) {
      Alert.alert('Error', 'Message failed to send.');
    }
  };

  return (
    <LinearGradient colors={['#FFC0CB', '#FFB6C1']} style={styles.gradientWrapper}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {!state.selectedChat ? (
              <View style={styles.container}>
                <Text style={styles.screenTitle}>Chat</Text>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search users..."
                    value={state.searchTerm}
                    onChangeText={text => setState(prev => ({...prev, searchTerm: text}))}
                  />
                </View>
                
                <ScrollView>
                  {state.messagesList.map((item) => (
                    <TouchableOpacity key={item.threadId} style={styles.chatListItem}>
                      <Image source={{ uri: item.image }} style={styles.chatAvatar} />
                      <View style={styles.chatInfo}>
                        <Text style={styles.chatName}>{item.name}</Text>
                        <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : (
              <View style={styles.container}>
                <View style={styles.chatHeader}>
                  <TouchableOpacity onPress={() => setState(prev => ({...prev, selectedChat: null}))}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                  </TouchableOpacity>
                  <Text style={styles.chatHeaderText}>{state.selectedChat?.name}</Text>
                </View>

                <ScrollView ref={chatListRef}>
                  {state.chatData[state.selectedChat.threadId]?.map((item) => (
                    <View key={item.id} style={[
                      styles.chatBubble,
                      item.sender === 'me' ? styles.myMessage : styles.theirMessage
                    ]}>
                      <Text style={styles.chatBubbleText}>{item.text}</Text>
                      <Text style={styles.chatBubbleTime}>{item.time}</Text>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Type message..."
                    value={state.inputText}
                    onChangeText={text => setState(prev => ({...prev, inputText: text}))}
                  />
                  <TouchableOpacity onPress={handleSendMessage}>
                    <Ionicons name="send" size={24} color="#FF69B4" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: { flex: 1 },
  container: { flex: 1, padding: 20 },
  screenTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  searchInput: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10 },
  chatListItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 10 },
  chatAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  chatInfo: { flex: 1 },
  chatName: { fontWeight: 'bold' },
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingBottom: 15 },
  chatHeaderText: { fontWeight: 'bold', fontSize: 18, marginLeft: 10 },
  chatBubble: { maxWidth: '80%', padding: 10, borderRadius: 10, marginBottom: 5 },
  myMessage: { backgroundColor: '#fff', alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#f0f0f0', alignSelf: 'flex-start' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 10 },
  textInput: { flex: 1, marginRight: 10 }
});

export default InAppChatScreen;