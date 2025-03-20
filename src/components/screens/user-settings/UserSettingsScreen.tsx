import { useState } from 'react';
import {
  Alert,
  View,
  Pressable,
  Text,
  Button,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

import { useAuth } from '@/src/contexts/AuthContext';

const UserSettingsScreen = () => {
  const { signoutUser } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [bandName, setBandName] = useState('');

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
          console.log('on request close');
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

            {/* Clicking will create code then change modal to Band Code Modal */}
            <Pressable className="text-center bg-blue-500 px-5 py-3">
              <Text
                className="text-xl text-white font-semibold"
                onPress={() => {
                  if (!bandName) {
                    Alert.alert('Band name required');
                  } else {
                    // generate band object with unique band ID (define custom class for Band?)
                    // link band object to user
                  }
                }}
              >
                Confirm
              </Text>
            </Pressable>

            {/* Close modal */}
            <Button
              title="Cancel"
              onPress={() => {
                setBandName('');
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>

      <View className="flex-1 gap-8 justify-start items-center py-10">
        <Pressable
          className="text-center bg-blue-500 px-5 py-3"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-xl text-white font-semibold">Create Band</Text>
        </Pressable>
        <Pressable className="text-center bg-blue-500 px-5 py-3">
          <Text className="text-xl text-white font-semibold">
            Link Existing Band
          </Text>
        </Pressable>
        <Pressable className="text-center bg-blue-500 px-5 py-3">
          <Text className="text-xl text-white font-semibold">Manage Bands</Text>
        </Pressable>
        <Button title="Sign out" onPress={signoutUser} />
      </View>
    </ScrollView>
  );
};

export default UserSettingsScreen;
