import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Image, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/globalStyles';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import DMIconBar from '../components/DMIconBar';
import DismissKeyboard from '../components/DismissKeyboard';
import { db, collection, query, onSnapshot } from '../utils/firebase';

export default function PreBuiltMerchantsScreen({ navigation, route }) {
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'equipment'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEquipment(items);
    });
    return () => unsubscribe();
  }, []);

  const getStockByLevel = (specialism, level) => {
    if (!level) return [];
    console.log(`Generating stock for ${specialism} at level ${level}`);
    const filtered = equipment
      .filter((item) => 
        item.category.toLowerCase().includes(specialism.toLowerCase()) &&
        !(item.rarity && item.rarity.toLowerCase() === 'rare')
      )
      .sort((a, b) => (a.value || 0) - (b.value || 0));
    const levelFactor = Math.floor(level / 4);
    const minCost = levelFactor * 50;
    const maxCost = (levelFactor + 1) * 50 + 50;
    const stock = filtered
      .filter((item) => (item.value || 0) >= minCost && (item.value || 0) <= maxCost)
      .slice(0, 15);
    const result = stock.length > 0 
      ? stock.map((item) => ({ item, quantity: Math.floor(Math.random() * 3) + 1 }))
      : filtered.slice(0, 15).map((item) => ({ item, quantity: 1 }));
    console.log('Generated stock:', result);
    return result;
  };

  useEffect(() => {
    const preBuiltMerchants = [
      {
        name: 'Grom the Weaponsmith',
        description: 'A gruff dwarf with a mastery of blades and armor.',
        photo: require('../Vendor_Images/V2.png'),
        level: null,
        alignment: 'Lawful Neutral',
        specialism: 'Weaponsmith',
        wealth: 500,
        stock: [],
      },
      {
        name: 'Elara the Potion Seller',
        description: 'An elven alchemist brewing potent concoctions.',
        photo: require('../Vendor_Images/V3.png'),
        level: null,
        alignment: 'Neutral Good',
        specialism: 'Alchemist',
        wealth: 300,
        stock: [],
      },
      {
        name: 'Zorak the Magic Specialist',
        description: 'A mysterious tiefling dealing in enchanted wares.',
        photo: require('../Vendor_Images/V4.png'),
        level: null,
        alignment: 'Chaotic Neutral',
        specialism: 'Enchanter',
        wealth: 700,
        stock: [],
      },
    ];

    setMerchants(preBuiltMerchants);
  }, [equipment]);

  const updateMerchantLevel = (level) => {
    const newLevel = level === '0' ? null : parseInt(level);
    setSelectedMerchant((prev) => {
      const updatedMerchant = {
        ...prev,
        level: newLevel,
        stock: newLevel ? getStockByLevel(prev.specialism, newLevel) : [],
      };
      console.log('Updated merchant:', updatedMerchant);
      return updatedMerchant;
    });
  };

  const selectMerchant = (merchant) => {
    if (!merchant.level) {
      alert('Please select a level for the merchant.');
      return;
    }
    navigation.navigate('DMCreateEnvironmentScreen', {
      environment: route.params?.environment, // Pass back the full environment
      newMerchant: { ...merchant, stock: merchant.stock || [] },
      append: true,
    });
    setSelectedMerchant(null);
  };

  const editMerchant = (merchant) => {
    if (!merchant.level) {
      alert('Please select a level for the merchant.');
      return;
    }
    navigation.navigate('CreateMerchantScreen', {
      preBuiltMerchant: { ...merchant, stock: merchant.stock || [] },
      environment: route.params?.environment, // Pass along the environment
    });
    setSelectedMerchant(null);
  };

  const renderMerchant = ({ item }) => (
    <TouchableOpacity style={styles.merchantBox} onPress={() => setSelectedMerchant(item)}>
      <Image source={item.photo} style={styles.merchantImage} />
      <View style={styles.merchantInfo}>
        <Text style={styles.characterName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderModalItem = ({ item, index }) => {
    if (index === 0) {
      // Header and details
      return (
        <Card>
          <Image source={selectedMerchant.photo} style={styles.previewImage} />
          <Text style={styles.sectionHeader}>{selectedMerchant.name}</Text>
          <Text style={styles.text}>{selectedMerchant.description}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Level:</Text>
            <Picker
              selectedValue={selectedMerchant.level ? selectedMerchant.level.toString() : '0'}
              onValueChange={updateMerchantLevel}
              style={styles.picker}
            >
              <Picker.Item label="Select Level" value="0" />
              {levelOptions.slice(1).map((level) => (
                <Picker.Item key={level} label={level} value={level} />
              ))}
            </Picker>
          </View>
          <Text style={styles.text}>Alignment: {selectedMerchant.alignment}</Text>
          <Text style={styles.text}>Specialism: {selectedMerchant.specialism}</Text>
          <Text style={styles.text}>Wealth: {selectedMerchant.wealth} gp</Text>
          {selectedMerchant.stock.length > 0 && (
            <Text style={styles.subHeader}>Stock</Text>
          )}
        </Card>
      );
    } else if (index <= selectedMerchant.stock.length) {
      // Stock items
      const stockItem = selectedMerchant.stock[index - 1];
      return (
        <View style={styles.stockItem}>
          <Text style={styles.text}>{stockItem.item.name} (x{stockItem.quantity})</Text>
        </View>
      );
    } else {
      // Footer with buttons
      return (
        <View style={styles.buttonRow}>
          <CustomButton
            title="Select Merchant"
            onPress={() => selectMerchant(selectedMerchant)}
            style={[styles.loginButton, styles.buttonRowItem]}
          />
          <CustomButton
            title="Edit Merchant"
            onPress={() => editMerchant(selectedMerchant)}
            style={[styles.loginButton, styles.buttonRowItem]}
          />
        </View>
      );
    }
  };

  const levelOptions = ['0', ...Array.from({ length: 20 }, (_, i) => (i + 1).toString())];

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.navigate('DMCreateEnvironmentScreen')} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Pre-Built Merchants</Text>
          </View>
          <View style={styles.fullWidthContentContainer}>
            <FlatList
              data={merchants}
              keyExtractor={(item) => item.name}
              numColumns={2}
              renderItem={renderMerchant}
              contentContainerStyle={styles.merchantGrid}
            />
          </View>
        </ScrollView>
        <DMIconBar navigation={navigation} />

        <Modal
          visible={!!selectedMerchant}
          transparent={false}
          animationType="slide"
          onRequestClose={() => setSelectedMerchant(null)}
        >
          <SafeAreaView style={styles.fullScreenModal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseButtonFull}
                onPress={() => setSelectedMerchant(null)}
              >
                <MaterialIcons name="close" size={24} color="#FBBF24" />
              </TouchableOpacity>
            </View>
            {selectedMerchant && (
              <FlatList
                data={[
                  'header',
                  ...selectedMerchant.stock,
                  'footer'
                ]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderModalItem}
                contentContainerStyle={styles.modalFullContent}
              />
            )}
          </SafeAreaView>
        </Modal>
      </View>
    </DismissKeyboard>
  );
}