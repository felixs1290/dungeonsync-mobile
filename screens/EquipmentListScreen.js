import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../styles/globalStyles';
import IconBar from '../components/IconBar';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import DismissKeyboard from '../components/DismissKeyboard';
import { db, collection, getDocs } from '../utils/firebase';

export default function EquipmentList({ navigation }) {
  const [equipment, setEquipment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentCollection = collection(db, 'equipment');
        const equipmentSnapshot = await getDocs(equipmentCollection);
        const equipmentList = equipmentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched equipment:', equipmentList);
        if (equipmentList.length === 0) {
          console.log('No equipment found in Firestore');
        }
        setEquipment(equipmentList);

        const uniqueCategories = equipmentList.length > 0
          ? ['all', ...new Set(equipmentList.map(item => item.category || 'Uncategorized'))]
          : ['all'];
        console.log('Categories:', uniqueCategories);
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching equipment:', err);
        setCategories(['all']);
      }
    };

    fetchEquipment();
  }, []);

  console.log('Current categories state:', categories);

  const filteredEquipment = equipment.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Filtered equipment:', filteredEquipment);

  return (
    <DismissKeyboard>
      <View style={styles.screenContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.backpackContainer}>
          <Card>
            <Text style={styles.sectionHeader}>Equipment List</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Search equipment..." 
              placeholderTextColor="#9CA3AF" 
              value={searchTerm} 
              onChangeText={setSearchTerm} 
            />
            <View style={styles.categoryContainer}>
              {Array.isArray(categories) ? (
                categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryButton, selectedCategory === cat && styles.selectedCategory]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text style={styles.categoryText}>{cat}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.text}>No categories available</Text>
              )}
            </View>
            <FlatList
              data={filteredEquipment}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.equipmentItem} // Updated style name
                  onPress={() => navigation.navigate('EquipmentDetail', { item })}
                >
                  <View style={styles.equipmentLeft}>
                    <Text style={styles.equipmentName}>{item.name}</Text>
                    <Text style={styles.equipmentCategory}>{item.category || 'Uncategorized'}</Text>
                  </View>
                  <Text style={styles.equipmentCost}>{item.cost || 0} gp</Text>
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