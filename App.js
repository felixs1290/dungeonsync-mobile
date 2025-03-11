import React, { useState, useEffect } from 'react';
import { auth, db, collection, addDoc, getDocs, onSnapshot, query, where, deleteDoc, doc, updateDoc } from './utils/firebase';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, Alert } from 'react-native';
import { styles } from './styles/globalStyles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useFonts, Cinzel_400Regular, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import IconBar from './components/IconBar';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PlayerScreen from './screens/PlayerScreen';
import CharacterScreen from './screens/CharacterScreen';
import CreateCharacterScreen from './screens/CreateCharacterScreen';
import EditCharacterScreen from './screens/EditCharacterScreen';
import BackpackScreen from './screens/BackpackScreen';
import AddItemsScreen from './screens/AddItemsScreen';
import EquipmentListScreen from './screens/EquipmentListScreen';
import EquipmentDetailScreen from './screens/EquipmentDetailScreen';
import DMHomeScreen from './screens/DMHomeScreen';
import DMCreateEnvironmentScreen from './screens/DMCreateEnvironmentScreen';
import CreateMerchantScreen from './screens/CreateMerchantScreen';
import PreBuiltMerchantsScreen from './screens/PreBuiltMerchantsScreen';
import DMManageEnvironmentScreen from './screens/DMManageEnvironmentScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Character" component={CharacterScreen} />
        <Stack.Screen name="CreateCharacter" component={CreateCharacterScreen} />
        <Stack.Screen name="EditCharacter" component={EditCharacterScreen} />
        <Stack.Screen name="Backpack" component={BackpackScreen} />
        <Stack.Screen name="AddItems" component={AddItemsScreen} />
        <Stack.Screen name="EquipmentList" component={EquipmentListScreen} />
        <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} />
        <Stack.Screen name="DMHome" component={DMHomeScreen} />
        <Stack.Screen name="DMCreateEnvironmentScreen" component={DMCreateEnvironmentScreen} />
        <Stack.Screen name="CreateMerchantScreen" component={CreateMerchantScreen} />
        <Stack.Screen name="PreBuiltMerchantsScreen" component={PreBuiltMerchantsScreen} />
        <Stack.Screen name="DMManageEnvironmentScreen" component={DMManageEnvironmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}