import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch } from 'react-native';
import { auth, db, collection, query, where, onSnapshot, getDoc, doc } from '../utils/firebase';
import { styles } from '../styles/globalStyles';
import CustomButton from '../components/CustomButton';
import DMIconBar from '../components/DMIconBar';

export default function DMHomeScreen({ navigation, route }) {
  const [environments, setEnvironments] = useState(route.params?.newEnvironment ? [route.params.newEnvironment] : []);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setError('No user logged in');
      setLoading(false);
      return;
    }

    // Fetch username
    const fetchUsername = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || 'DM');
          console.log('Username fetched:', userDoc.data().username);
        } else {
          console.log('No user document found for UID:', user.uid);
          setUsername('DM');
        }
      } catch (err) {
        console.error('Error fetching username:', err.message);
        setUsername('DM');
      }
    };
    fetchUsername();

    // Fetch environments
    console.log('Fetching environments for UID:', user.uid);
    const q = query(collection(db, 'environments'), where('dmId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const envs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEnvironments(envs);
      setLoading(false);
      console.log('Environments loaded:', envs);
    }, (err) => {
      console.error('Error fetching environments:', err.code, err.message);
      setError(`Failed to load environments: ${err.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const renderEnvironment = ({ item }) => (
    <View style={styles.environmentBox}>
      <View style={styles.environmentLeft}>
        <Text style={styles.environmentName}>{item.name}</Text>
        <Text style={styles.environmentCode}>{item.identifier}</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status:</Text>
          <View style={styles.statusToggle}>
            <Text style={styles.statusText}>{item.isLive ? 'Live' : 'Offline'}</Text>
            <View style={[styles.statusCircle, { backgroundColor: item.isLive ? '#22C55E' : '#EF4444' }]} />
          </View>
        </View>
      </View>
      <CustomButton
        title="Manage"
        onPress={() => navigation.navigate('DMManageEnvironmentScreen', { environment: item })}
        style={styles.manageButton}
        textStyle={styles.manageButtonText}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome, {username}</Text>
      </View>
      <View style={styles.contentContainer}>
        <CustomButton
          title="Create New Environment"
          onPress={() => navigation.navigate('DMCreateEnvironmentScreen')}
          style={styles.touchableBox}
          textStyle={styles.touchableText}
        />
        <FlatList
          data={environments}
          keyExtractor={(item) => item.id}
          renderItem={renderEnvironment}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <DMIconBar navigation={navigation} />
    </View>
  );
}