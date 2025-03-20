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
import CustomButton from '@/src/components/buttons/CustomButton';

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

            <CustomButton
              text="Confirm"
              onPress={() => {
                if (!bandName) {
                  Alert.alert('Band name required');
                } else {
                  // generate band object with unique band ID (define custom class for Band?)
                  // link band object to user
                }
              }}
            />

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
        <CustomButton
          text="Create Band"
          onPress={() => setModalVisible(true)}
        />
        <CustomButton text="Link Existing Band" onPress={() => {}} />
        <CustomButton text="Manage Bands" onPress={() => {}} />
        <Button title="Sign out" onPress={signoutUser} />
      </View>
    </ScrollView>
  );
};

export default UserSettingsScreen;
