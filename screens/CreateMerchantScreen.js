import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Image, ScrollView, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { db, collection, onSnapshot, query } from '../utils/firebase';
import { styles } from '../styles/globalStyles';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import DismissKeyboard from '../components/DismissKeyboard';

export default function CreateMerchantScreen({ navigation, route = {} }) {
  const preBuiltMerchant = route.params?.preBuiltMerchant || {};
  
  // Single declaration of state variables, using preBuiltMerchant if available
  const [name, setName] = useState(preBuiltMerchant.name || '');
  const [description, setDescription] = useState(preBuiltMerchant.description || '');
  const [photo, setPhoto] = useState(preBuiltMerchant.photo || '');
  const [level, setLevel] = useState(preBuiltMerchant.level ? preBuiltMerchant.level.toString() : '1');
  const [alignment, setAlignment] = useState(preBuiltMerchant.alignment || 'Neutral');
  const [specialism, setSpecialism] = useState(preBuiltMerchant.specialism || 'General Goods');
  const [wealth, setWealth] = useState(preBuiltMerchant.wealth ? preBuiltMerchant.wealth.toString() : '0');
  const [stock, setStock] = useState(preBuiltMerchant.stock || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [equipment, setEquipment] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    console.log('CreateMerchantScreen - Navigation:', navigation);
    console.log('CreateMerchantScreen - Route:', route);

    const q = query(collection(db, 'equipment'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEquipment(items);
    });
    return () => unsubscribe();
  }, [navigation, route]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setMessage('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const createMerchant = () => {
    if (!name.trim()) {
      setMessage('Please enter a merchant name');
      return;
    }
    const levelNum = parseInt(level);
    if (isNaN(levelNum) || levelNum < 1 || levelNum > 20) {
      setMessage('Level must be between 1 and 20');
      return;
    }
    const wealthNum = parseInt(wealth);
    if (isNaN(wealthNum) || wealthNum < 0) {
      setMessage('Wealth must be a non-negative number');
      return;
    }

    const merchant = {
      name: name.trim(),
      description: description.trim(),
      photo: photo || '',
      level: levelNum,
      alignment,
      specialism,
      wealth: wealthNum,
      stock,
    };

    console.log('Navigating back with merchant:', merchant);
    navigation.navigate('DMCreateEnvironmentScreen', { newMerchant: merchant });
  };

  const saveMerchant = () => {
    const merchant = { /* your merchant data */ };
    navigation.navigate('DMCreateEnvironmentScreen', {
      environment: route.params?.environment, // Pass back the full environment
      newMerchant: merchant,
      append: true,
    });
  };

  const openCategoryModal = () => setCategoryModalVisible(true);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchModalVisible(true);
    }
  };

  const focusSearchInput = () => {
    searchInputRef.current?.focus();
  };

  const filteredSearchEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['ALL', ...new Set(equipment.map((item) => item.category))];
  const filteredCategoryEquipment = selectedCategory
    ? equipment.filter((item) => item.category === selectedCategory)
    : [];

  const addItemToStock = (item) => {
    const existingItem = stock.find((s) => s.item.id === item.id);
    if (existingItem) {
      setStock(stock.map((s) =>
        s.item.id === item.id ? { ...s, quantity: s.quantity + 1 } : s
      ));
    } else {
      setStock([...stock, { item, quantity: 1 }]);
    }
  };

  const removeItemFromStock = (itemId) => {
    const existingItem = stock.find((s) => s.item.id === itemId);
    if (existingItem.quantity > 1) {
      setStock(stock.map((s) =>
        s.item.id === itemId ? { ...s, quantity: s.quantity - 1 } : s
      ));
    } else {
      setStock(stock.filter((s) => s.item.id !== itemId));
    }
  };

  const renderStockItem = ({ item }) => (
    <View style={styles.stockItem}>
      <Text style={styles.text}>{item.item.name} (x{item.quantity})</Text>
    </View>
  );

  const renderEquipmentItem = ({ item }) => {
    const inStock = stock.find((s) => s.item.id === item.id);
    return (
      <View style={styles.equipmentItem}>
        <Text style={styles.text}>{item.name}</Text>
        <View style={styles.itemActions}>
          <TouchableOpacity onPress={() => addItemToStock(item)}>
            <MaterialIcons name="add" size={24} color="#FBBF24" />
          </TouchableOpacity>
          {inStock && (
            <TouchableOpacity onPress={() => removeItemFromStock(item.id)}>
              <MaterialIcons name="remove" size={24} color="#FBBF24" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <DismissKeyboard>
      <View style={styles.screenContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={[styles.headerContainer, { marginTop: 40 }]}>
          <Text style={styles.header}>Create Merchant</Text>
        </View>
        <View style={styles.preBuiltButtonContainer}>
        <CustomButton
          title="Choose a pre-built merchant"
          onPress={() => navigation.navigate('PreBuiltMerchantsScreen')}
          style={styles.touchableBox}
          textStyle={styles.touchableText}
          />
        </View>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.fullWidthContentContainer}>
          <ScrollView>
            <Card>
              <Text style={styles.sectionHeader} numberOfLines={1}>Create your own Merchant</Text>
              <CustomButton
                title="Upload Photo"
                onPress={pickImage}
                style={styles.uploadButton}
              />
              {photo ? <Image source={{ uri: photo }} style={styles.previewImage} /> : null}

              <TextInput
                style={styles.input}
                placeholder="Merchant Name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Description"
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={setDescription}
                multiline
              />
              <View style={styles.row}>
                <Text style={styles.label}>Level</Text>
                <TextInput
                  style={styles.inputRight}
                  placeholder="1-20"
                  placeholderTextColor="#9CA3AF"
                  value={level}
                  onChangeText={setLevel}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Alignment</Text>
                <Picker
                  selectedValue={alignment}
                  onValueChange={(itemValue) => setAlignment(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Lawful Good" value="Lawful Good" />
                  <Picker.Item label="Neutral Good" value="Neutral Good" />
                  <Picker.Item label="Chaotic Good" value="Chaotic Good" />
                  <Picker.Item label="Lawful Neutral" value="Lawful Neutral" />
                  <Picker.Item label="Neutral" value="Neutral" />
                  <Picker.Item label="Chaotic Neutral" value="Chaotic Neutral" />
                  <Picker.Item label="Lawful Evil" value="Lawful Evil" />
                  <Picker.Item label="Neutral Evil" value="Neutral Evil" />
                  <Picker.Item label="Chaotic Evil" value="Chaotic Evil" />
                </Picker>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Specialism</Text>
                <Picker
                  selectedValue={specialism}
                  onValueChange={(itemValue) => setSpecialism(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="General Goods" value="General Goods" />
                  <Picker.Item label="Weaponsmith" value="Weaponsmith" />
                  <Picker.Item label="Armorsmith" value="Armorsmith" />
                  <Picker.Item label="Alchemist" value="Alchemist" />
                  <Picker.Item label="Herbalist" value="Herbalist" />
                  <Picker.Item label="Jeweler" value="Jeweler" />
                  <Picker.Item label="Enchanter" value="Enchanter" />
                </Picker>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Wealth</Text>
                <TextInput
                  style={styles.inputRight}
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  value={wealth}
                  onChangeText={setWealth}
                  keyboardType="numeric"
                />
                <Text style={styles.currencyLabel}>gp</Text>
              </View>

              <Text style={styles.subHeader}>Stock</Text>
              <TouchableOpacity style={styles.searchContainer} onPress={focusSearchInput}>
                <TextInput
                  ref={searchInputRef}
                  style={[styles.input, { flex: 1, paddingRight: 40, paddingLeft: 40 }]}
                  placeholder="Find an item"
                  placeholderTextColor="#9CA3AF"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  onSubmitEditing={handleSearch}
                />
                <TouchableOpacity
                  style={styles.searchIcon}
                  onPress={handleSearch}
                >
                  <MaterialIcons name="search" size={24} color="#FBBF24" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openCategoryModal}>
                  <MaterialIcons name="category" size={24} color="#FBBF24" style={styles.categoryIcon} />
                </TouchableOpacity>
              </TouchableOpacity>
              {stock.length > 0 && (
                <FlatList
                  data={stock}
                  keyExtractor={(item) => item.item.id}
                  renderItem={renderStockItem}
                  style={styles.stockList}
                />
              )}

              <CustomButton
                title="Add Merchant"
                onPress={createMerchant}
                style={styles.loginButton}
              />
              <Text style={styles.message}>{message}</Text>
            </Card>
          </ScrollView>

          <Modal
            visible={categoryModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setCategoryModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setCategoryModalVisible(false)}
                >
                  <MaterialIcons name="close" size={24} color="#FBBF24" />
                </TouchableOpacity>
                {!selectedCategory ? (
                  <FlatList
                    data={categories}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.categoryItem}
                        onPress={() => setSelectedCategory(item === 'ALL' ? null : item)}
                      >
                        <Text style={styles.text}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <FlatList
                    data={filteredCategoryEquipment}
                    keyExtractor={(item) => item.id}
                    renderItem={renderEquipmentItem}
                  />
                )}
              </View>
            </View>
          </Modal>

          <Modal
            visible={searchModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setSearchModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setSearchModalVisible(false)}
                >
                  <MaterialIcons name="close" size={24} color="#FBBF24" />
                </TouchableOpacity>
                <FlatList
                  data={filteredSearchEquipment}
                  keyExtractor={(item) => item.id}
                  renderItem={renderEquipmentItem}
                  ListEmptyComponent={<Text style={styles.text}>No items found</Text>}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </DismissKeyboard>
  );
}