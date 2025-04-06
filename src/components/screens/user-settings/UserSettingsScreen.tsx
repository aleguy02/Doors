import { useState } from 'react';
import {
  Alert,
  View,
  Text,
  Button,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

import { useAuth } from '@/src/contexts/AuthContext';
import CustomButton from '@/src/components/buttons/CustomButton';
import CreateBandModal from './CreateBandModal';

const UserSettingsScreen = () => {
  const { signoutUser } = useAuth();
  // modal visibility is passed as a prop to `CreateBandModal` so visibility can be toggled in and out of the component
  const [createModalVisible, setCreateModalVisible] = useState(false);

  return (
    <ScrollView>
      <CreateBandModal
        modalVisible={createModalVisible}
        setModalVisible={setCreateModalVisible}
      />
      <View className="flex-1 gap-8 justify-start items-center py-10">
        <CustomButton
          text="Create Band"
          onPress={() => setCreateModalVisible(true)}
        />
        <CustomButton text="Link Existing Band" onPress={() => {}} />
        <CustomButton text="Manage Bands" onPress={() => {}} />
        <Button title="Sign out" onPress={signoutUser} />
      </View>
    </ScrollView>
  );
};

export default UserSettingsScreen;
