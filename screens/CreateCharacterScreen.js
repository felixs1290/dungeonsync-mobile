import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { auth, db, collection, addDoc } from '../utils/firebase';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg'; // Add this for SVG icons
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/globalStyles';
import IconBar from '../components/IconBar';
import Card from '../components/Card';
import BackButton from '../components/BackButton';
import CustomButton from '../components/CustomButton';
import DismissKeyboard from '../components/DismissKeyboard';

console.log('Card:', Card);
console.log('CustomButton:', CustomButton);
console.log('IconBar:', IconBar);

export default function CreateCharacterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [race, setRace] = useState('Human');
  const [charClass, setCharClass] = useState('Barbarian');
  const [level, setLevel] = useState('1');
  const [background, setBackground] = useState('Acolyte');
  const [alignment, setAlignment] = useState('Lawful Good');
  const [strength, setStrength] = useState('10');
  const [dexterity, setDexterity] = useState('10');
  const [constitution, setConstitution] = useState('10');
  const [intelligence, setIntelligence] = useState('10');
  const [wisdom, setWisdom] = useState('10');
  const [charisma, setCharisma] = useState('10');
  const [currency, setCurrency] = useState('0');
  const [message, setMessage] = useState('');

  const user = auth.currentUser;

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

  const createCharacter = async () => {
    if (!name.trim()) {
      setMessage('Please enter a character name');
      return;
    }
    const levelNum = parseInt(level);
    if (isNaN(levelNum) || levelNum < 1 || levelNum > 20) {
      setMessage('Level must be between 1 and 20');
      return;
    }
    const stats = [strength, dexterity, constitution, intelligence, wisdom, charisma];
    for (let stat of stats) {
      const num = parseInt(stat);
      if (isNaN(num) || num < 3 || num > 18) {
        setMessage('Ability scores must be between 3 and 18');
        return;
      }
    }
    const currencyNum = parseInt(currency);
    if (isNaN(currencyNum) || currencyNum < 0) {
      setMessage('Currency must be a non-negative number');
      return;
    }

    try {
      await addDoc(collection(db, 'users', user.uid, 'characters'), {
        name: name.trim(),
        photo: photo || '',
        race,
        class: charClass,
        level: levelNum,
        background,
        alignment,
        abilityScores: {
          strength: parseInt(strength),
          dexterity: parseInt(dexterity),
          constitution: parseInt(constitution),
          intelligence: parseInt(intelligence),
          wisdom: parseInt(wisdom),
          charisma: parseInt(charisma),
        },
        currency: currencyNum,
        createdAt: new Date().toISOString(),
      });
      setMessage('Character created successfully!');
      navigation.navigate('Player');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <ScrollView style={styles.characterContainer}>
          <Card>
            <Text style={styles.sectionHeader}>Create a Character</Text>
            <TextInput style={styles.input} placeholder="Character Name" placeholderTextColor="#9CA3AF" value={name} onChangeText={setName} />
            <CustomButton title="Upload Photo" onPress={pickImage} style={styles.uploadButton} />
            {photo ? <Image source={{ uri: photo }} style={styles.previewImage} /> : null}

            <View style={styles.row}>
              <Text style={styles.label}>Race</Text>
              <Picker selectedValue={race} onValueChange={(itemValue) => setRace(itemValue)} style={styles.picker}>
                <Picker.Item label="Human" value="Human" />
                <Picker.Item label="Elf" value="Elf" />
                <Picker.Item label="Dwarf" value="Dwarf" />
                <Picker.Item label="Halfling" value="Halfling" />
                <Picker.Item label="Tiefling" value="Tiefling" />
                <Picker.Item label="Dragonborn" value="Dragonborn" />
                <Picker.Item label="Gnome" value="Gnome" />
                <Picker.Item label="Half-Elf" value="Half-Elf" />
                <Picker.Item label="Half-Orc" value="Half-Orc" />
                <Picker.Item label="Aasimar" value="Aasimar" />
                <Picker.Item label="Goliath" value="Goliath" />
                <Picker.Item label="Genasi" value="Genasi" />
                <Picker.Item label="Tabaxi" value="Tabaxi" />
              </Picker>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Class</Text>
              <Picker selectedValue={charClass} onValueChange={(itemValue) => setCharClass(itemValue)} style={styles.picker}>
                <Picker.Item label="Barbarian" value="Barbarian" />
                <Picker.Item label="Bard" value="Bard" />
                <Picker.Item label="Cleric" value="Cleric" />
                <Picker.Item label="Druid" value="Druid" />
                <Picker.Item label="Fighter" value="Fighter" />
                <Picker.Item label="Monk" value="Monk" />
                <Picker.Item label="Paladin" value="Paladin" />
                <Picker.Item label="Ranger" value="Ranger" />
                <Picker.Item label="Rogue" value="Rogue" />
                <Picker.Item label="Sorcerer" value="Sorcerer" />
                <Picker.Item label="Warlock" value="Warlock" />
                <Picker.Item label="Wizard" value="Wizard" />
              </Picker>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Level</Text>
              <TextInput style={styles.inputRight} placeholder="1-20" placeholderTextColor="#9CA3AF" value={level} onChangeText={setLevel} keyboardType="numeric" />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Background</Text>
              <Picker selectedValue={background} onValueChange={(itemValue) => setBackground(itemValue)} style={styles.picker}>
                <Picker.Item label="Acolyte" value="Acolyte" />
                <Picker.Item label="Charlatan" value="Charlatan" />
                <Picker.Item label="Criminal" value="Criminal" />
                <Picker.Item label="Entertainer" value="Entertainer" />
                <Picker.Item label="Folk Hero" value="Folk Hero" />
                <Picker.Item label="Guild Artisan" value="Guild Artisan" />
                <Picker.Item label="Hermit" value="Hermit" />
                <Picker.Item label="Noble" value="Noble" />
                <Picker.Item label="Outlander" value="Outlander" />
                <Picker.Item label="Sage" value="Sage" />
                <Picker.Item label="Sailor" value="Sailor" />
                <Picker.Item label="Soldier" value="Soldier" />
                <Picker.Item label="Urchin" value="Urchin" />
              </Picker>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Alignment</Text>
              <Picker selectedValue={alignment} onValueChange={(itemValue) => setAlignment(itemValue)} style={styles.picker}>
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

            <Text style={styles.subHeader}>Ability Scores</Text>
            <View style={styles.abilityContainer}>
              <View style={styles.abilityBox}>
                <View style={styles.row}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={require('../assets/icons/ability/strength.svg')}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.abilityLabel}>STR</Text>
                </View>
                <TextInput
                  style={styles.abilityInput}
                  placeholder="3-18"
                  placeholderTextColor="#9CA3AF"
                  value={strength}
                  onChangeText={setStrength}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.abilityBox}>
                <View style={styles.row}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={require('../assets/icons/ability/dexterity.svg')}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.abilityLabel}>DEX</Text>
                </View>
                <TextInput
                  style={styles.abilityInput}
                  placeholder="3-18"
                  placeholderTextColor="#9CA3AF"
                  value={dexterity}
                  onChangeText={setDexterity}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.abilityBox}>
                <View style={styles.row}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={require('../assets/icons/ability/constitution.svg')}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.abilityLabel}>CON</Text>
                </View>
                <TextInput
                  style={styles.abilityInput}
                  placeholder="3-18"
                  placeholderTextColor="#9CA3AF"
                  value={constitution}
                  onChangeText={setConstitution}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.abilityBox}>
                <View style={styles.row}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={require('../assets/icons/ability/intelligence.svg')}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.abilityLabel}>INT</Text>
                </View>
                <TextInput
                  style={styles.abilityInput}
                  placeholder="3-18"
                  placeholderTextColor="#9CA3AF"
                  value={intelligence}
                  onChangeText={setIntelligence}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.abilityBox}>
                <View style={styles.row}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={require('../assets/icons/ability/wisdom.svg')}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.abilityLabel}>WIS</Text>
                </View>
                <TextInput
                  style={styles.abilityInput}
                  placeholder="3-18"
                  placeholderTextColor="#9CA3AF"
                  value={wisdom}
                  onChangeText={setWisdom}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.abilityBox}>
                <View style={styles.row}>
                  <SvgUri
                    width="20"
                    height="20"
                    uri={require('../assets/icons/ability/charisma.svg')}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.abilityLabel}>CHA</Text>
                </View>
                <TextInput
                  style={styles.abilityInput}
                  placeholder="3-18"
                  placeholderTextColor="#9CA3AF"
                  value={charisma}
                  onChangeText={setCharisma}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.subHeader}>Currency</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Gold Pieces</Text>
              <TextInput
                style={styles.inputRight}
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                value={currency}
                onChangeText={setCurrency}
                keyboardType="numeric"
              />
              <Text style={styles.currencyLabel}>gp</Text>
            </View>
            <CustomButton title="Create Character" onPress={createCharacter} />
            <Text style={styles.message}>{message}</Text>
          </Card>
        </ScrollView>
        <IconBar navigation={navigation} />
      </View>
    </DismissKeyboard>
  );
}