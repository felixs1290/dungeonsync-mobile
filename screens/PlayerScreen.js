import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { auth, db, collection, query, where, getDocs, onSnapshot } from '../utils/firebase';
import { styles } from '../styles/globalStyles';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import IconBar from '../components/IconBar';
import DismissKeyboard from '../components/DismissKeyboard';

export default function PlayerScreen({ route, navigation }) {
  const [userData, setUserData] = useState(route.params || null);
  const [characters, setCharacters] = useState([]);
  console.log('Navigation in PlayerScreen:', navigation);
  const user = auth.currentUser;

  useEffect(() => {
    if (user && !userData) {
      const userQuery = query(collection(db, 'users'), where('uid', '==', user.uid));
      getDocs(userQuery).then((userDocs) => {
        if (!userDocs.empty) {
          const data = userDocs.docs[0].data();
          setUserData({ role: data.role, token: user.accessToken, username: data.username });
        }
      }).catch((err) => console.error('Error fetching user data:', err));
    }

    if (user) {
      const q = collection(db, `users/${user.uid}/characters`);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const characterList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCharacters(characterList);
      });
      return () => unsubscribe();
    }
  }, [user, userData]);

  if (!userData) {
    return <View style={styles.container}><Text style={styles.text}>Loading...</Text></View>;
  }

  return (
    <DismissKeyboard>

    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.subHeader}>Welcome, {userData.username}</Text>
        console.log('Rendering PlayerScreen with characters:', characters);
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionHeader}>My Characters</Text>
        {characters.length === 0 ? (
          <Text style={styles.promptText}>Create your first character!</Text>
        ) : (
          <FlatList
          data={characters}
          keyExtractor={(item) => item.id}
          numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
              style={styles.characterBox}
              onPress={() => navigation.navigate('Character', { characterId: item.id })}
              >
                <Image
                  source={item.photo ? { uri: item.photo } : require('../assets/placeholder.png')}
                  style={styles.characterImage}
                  />
                <View style={styles.characterInfo}>
                  <Text style={styles.characterName}>{item.name}</Text>
                  <Text style={styles.characterLevel}>Lvl. {item.level}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.characterGrid}
            />
          )}
        <CustomButton 
          title="Create a Character" 
          onPress={() => navigation.navigate('CreateCharacter')} 
          style={styles.touchableBox} 
          textStyle={styles.touchableText} 
          />
      </View>
      <IconBar navigation={navigation} />
    </View>
   </DismissKeyboard>
  );
}