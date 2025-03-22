import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const PINK = '#ff5f96';
const CARD_RADIUS = 10;

// Helper function to format Date objects into local date strings.
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString();
};


const PostCard = ({
  post,
  onLikeToggle,
  onDeletePost,
  onCommentPost,
  onSharePost,
}) => {
  const lastTapRef = useRef(0);
  const animation = useRef(new Animated.Value(0)).current;

 
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likedBy ? post.likedBy.length : 0);

  const handleCardTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected: toggle like
      setIsLiked((prev) => {
        const newVal = !prev;
        setLikeCount((prevCount) => (newVal ? prevCount + 1 : prevCount - 1));
        onLikeToggle(post, newVal);
        if (newVal) triggerLikeAnimation();
        return newVal;
      });
    } else {
      lastTapRef.current = now;
    }
  };

  const triggerLikeAnimation = () => {
    animation.setValue(0);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.5],
  });

  return (
    <TouchableWithoutFeedback onPress={handleCardTap}>
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              style={styles.userAvatar}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.userName}>{post.userName || "Unknown User"}</Text>
              <Text style={styles.dateText}>
                Posted on: {formatTimestamp(post.createdAt)}
              </Text>
            </View>
          </View>
          {post.canDelete && (
            <TouchableOpacity onPress={() => onDeletePost(post)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
        {post.imageUrl ? (
          <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
        ) : null}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setIsLiked(!isLiked);
              setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
              onLikeToggle(post, !isLiked);
            }}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? "red" : "#666"}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.actionButtonText}>{likeCount || ""}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onCommentPost(post)}
          >
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.actionButtonText}>
              {post.commentCount ? post.commentCount : 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onSharePost(post)}
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
        {/* Animated heart overlay */}
        <Animated.View
          style={[
            styles.heartOverlay,
            { opacity: animation, transform: [{ scale }] },
          ]}
        >
          <Ionicons name="heart" size={80} color="red" />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function CommunityScreen() {
  const [searchTerm, setSearchTerm] = useState('');

 
  const staticPosts = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Alice',
      title: 'Welcome to the community!',
      content: 'This is a demo post.',
      imageUrl: 'https://via.placeholder.com/300',
      likedBy: [],
      commentCount: 2,
      createdAt: Date.now() - 86400000,
      canDelete: true,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Bob',
      title: 'Hello World',
      content: 'Just sharing some thoughts.',
      imageUrl: null,
      likedBy: [],
      commentCount: 0,
      createdAt: Date.now() - 43200000,
      canDelete: false,
    },
  ];

  const [posts] = useState(staticPosts);

  // For search suggestions.
  const filteredPosts =
    searchTerm.trim() === ''
      ? posts
      : posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.userName &&
              post.userName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
  const suggestionsSet = new Set();
  filteredPosts.forEach((post) => {
    if (post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      suggestionsSet.add(post.title);
    }
    if (
      post.userName &&
      post.userName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      suggestionsSet.add(post.userName);
    }
  });
  const suggestions = Array.from(suggestionsSet);

  const handleSearchSubmit = () => {
    Alert.alert('Search Submitted', searchTerm);
  };

 
  const handleLikeToggle = (post, isLiked) => {
    Alert.alert(
      'Like Toggled',
      `Post "${post.title}" is now ${isLiked ? 'liked' : 'unliked'}.`
    );
  };

  const handleSharePost = async (post) => {
    try {
      await Share.share({
        message: `Check out this post: "${post.title}"\n\n${post.content}`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCommentPost = (post) => {
    Alert.alert('Comment', `Open comment modal for post "${post.title}".`);
  };

  const handleDeletePost = (post) => {
    Alert.alert(
      'Delete Post',
      `Delete post "${post.title}"? (Static demo, no deletion occurs.)`
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header with Search */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Community</Text>
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={handleSearchSubmit}>
            <MaterialIcons name="search" size={24} color="#666" style={{ marginRight: 8 }} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Posts..."
            placeholderTextColor="#666"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </View>
        {searchTerm.trim() !== '' && suggestions.length > 0 && (
          <View style={styles.suggestionContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity key={index} onPress={() => setSearchTerm(suggestion)}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Posts Area */}
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.recentPostsHeader}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
            <TouchableOpacity
              style={styles.createPostButton}
              onPress={() =>
                Alert.alert('Create Post', 'Open create post modal (static demo).')
              }
            >
              <Ionicons name="add-circle-outline" size={18} color={PINK} style={{ marginRight: 4 }} />
              <Text style={styles.createPostButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLikeToggle={handleLikeToggle}
              onDeletePost={handleDeletePost}
              onCommentPost={handleCommentPost}
              onSharePost={handleSharePost}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  headerContainer: {
    backgroundColor: PINK,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: { flex: 1, color: '#666', fontSize: 15 },
  suggestionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
  },
  scrollContainer: { flex: 1, backgroundColor: '#f8f8f8' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  section: { marginBottom: 24, marginTop: 20 },
  recentPostsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PINK,
  },
  createPostButtonText: { color: PINK, fontWeight: '600' },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: PINK,
  },
  userName: { fontSize: 15, fontWeight: '600', color: '#333', marginLeft: 10 },
  dateText: { fontSize: 12, color: '#999', marginTop: 4, marginLeft: 10 },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 4,
  },
  postContent: { fontSize: 15, color: '#555', marginBottom: 12 },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionButtonText: { fontSize: 14, color: '#666' },
  heartOverlay: { position: 'absolute', top: '40%', left: '40%' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    maxHeight: '90%',
    alignSelf: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  pickImageButton: {
    backgroundColor: '#999',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  pickImageText: { color: '#fff', fontWeight: '600' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  modalButtonText: { color: '#fff', fontWeight: '600' },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 4,
  },
  commentUser: { fontWeight: 'bold', color: '#333' },
  commentText: { flex: 1, marginLeft: 10, color: '#555' },
  commentDate: { fontSize: 12, color: '#999', marginTop: 4 },
});
