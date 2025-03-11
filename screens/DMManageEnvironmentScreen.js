import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Switch, Share, ScrollView } from 'react-native';
import { auth, db, collection, addDoc, updateDoc, doc } from '../utils/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { styles } from '../styles/globalStyles';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import DMIconBar from '../components/DMIconBar';
import * as ImagePicker from 'expo-image-picker';

export default function DMManageEnvironmentScreen({ navigation, route }) {
  const environment = route.params?.environment || {};
  const [name, setName] = useState(environment.name || '');
  const [description, setDescription] = useState(environment.description || '');
  const [photo, setPhoto] = useState(environment.photo || '');
  const [merchants, setMerchants] = useState(environment.merchants || []);
  const [isLive, setIsLive] = useState(environment.isLive || false);
  const [message, setMessage] = useState('');
  const user = auth.currentUser;
  const identifier = environment.identifier || `DM${user.uid.slice(0, 5)}-${Date.now()}`;

  useEffect(() => {
    if (route?.params?.newMerchant) {
      setMerchants((prevMerchants) => {
        if (route.params.append) {
          return [...prevMerchants, route.params.newMerchant];
        }
        return [route.params.newMerchant];
      });
      navigation.setParams({ newMerchant: null, append: null });
    }
  }, [route?.params?.newMerchant, navigation]);

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

  const saveEnvironment = async () => {
    if (!name.trim()) {
      setMessage('Please enter an environment name');
      return;
    }

    try {
      const envData = {
        dmId: user.uid,
        name: name.trim(),
        description: description.trim(),
        photo: photo || '',
        identifier,
        merchants,
        isLive,
        createdAt: environment.createdAt || new Date().toISOString(),
      };

      if (environment.id) {
        await updateDoc(doc(db, 'environments', environment.id), envData);
        setMessage('Environment updated successfully!');
      } else {
        await addDoc(collection(db, 'environments'), envData);
        setMessage('Environment created successfully!');
      }
      navigation.navigate('DMHome');
    } catch (err) {
      setMessage(err.message);
      console.error('Error saving environment:', err);
    }
  };

  const toggleLiveStatus = () => {
    setIsLive((prev) => !prev);
  };

  const shareCode = async () => {
    try {
      await Share.share({
        message: `Join my environment: ${identifier}`,
      });
    } catch (err) {
      console.error('Error sharing code:', err);
    }
  };

  const renderMerchant = ({ item }) => (
    <View style={styles.merchantItem}>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.navigate('DMHome')} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Manage Environment</Text>
        </View>
        <View style={styles.fullWidthContentContainer}>
          <Card>
            <TextInput
              style={styles.input}
              placeholder="Environment Name"
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
            <CustomButton
              title="Upload Photo"
              onPress={pickImage}
              style={styles.uploadButton}
            />
            {photo ? <Image source={{ uri: photo }} style={styles.previewImage} /> : null}

            <Text style={styles.subHeader}>Unique Code</Text>
            <View style={styles.codeContainer}>
              <View style={styles.codeTextContainer}>
                <Text style={styles.text}>{identifier}</Text>
                <TouchableOpacity onPress={shareCode} style={styles.shareButton}>
                  <MaterialIcons name="share" size={24} color="#FBBF24" />
                </TouchableOpacity>
              </View>
              <QRCode
                value={identifier}
                size={150}
                color="#FBBF24"
                backgroundColor="#374151"
                style={styles.qrCode}
              />
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Status:</Text>
              <View style={styles.statusToggle}>
                <Text style={styles.statusText}>{isLive ? 'Live' : 'Offline'}</Text>
                <View style={[styles.statusCircle, { backgroundColor: isLive ? '#22C55E' : '#EF4444' }]} />
                <Switch
                  value={isLive}
                  onValueChange={toggleLiveStatus}
                  trackColor={{ false: '#EF4444', true: '#22C55E' }}
                  thumbColor="#FBBF24"
                />
              </View>
            </View>

            <Text style={styles.subHeader}>Merchants</Text>
            <CustomButton
              title="Add Merchant"
              onPress={() => navigation.navigate('CreateMerchantScreen')}
              style={styles.addItemsButton}
            />
            {merchants.length > 0 && (
              <FlatList
                data={merchants}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMerchant}
                style={styles.merchantList}
              />
            )}

            <CustomButton
              title="Save Environment"
              onPress={saveEnvironment}
              style={styles.loginButton}
            />
            <Text style={styles.message}>{message}</Text>
          </Card>
        </View>
      </ScrollView>
      <DMIconBar navigation={navigation} />
    </View>
  );
}