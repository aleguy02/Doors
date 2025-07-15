import { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
} from 'react-native';

import CustomButton from '../buttons/CustomButton';
import { useAuth } from '../../contexts/AuthContext';
import { fireStoreDB } from '../../configs/firebaseConfig';
import { createNewShowService } from '../../services/showService';
import { getBandIDs } from '../../services/bandService';

const ShowFormScreen = () => {
  const { authState } = useAuth();
  const [showName, setShowName] = useState('');
  const [showDate, setShowDate] = useState('');
  const [showLocation, setShowLocation] = useState('');
  const [selectedBandId, setSelectedBandId] = useState('');
  const [userBands, setUserBands] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBands, setIsLoadingBands] = useState(true);

  // Load user's bands on component mount
  useEffect(() => {
    const loadUserBands = async () => {
      if (!authState.user) {
        setIsLoadingBands(false);
        return;
      }

      try {
        const bands = await getBandIDs(fireStoreDB, authState.user);
        setUserBands(bands);
        
        // Auto-select first band if only one exists
        const bandIds = Object.values(bands);
        if (bandIds.length === 1) {
          setSelectedBandId(bandIds[0]);
        }
      } catch (error: any) {
        console.error('Error loading bands:', error);
        Alert.alert('Error', 'Failed to load your bands');
      } finally {
        setIsLoadingBands(false);
      }
    };

    loadUserBands();
  }, [authState.user]);

  const handleCreateShow = async () => {
    if (!authState.user) {
      Alert.alert('Error', 'You must be logged in to create a show');
      return;
    }

    if (!showName || !showDate || !showLocation || !selectedBandId) {
      Alert.alert('Error', 'Please fill in all fields and select a band');
      return;
    }

    setIsLoading(true);
    try {
      const showId = await createNewShowService(
        fireStoreDB,
        authState.user,
        showName,
        showDate,
        showLocation,
        selectedBandId
      );
      
      Alert.alert('Success', 'Show created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setShowName('');
            setShowDate('');
            setShowLocation('');
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isLoadingBands) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">
          {isLoading ? 'Creating show...' : 'Loading bands...'}
        </Text>
      </View>
    );
  }

  // Check if user has any bands
  const bandEntries = Object.entries(userBands);
  const hasBands = bandEntries.length > 0;

  return (
    <ScrollView>
      <KeyboardAvoidingView
        id="main-content"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex px-6 py-10 gap-6"
      >
        <Text className="font-semibold text-3xl">Create New Show 🎵</Text>
        
        {!hasBands && (
          <View className="bg-yellow-100 p-4 rounded-md self-stretch">
            <Text className="text-yellow-800 text-center">
              You need to create or join a band before you can schedule shows.
            </Text>
          </View>
        )}
        
        <View
          id="form"
          className="flex flex-col justify-center items-end gap-4 self-stretch"
        >
          {hasBands && (
            <View className="flex flex-col items-start gap-2 self-stretch">
              <Text>Select Band</Text>
              <View className="bg-gray-200 border border-gray-300 rounded-md self-stretch">
                {bandEntries.map(([bandName, bandId]) => (
                  <CustomButton
                    key={bandId}
                    text={`${selectedBandId === bandId ? '✓ ' : ''}${bandName}`}
                    onPress={() => setSelectedBandId(bandId)}
                    variant={selectedBandId === bandId ? 'default' : 'default'}
                  />
                ))}
              </View>
            </View>
          )}
          <View className="flex flex-col items-start gap-2 self-stretch">
            <Text>Show Name</Text>
            <TextInput
              className="bg-gray-200 p-4 border border-gray-300 rounded-md self-stretch"
              placeholder="Concert at the venue"
              placeholderTextColor="#8897AD"
              onChangeText={(text) => setShowName(text)}
              value={showName}
              maxLength={50}
            />
          </View>
          
          <View className="flex flex-col items-start gap-2 self-stretch">
            <Text>Date & Time</Text>
            <TextInput
              className="bg-gray-200 p-4 border border-gray-300 rounded-md self-stretch"
              placeholder="YYYY-MM-DD HH:MM (e.g., 2025-12-31 20:00)"
              placeholderTextColor="#8897AD"
              onChangeText={(text) => setShowDate(text)}
              value={showDate}
            />
          </View>
          
          <View className="flex flex-col items-start gap-2 self-stretch">
            <Text>Location</Text>
            <TextInput
              className="bg-gray-200 p-4 border border-gray-300 rounded-md self-stretch"
              placeholder="Venue name, address"
              placeholderTextColor="#8897AD"
              onChangeText={(text) => setShowLocation(text)}
              value={showLocation}
              maxLength={100}
              multiline
              numberOfLines={2}
            />
          </View>
          
          {hasBands ? (
            <CustomButton
              text="Create Show"
              onPress={handleCreateShow}
            />
          ) : (
            <Text className="text-gray-500 text-center">
              Create or join a band to schedule shows
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ShowFormScreen;
