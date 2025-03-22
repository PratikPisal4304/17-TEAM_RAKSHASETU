import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const posts = [
  {
    id: '1',
    title: 'Rising from the Ashes: The Story of Jhanvi Singh',
    description: 'Jhanvi Singh was once a vibrant young woman whose dreams were shattered after surviving a traumatic assault...',
    image: 'https://i.imgur.com/8Km9tLL.jpg', // Replace with your image
  },
  {
    id: '2',
    title: 'Breaking Barriers: Rina’s Legal Journey',
    description: 'Rina challenged outdated laws and became a symbol of courage in her community...',
    image: 'https://i.imgur.com/5tj6S7Ol.jpg',
  },
  {
    id: '3',
    title: 'Voices of Hope: Community Support Circle',
    description: 'A group of survivors coming together weekly to share, support and uplift each other...',
    image: 'https://i.imgur.com/ql8z3sL.jpg',
  },
];

const CommunityScreen = () => {
  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postRow}>
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text numberOfLines={3} style={styles.postDescription}>{item.description}</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.socialIcons}>
        <TouchableOpacity>
          <FontAwesome name="thumbs-up" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="send-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My community</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="create-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subTitle}>
        Our community is a safe, supportive, and empowering.
      </Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" style={{ marginRight: 10 }} />
        <TextInput placeholder="Search Legal women rights" style={{ flex: 1 }} />
      </View>

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      />

      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="people" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={30} color="gray" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5F96',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  subTitle: {
    textAlign: 'center',
    color: '#fff',
    marginVertical: 10,
  },
  searchBar: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  postRow: {
    flexDirection: 'row',
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  postDescription: {
    color: 'gray',
  },
  seeMore: {
    color: 'blue',
    marginTop: 5,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  
  
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default CommunityScreen;
