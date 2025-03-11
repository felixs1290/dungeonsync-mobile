import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { auth, db, collection, query, onSnapshot, where, addDoc, getDocs, deleteDoc, doc } from '../utils/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/globalStyles';
import IconBar from '../components/IconBar';
import Card from '../components/Card';
import BackButton from '../components/BackButton';
import DismissKeyboard from '../components/DismissKeyboard';

export default function AddItemsScreen({ route, navigation }) {
  const { characterId } = route.params;
  const [equipment, setEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [message, setMessage] = useState('');
  const [backpackItems, setBackpackItems] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'equipment'));
    const unsubscribeEquip = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEquipment(items);
    });

    if (user && characterId) {
      const qBackpack = collection(db, `users/${user.uid}/characters/${characterId}/backpack`);
      const unsubscribeBackpack = onSnapshot(qBackpack, (snapshot) => {
        const items = snapshot.docs.map((doc) => doc.data().name);
        setBackpackItems(items);
      });
      return () => {
        unsubscribeEquip();
        unsubscribeBackpack();
      };
    }
    return () => unsubscribeEquip();
  }, [user, characterId]);

  const addToBackpack = async (item) => {
    try {
      await addDoc(collection(db, 'users', user.uid, 'characters', characterId, 'backpack'), {
        name: item.name,
        category: item.category,
        cost: item.cost,
        description: item.description,
        rarity: item.rarity,
        classification: item.classification,
        ac: item.ac,
        damage: item.damage,
        damage_type: item.damage_type,
        properties: item.properties,
        addedAt: new Date().toISOString(),
      });
      Alert.alert('Item Added', `${item.name} has been added to your backpack!`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const removeFromBackpack = async (itemName) => {
    try {
      const q = query(collection(db, `users/${user.uid}/characters/${characterId}/backpack`), where('name', '==', itemName));
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, `users/${user.uid}/characters/${characterId}/backpack`, docSnap.id));
      });
      Alert.alert('Item Removed', `${itemName} has been removed from your backpack!`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const filteredEquipment = equipment
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => selectedCategory === 'ALL' || item.category === selectedCategory);

  const categories = ['ALL', ...new Set(equipment.map((item) => item.category))];

  return (
    <DismissKeyboard>
      <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.backpackContainer}>
        <Card>
          <Text style={styles.sectionHeader}>Add Items</Text>
          <TextInput style={styles.input} placeholder="Search equipment..." placeholderTextColor="#9CA3AF" value={searchTerm} onChangeText={setSearchTerm} />
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryButton, selectedCategory === cat && styles.selectedCategory]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            data={filteredEquipment}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <TouchableOpacity onPress={() => navigation.navigate('EquipmentDetail', { item })} style={styles.itemTextContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemSubText}>{item.category} - {item.cost} gp</Text>
                </TouchableOpacity>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => addToBackpack(item)}>
                    <MaterialIcons name="add" size={24} color="#FBBF24" />
                  </TouchableOpacity>
                  {backpackItems.includes(item.name) && (
                    <TouchableOpacity onPress={() => removeFromBackpack(item.name)}>
                      <MaterialIcons name="remove" size={24} color="#FBBF24" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            style={styles.flatList}
          />
          <Text style={styles.message}>{message}</Text>
        </Card>
      </View>
      <IconBar navigation={navigation} />
    </View>
    </DismissKeyboard>
  );
}