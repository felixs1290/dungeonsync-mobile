import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { auth, db, collection, getDoc, doc, onSnapshot } from '../utils/firebase';
import { styles } from '../styles/globalStyles';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import IconBar from '../components/IconBar';
import DismissKeyboard from '../components/DismissKeyboard';

export default function PlayerScreen({ route, navigation }) {
  const [userData, setUserData] = useState(route.params || null);
  const [characters, setCharacters] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user && !userData) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({ role: data.role, token: user.accessToken, username: data.username });
            console.log('User data fetched:', data);
          } else {
            console.log('No user document found for UID:', user.uid);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      };
      fetchUserData();
    }

    if (user) {
      const q = collection(db, `users/${user.uid}/characters`);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const characterList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Snapshot received - Characters:', characterList);
        setCharacters(characterList);
      }, (err) => {
        console.error('Snapshot error:', err);
      });
      return () => unsubscribe();
    }
  }, [user, userData]);

  if (!userData) {
    return <View style={styles.screenContainer}><Text style={styles.text}>Loading...</Text></View>;
  }

  return (
    <DismissKeyboard>
      <View style={styles.screenContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.subHeader}>Welcome, {userData.username}</Text>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.sectionHeader}>My Characters</Text>
          {characters.length === 0 ? (
            <Text style={styles.promptText}>Create your first character!</Text>
          ) : (
            <FlatList
              data={characters}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.characterCard}
                  onPress={() => navigation.navigate('Character', { characterId: item.id })}
                >
                  <Image
                    source={item.photo ? { uri: item.photo } : require('../assets/placeholder.png')}
                    style={styles.characterCardImage}
                    onError={(e) => console.log('Image load error for', item.name, e.nativeEvent.error)}
                  />
                  <View style={styles.characterCardInfo}>
                    <Text style={styles.characterCardName}>{item.name}</Text>
                    <Text style={styles.characterCardLevel}>Level {item.level}</Text>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.characterList}
            />
          )}
        </View>
        <View style={styles.footerContainer}>
          <CustomButton 
            title="Create a Character" 
            onPress={() => navigation.navigate('CreateCharacter')} 
            style={styles.touchableBox} 
            textStyle={styles.touchableText} 
          />
          <IconBar navigation={navigation} />
        </View>
      </View>
    </DismissKeyboard>
  );
}