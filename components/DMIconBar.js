import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, logout } from '../utils/firebase';
import { styles } from '../styles/globalStyles';

export default function DMIconBar({ navigation }) {
  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <View style={styles.iconBar}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('DMHome')}
      >
        <MaterialIcons name="public" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Realms</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => console.log('Go Live TBD')} // Placeholder for now
      >
        <MaterialIcons name="stream" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Go Live</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => console.log('Merchants TBD')} // Placeholder for now
      >
        <MaterialIcons name="storefront" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Merchants</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('EquipmentList')}
      >
        <MaterialIcons name="shield" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Equipment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}