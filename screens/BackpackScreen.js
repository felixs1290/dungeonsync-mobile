import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { auth, db, collection, onSnapshot } from '../utils/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/globalStyles';
import IconBar from '../components/IconBar';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import DismissKeyboard from '../components/DismissKeyboard';

export default function BackpackScreen({ route, navigation }) {
  const { characterId } = route.params;
  const [backpack, setBackpack] = useState([]);
  const [message, setMessage] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    if (user && characterId) {
      const q = collection(db, `users/${user.uid}/characters/${characterId}/backpack`);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBackpack(items);
      });
      return () => unsubscribe();
    }
  }, [user, characterId]);

  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.backpackContainer}>
        <Card>
          <Text style={styles.sectionHeader}>My Backpack</Text>
          {backpack.length === 0 ? (
            <Text style={styles.text}>Your backpack is empty</Text>
          ) : (
            <FlatList
              data={backpack}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemSubText}>{item.category} - {item.cost} gp</Text>
                </View>
              )}
              style={styles.flatList}
            />
          )}
          <CustomButton 
          title="Add Items" 
          onPress={() => navigation.navigate('AddItems', { characterId })} 
          style={styles.addItemsButton} 
        />
          <Text style={styles.message}>{message}</Text>
        </Card>
      </View>
      <IconBar navigation={navigation} />
    </View>
    </DismissKeyboard>
  );
}