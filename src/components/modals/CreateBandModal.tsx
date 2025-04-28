import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { createNewBandService } from '../../services/bandService';
import CustomButton from '../buttons/CustomButton';
import { useAuth } from '../../contexts/AuthContext';

const CreateBandModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const { fireStoreDB, authState } = useAuth();
  const [bandName, setBandName] = useState<string>('');
  const [view, setView] = useState<'default' | 'show code'>('default');
  const [viewID, setViewID] = useState<string>('');
  const [clipboardText, setClipboardText] =
    useState<string>('Copy to clipboard');
  // I'm handling loading a little different here than I do in AuthScreen.tsx
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateBand = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!authState.user) {
        throw new Error('User is not authenticated');
      }
      setViewID(
        await createNewBandService(fireStoreDB, authState.user, bandName)
      );
      setView('show code');
    } catch (error: any) {
      console.error('Error creating band:', error.message);
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (view == 'default') {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-3/4 p-10 bg-white rounded-lg shadow-lg items-center">
            <Text className="text-lg font-semibold mb-2 self-start">
              Band Name
            </Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              maxLength={50}
              placeholder="Band name"
              value={bandName}
              onChangeText={setBandName}
            />

            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <CustomButton text="Confirm" onPress={handleCreateBand} />
            )}

            <Button
              title="Cancel"
              onPress={() => {
                setModalVisible(!modalVisible);
                setBandName('');
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }

  if (view == 'show code') {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-3/4 p-10 bg-white rounded-lg shadow-lg items-center">
            <Text className="text-xl font-bold mb-4 text-center text-red-600">
              KEEP THIS CODE SECRET.
            </Text>
            <View className="bg-gray-100 rounded-lg p-3 mb-4">
              <Text className="text-lg font-mono text-center text-black">
                {viewID}
              </Text>
            </View>
            <Text className="text-base mb-4 text-center text-gray-700">
              Your band was created successfully! After closing this modal, tap
              the "Manage Bands" button to view it again. This code allows your
              bandmates to link their Doors account to your band. Do not share
              it with anyone outside of your band.
            </Text>

            <Button
              title={clipboardText}
              onPress={async () => {
                await Clipboard.setStringAsync(viewID);
                // Alert.alert('Code copied to clipboard');
                setClipboardText('Copied');
              }}
            />
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(!modalVisible);
                setBandName('');
                setViewID('');
                setView('default');
                setClipboardText('Copy to clipboard');
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
};

export default CreateBandModal;
