import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
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

// Replace with your actual API base URL
const API_URL = 'https://gnews.io/api/v4/search?q=women%20rights&lang=en&token=46c36e6121dc72392fa3fa7a6277b1e9';

// Helper function to format Date objects into local date strings.
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString();
};

/**
 * PostCard Component
 * - Renders a post from your API data.
 * - Double tap to like with an animation.
 * - Has icons for like, comment, share, delete.
 */
const PostCard = ({
  post,
  onLikeToggle,
  onDeletePost,
  onCommentPost,
  onSharePost,
}) => {
  const lastTapRef = useRef(0);
  const animation = useRef(new Animated.Value(0)).current;

  // For demonstration, we track local like state to animate quickly
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  // Handle double-tap to like
  const handleCardTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected: toggle like
      toggleLike();
    } else {
      lastTapRef.current = now;
    }
  };

  const toggleLike = () => {
    const newVal = !isLiked;
    setIsLiked(newVal);
    setLikeCount((prev) => (newVal ? prev + 1 : prev - 1));
    onLikeToggle(post, newVal);
    if (newVal) triggerLikeAnimation();
  };

  // Like animation
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
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Image
              source={{ uri: post.userAvatar || 'https://via.placeholder.com/40' }}
              style={styles.userAvatar}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.userName}>
                {post.userName || 'Unknown User'}
              </Text>
              <Text style={styles.dateText}>
                Posted on: {formatTimestamp(post.createdAt)}
              </Text>
            </View>
          </View>
          {/* Delete icon if allowed */}
          {post.canDelete && (
            <TouchableOpacity onPress={() => onDeletePost(post)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>

        {/* Post Title & Content */}
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>

        {/* Post Image */}
        {post.imageUrl ? (
          <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
        ) : null}

        {/* Action Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={toggleLike}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={20}
              color={isLiked ? 'red' : '#666'}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.actionButtonText}>{likeCount}</Text>
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
              {post.commentCount || 0}
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // For search suggestions
  const suggestionsSet = new Set();

  // ------------------------
  //  API CALLS
  // ------------------------
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/posts`);
      // Expecting each post object to have:
      // { id, userName, title, content, imageUrl, createdAt, isLiked, likes, commentCount, canDelete, userAvatar }
      setPosts(res.data || []);
    } catch (error) {
      Alert.alert('Error', 'Error fetching posts from server.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Like on the server
  const handleLikeToggle = async (post, isLiked) => {
    try {
      await axios.post(`${API_URL}/posts/${post.id}/like`, { isLiked });
      // Re-fetch or optimistically update local state
      fetchPosts();
    } catch (error) {
      Alert.alert('Error', 'Unable to like post.');
      console.error(error);
    }
  };

  // Delete Post on the server
  const handleDeletePost = async (post) => {
    Alert.alert(
      'Delete Post',
      `Are you sure you want to delete "${post.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/posts/${post.id}`);
              fetchPosts();
            } catch (error) {
              Alert.alert('Error', 'Unable to delete post.');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  // Comment on a post
  const handleCommentPost = (post) => {
    Alert.alert('Comment', `Open comment modal for post "${post.title}".`);
    // You could navigate to a comment screen or show a comment modal.
  };

  // Share a post
  const handleSharePost = async (post) => {
    try {
      await Share.share({
        message: `Check out this post: "${post.title}"\n\n${post.content}`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // ------------------------
  //  SEARCH / FILTER
  // ------------------------
  const filteredPosts = posts.filter((p) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      p.title?.toLowerCase().includes(lowerSearch) ||
      p.content?.toLowerCase().includes(lowerSearch) ||
      p.userName?.toLowerCase().includes(lowerSearch)
    );
  });

  filteredPosts.forEach((post) => {
    // Build suggestions
    if (post.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
      suggestionsSet.add(post.title);
    }
    if (post.userName?.toLowerCase().includes(searchTerm.toLowerCase())) {
      suggestionsSet.add(post.userName);
    }
  });
  const suggestions = Array.from(suggestionsSet);

  // Called when user presses search icon or hits enter
  const handleSearchSubmit = () => {
    // If you want to do a server-side search, do it here
    Alert.alert('Search Submitted', searchTerm);
  };

  // ------------------------
  //  RENDER
  // ------------------------
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
              onPress={() => Alert.alert('Create Post', 'Open create post modal (use an API call).')}
            >
              <Ionicons name="add-circle-outline" size={18} color={PINK} style={{ marginRight: 4 }} />
              <Text style={styles.createPostButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>

          {/* Loading Indicator */}
          {loading ? (
            <ActivityIndicator size="large" color={PINK} style={{ marginTop: 20 }} />
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLikeToggle={handleLikeToggle}
                onDeletePost={handleDeletePost}
                onCommentPost={handleCommentPost}
                onSharePost={handleSharePost}
              />
            ))
          )}
        </View>
      </KeyboardAwareScrollView>

      {/* Floating Buttons */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => Alert.alert('GeminiChat', 'Navigate to GeminiChat screen.')}
      >
        <Ionicons name="sparkles" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.chatfloatingButton}
        onPress={() => Alert.alert('InAppChat', 'Navigate to InAppChat screen.')}
      >
        <Ionicons name="chatbubbles-sharp" size={28} color="#fff" />
      </TouchableOpacity>
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
  // PostCard styles
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
  userName: { fontSize: 15, fontWeight: '600', color: '#333' },
  dateText: { fontSize: 12, color: '#999', marginTop: 4 },
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
  heartOverlay: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  // Floating buttons
  floatingButton: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    backgroundColor: PINK,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
  },
  chatfloatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: PINK,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
  },
});
