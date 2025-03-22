import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_URL = 'https://gnews.io/api/v4/search?q=women%20rights&lang=en&token=46c36e6121dc72392fa3fa7a6277b1e9';

const CommunityScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                const formattedPosts = data.articles.map((article, index) => ({
                    id: index.toString(),
                    title: article.title,
                    description: article.description || "No description available.",
                    image: article.image || 'https://i.imgur.com/8Km9tLL.jpg',
                }));
                setPosts(formattedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const renderPost = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity>
                <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Community</Text>
            <Text style={styles.subHeader}>Our community is a safe, supportive, and empowering.</Text>
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search Legal women rights"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {loading ? <ActivityIndicator size="large" color="#ff5f96" /> : (
                <FlatList 
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ff5f96',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    description: {
        fontSize: 14,
        color: 'gray',
    },
    readMore: {
        fontSize: 14,
        color: '#ff5f96',
        fontWeight: 'bold',
        marginTop: 10,
    },
};

export default CommunityScreen;
