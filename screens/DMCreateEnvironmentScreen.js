import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import { auth, db, collection, addDoc } from '../utils/firebase';
import { styles } from '../styles/globalStyles';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import DMIconBar from '../components/DMIconBar';
import * as ImagePicker from 'expo-image-picker';

export default function DMCreateEnvironmentScreen({ navigation, route }) {
  const isFirstRender = useRef(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [message, setMessage] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    if (isFirstRender.current && route.params?.environment) {
      const { name: initialName, description: initialDesc, photo: initialPhoto } = route.params.environment;
      setName(initialName || '');
      setDescription(initialDesc || '');
      setPhoto(initialPhoto || '');
      isFirstRender.current = false;
    }
  }, [route.params?.environment]);

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

  const createEnvironment = async () => {
    if (!name.trim()) {
      setMessage('Please enter an environment name');
      return;
    }

    try {
      const identifier = `DM${user.uid.slice(0, 5)}-${Date.now()}`;
      const envData = {
        dmId: user.uid,
        name: name.trim(),
        description: description.trim(),
        photo: photo || '',
        identifier,
        merchants: [], // No merchants added here
        isLive: false,
        createdAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'environments'), envData);
      setMessage('Environment created successfully!');
      setName('');
      setDescription('');
      setPhoto('');
      navigation.navigate('DMHome', { newEnvironment: envData });
    } catch (err) {
      setMessage(`Error creating environment: ${err.message}`);
      console.error('Error creating environment:', err);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <BackButton onPress={() => navigation.navigate('DMHome')} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create Environment</Text>
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
            <CustomButton
              title="Create Environment"
              onPress={createEnvironment}
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