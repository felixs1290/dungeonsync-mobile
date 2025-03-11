import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db, collection, onSnapshot, query } from '../utils/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/globalStyles';
import IconBar from '../components/IconBar';
import Card from '../components/Card';
import BackButton from '../components/BackButton';
import DismissKeyboard from '../components/DismissKeyboard';

export default function EquipmentListScreen({ navigation }) {
  const [equipment, setEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    const q = query(collection(db, 'equipment'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEquipment(items);
    });
    return () => unsubscribe();
  }, []);

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
          <Text style={styles.sectionHeader}>Equipment List</Text>
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
              <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate('EquipmentDetail', { item })}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemSubText}>{item.category} - {item.cost} gp</Text>
              </TouchableOpacity>
            )}
            style={styles.flatList}
            />
        </Card>
      </View>
      <IconBar navigation={navigation} />
    </View>
    </DismissKeyboard>
  );
}