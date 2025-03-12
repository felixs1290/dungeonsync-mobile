import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { signup, db, doc, setDoc } from '../utils/firebase';
import { styles } from '../styles/globalStyles';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignup = async () => {
    if (!email.trim() || !password.trim() || !username.trim() || !role) {
      setMessage('Please fill in all fields');
      return;
    }
  
    try {
      console.log('Signing up with:', { email: email.trim(), password: password.trim(), username: username.trim(), role });
      const userCredential = await signup(email.trim(), password.trim());
      const user = userCredential.user;
      console.log('User created:', user.uid);
      await setDoc(doc(db, 'users', user.uid), {
        username: username.trim(),
        email: email.trim(),
        role,
      });
      console.log('Firestore document set for UID:', user.uid);
      setMessage('Signup successful! Please log in.');
      navigation.navigate('Login');
    } catch (err) {
      setMessage(`Signup failed: ${err.message}`);
      console.error('Signup error:', err);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.navigate('Login')}
      >
        <MaterialIcons name="arrow-back" size={24} color="#FBBF24" />
      </TouchableOpacity>
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.loginCard}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#9CA3AF"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <MaterialIcons
              name={secureTextEntry ? 'visibility-off' : 'visibility'}
              size={24}
              color="#FBBF24"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleButton, role === 'Player' && styles.selectedRole]}
            onPress={() => setRole('Player')}
          >
            <Text style={styles.roleText}>Player</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === 'DM' && styles.selectedRole]}
            onPress={() => setRole('DM')}
          >
            <Text style={styles.roleText}>DM</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}