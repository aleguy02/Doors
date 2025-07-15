import React from 'react';
import {
  View,
  Text,
  Pressable,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

import CustomButton from '../buttons/CustomButton';
import { FirestoreBandType } from '../../types/FirestoreBandType';
import { FirestoreShowType } from '../../types/FirestoreShowType';
import { deleteBandService } from '../../services/bandService';
import { getBandShowsService } from '../../services/showService';
import { useAuth } from '../../contexts/AuthContext';

interface BandInfoScreenType {
  onButtonPress: (bandName: string) => void;
  code: string;
  info: FirestoreBandType;
}

// const example_data: Record<string, FirestoreBandType> = {
//   band123: {
//     owner: 'darthaleguy@gmail.com',
//     members: ['fake@gmail.com'],
//     name: 'The Gnomies',
//   },
//   another123: {
//     owner: 'darthaleguy@gmail.com',
//     members: [],
//     name: 'Idle Hands',
//   },
// };

const errorToast = (text1: string, text2: string) => {
  Toast.show({
    type: 'error',
    text1: text1,
    text2: text2,
  });
};

const BandInfoScreen = ({ onButtonPress, code, info }: BandInfoScreenType) => {
  const { fireStoreDB, authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shows, setShows] = useState<FirestoreShowType[]>([]);
  const [loadingShows, setLoadingShows] = useState(true);
  const router = useRouter();

  // Load shows for this band
  useEffect(() => {
    const loadBandShows = async () => {
      try {
        const bandShows = await getBandShowsService(fireStoreDB, code);
        setShows(bandShows);
      } catch (error) {
        console.error('Error loading band shows:', error);
        errorToast('Error', 'Failed to load shows for this band');
      } finally {
        setLoadingShows(false);
      }
    };

    loadBandShows();
  }, [code, fireStoreDB]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (!authState.user) throw new Error('User is not authenticated');
      const confirmed = await new Promise<boolean>((resolve) => {
        Alert.alert(
          'Delete Band',
          'Are you sure you want to delete this band? This action cannot be undone.',
          [
            { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => resolve(true),
            },
          ],
          { cancelable: false }
        );
      });
      if (!confirmed) {
        setLoading(false);
        return;
      }
      await deleteBandService(fireStoreDB, authState.user, code);
      router.back();
    } catch (error) {
      errorToast('Something went wrong', 'Please wait and try again.');
    } finally {
      setLoading(false);
    }
  };
  const members_list = info.members.map((email) => {
    return (
      <View
        className="flex flex-row justify-between items-center self-stretch"
        key={email}
      >
        <Text className="text-xl">{email}</Text>
        <Pressable
          onPress={() => {
            console.log(`removed ${email}`);
          }}
        >
          <Text>REMOVE</Text>
        </Pressable>
      </View>
    );
  });
  const shows_list = shows.map((show) => {
    return (
      <View
        className="flex flex-row justify-between items-center self-stretch"
        key={show.name}
      >
        <Text className="text-xl">{show.name}</Text>
        <Text className="text-xl">{show.location}</Text>
      </View>
    );
  });
  return (
    <View
      id="main-content"
      className="flex flex-col h-full items-center justify-between px-2 pt-5 pb-32"
    >
      <View className="flex flex-col w-full items-center gap-6">
        <View
          id="band-name"
          className="flex justify-center items-start self-stretch px-2"
        >
          <Text className="text-5xl">{info.name}</Text>
        </View>
        <View
          id="members"
          className="flex flex-col px-2 justify-center items-start gap-2 self-stretch"
        >
          <Text className="font-semibold text-4xl">Members</Text>
          <Text className="text-xl">{info.owner}</Text>
          {members_list}
        </View>
        <View
          id="shows"
          className="flex flex-col px-2 justify-center items-start gap-2 self-stretch"
        >
          <Text className="font-semibold text-4xl">Shows</Text>
          {shows_list}
        </View>
        <CustomButton
          text="Copy Code"
          variant="long"
          onPress={() => {
            Clipboard.setStringAsync(code);
            Alert.alert(code, 'Copied to clipboard');
          }}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Delete Band" color="#ED0000" onPress={handleDelete} />
        )}
      </View>

      <CustomButton
        text="All Bands"
        variant="long"
        onPress={() => onButtonPress('')}
      />
    </View>
  );
};

export default BandInfoScreen;
