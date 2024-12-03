import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { onSnapshot, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";


interface Post {
    id: string;
    content: string;
    likes: number; // Add the `likes` property
  }
  
  
export default function FeedsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            content: doc.data().content || "", // Ensure `content` is always present
            likes: doc.data().likes || 0,     // Ensure `likes` is always present
          })) as Post[]; // Cast the array to `Post[]`
          setPosts(data);
        });
        return () => unsubscribe();
      }, []);
      

  const handleAddPost = async () => {
    if (!newPost) return;
    await addDoc(collection(db, "posts"), {
      content: newPost,
      likes: 0,
      createdAt: new Date(),
    });
    setNewPost("");
  };

  const handleLikePost = async (postId: string, currentLikes: number) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { likes: currentLikes + 1 });
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Post something..."
        value={newPost}
        onChangeText={setNewPost}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleLikePost(item.id, item.likes)}>
                <Ionicons name="heart-outline" size={20} color="red" />
                <Text style={styles.likes}>{item.likes} Likes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 10 },
  input: { backgroundColor: "#1e1e2d", padding: 10, marginVertical: 10, borderRadius: 8, color: "#fff" },
  button: { backgroundColor: "#00ffcc", padding: 10, alignItems: "center", borderRadius: 8 },
  buttonText: { color: "#121212", fontWeight: "bold" },
  post: { backgroundColor: "#1e1e2d", padding: 15, marginVertical: 10, borderRadius: 8 },
  content: { color: "#fff", fontSize: 16 },
  actions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  likes: { color: "#fff", marginLeft: 5 },
});
