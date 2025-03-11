import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function CustomButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity style={[styles.loginButton, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}