import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { logout } from '../utils/firebase';
import { styles } from '../styles/globalStyles';

export default function IconBar({ navigation }) {
  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleJoinRealm = () => {
    console.log('Join a Realm clicked');
  };

  return (
    <View style={styles.iconBar}>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Player')}>
        <MaterialIcons name="group" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Characters</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('EquipmentList')}>
        <MaterialIcons name="shield" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Equipment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={handleJoinRealm}>
        <MaterialIcons name="public" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Join a Realm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#FBBF24" />
        <Text style={styles.iconText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}