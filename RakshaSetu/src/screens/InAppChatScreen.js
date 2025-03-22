import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Image,
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

const InAppChatScreen = () => {
  const [state, setState] = useState({
    searchTerm: '',
    messages: [],
    selectedChat: null,
    inputText: '',
    previewImage: null,
    users: [
      { id: '1', name: 'John', image: 'https://placekitten.com/100/100' },
      { id: '2', name: 'Alice', image: 'https://placekitten.com/101/101' }
    ],
    chats: []
  });

  const handleSendMessage = () => {
    if (!state.inputText.trim() || !state.selectedChat) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: state.inputText.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setState(prev => ({
      ...prev,
      inputText: '',
      messages: [...prev.messages, newMessage],
      chats: prev.chats.map(chat => 
        chat.id === state.selectedChat.id ? 
        { ...chat, lastMessage: newMessage.text } : chat
      )
    }));
  };

  return (
    <LinearGradient colors={['#FFC0CB', '#FFB6C1']} style={styles.gradientWrapper}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                  {state.users.map((user) => (
                    <TouchableOpacity 
                      key={user.id}
                      style={styles.chatListItem}
                      onPress={() => setState(prev => ({
                        ...prev,
                        selectedChat: user,
                        messages: [],
                        chats: [...prev.chats, user]
                      }))}
                    >
                      <Image source={{ uri: user.image }} style={styles.chatAvatar} />
                      <View style={styles.chatInfo}>
                        <Text style={styles.chatName}>{user.name}</Text>
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

                <ScrollView>
                  {state.messages.map((message) => (
                    <View 
                      key={message.id}
                      style={[
                        styles.chatBubble,
                        message.sender === 'me' ? styles.myMessage : styles.theirMessage
                      ]}
                    >
                      <Text style={styles.chatBubbleText}>{message.text}</Text>
                      <Text style={styles.chatBubbleTime}>{message.time}</Text>
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
  searchInput: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 10 
  },
  chatListItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  chatAvatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 10 
  },
  chatInfo: { flex: 1 },
  chatName: { fontWeight: 'bold' },
  chatHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingBottom: 15 
  },
  chatHeaderText: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    marginLeft: 10 
  },
  chatBubble: { 
    maxWidth: '80%', 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 5 
  },
  myMessage: { 
    backgroundColor: '#fff', 
    alignSelf: 'flex-end' 
  },
  theirMessage: { 
    backgroundColor: '#f0f0f0', 
    alignSelf: 'flex-start' 
  },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 10 
  },
  textInput: { 
    flex: 1, 
    marginRight: 10 
  },
  chatBubbleText: { fontSize: 16 },
  chatBubbleTime: { fontSize: 12, color: '#666', marginTop: 4 }
});

export default InAppChatScreen;