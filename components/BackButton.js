// components/BackButton.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/globalStyles';

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.backArrow} onPress={onPress}>
      <MaterialIcons name="arrow-back" size={24} color="#FBBF24" />
    </TouchableOpacity>
  );
}