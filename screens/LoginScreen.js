import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { login, auth, sendPasswordResetEmail, db, doc, getDoc } from '../utils/firebase';
import { styles } from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    try {
      console.log('Attempting login with:', { email: email.trim(), password: password.trim() });
      const userCredential = await login(email.trim(), password.trim());
      const user = userCredential.user;
      console.log('Auth user:', user ? { uid: user.uid, email: user.email } : 'No user');
      if (user) {
        console.log('Fetching Firestore doc for UID:', user.uid);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        console.log('Firestore doc exists:', userDoc.exists());
        console.log('Firestore doc data:', userDoc.data());
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          console.log('User role:', role);
          navigation.navigate(role === 'DM' ? 'DMHome' : 'Player');
        } else {
          setMessage('User data not found in Firestore');
          console.log('No user document found for UID:', user.uid);
        }
      }
    } catch (err) {
      setMessage(`Login failed: ${err.message}`);
      console.error('Login error:', err);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setMessage('Please enter your email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      setMessage(`Reset failed: ${err.message}`);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.loginCard}>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.signupText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}