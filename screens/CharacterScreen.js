import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { auth, db, collection, query, where, onSnapshot, doc, deleteDoc } from '../utils/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/globalStyles';
import IconBar from '../components/IconBar';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import DismissKeyboard from '../components/DismissKeyboard';

export default function CharacterScreen({ route, navigation }) {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);

  const user = auth.currentUser;

  useEffect(() => {
    if (user && characterId) {
      const q = collection(db, `users/${user.uid}/characters`);
      const unsubscribe = onSnapshot(query(q, where('__name__', '==', characterId)), (snapshot) => {
        if (!snapshot.empty) {
          const charData = snapshot.docs[0].data();
          setCharacter({ id: snapshot.docs[0].id, ...charData });
        }
      });
      return () => unsubscribe();
    }
  }, [user, characterId]);

  const deleteCharacter = async () => {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/characters`, characterId));
      navigation.navigate('Player');
    } catch (err) {
      console.error('Error deleting character:', err);
    }
  };

  if (!character) {
    return <View style={styles.container}><Text style={styles.text}>Loading character...</Text></View>;
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.characterContainer}>
        <Card>
          <Text style={styles.sectionHeader}>{character.name}</Text>
          <Image
            source={character.photo ? { uri: character.photo } : require('../assets/placeholder.png')}
            style={styles.characterDetailImage}
          />
          <CustomButton 
            title="View Backpack" 
            onPress={() => navigation.navigate('Backpack', { characterId })} 
            style={styles.backpackButton} 
            />
            <CustomButton 
            title="Edit Character" 
            onPress={() => navigation.navigate('EditCharacter', { characterId })} 
            style={styles.editButton} 
            />
            <CustomButton 
            title="Delete Character" 
            onPress={() => Alert.alert('Delete Character', 'Are you sure?', [
            { text: 'Cancel' },
            { text: 'Delete', onPress: deleteCharacter }
            ])} 
            style={styles.deleteButton} 
            />
        </Card>
      </View>
      <IconBar navigation={navigation} />
    </View>
    </DismissKeyboard>
  );
}