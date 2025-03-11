import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/globalStyles';
import Card from '../components/Card';
import DismissKeyboard from '../components/DismissKeyboard';

export default function EquipmentDetailScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <DismissKeyboard>

    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={24} color="#FBBF24" />
      </TouchableOpacity>
      <View style={styles.detailContainer}>
        <Card>
          <Text style={styles.sectionHeader}>{item.name}</Text>
          <Text style={styles.detailText}>Category: {item.category}</Text>
          <Text style={styles.detailText}>Cost: {item.cost} gp</Text>
          <Text style={styles.detailText}>Description: {item.description || 'N/A'}</Text>
          <Text style={styles.detailText}>Rarity: {item.rarity || 'Common'}</Text>
          <Text style={styles.detailText}>Classification: {item.classification || 'N/A'}</Text>
          {item.ac && <Text style={styles.detailText}>AC: {item.ac}</Text>}
          {item.damage && <Text style={styles.detailText}>Damage: {item.damage} ({item.damage_type})</Text>}
          {item.properties && <Text style={styles.detailText}>Properties: {item.properties.join(', ')}</Text>}
        </Card>
      </View>
    </View>
    </DismissKeyboard>
  );
}