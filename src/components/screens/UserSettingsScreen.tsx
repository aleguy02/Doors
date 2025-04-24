import { useState } from 'react';
import { View, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '../../contexts/AuthContext';
import CustomButton from '../buttons/CustomButton';
import CreateBandModal from '../modals/CreateBandModal';
import LinkBandModal from '../modals/LinkBandModal';

const UserSettingsScreen = () => {
  const router = useRouter();
  const { signoutUser } = useAuth();
  // modal visibility is passed as a prop to `CreateBandModal` so visibility can be toggled in and out of the component
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);

  const routeToManageBandsScreen = () => {
    router.push('/(user)/managebands');
  };

  return (
    <ScrollView>
      {/* Modals are initially invisible */}
      <CreateBandModal
        modalVisible={createModalVisible}
        setModalVisible={setCreateModalVisible}
      />
      <LinkBandModal
        modalVisible={linkModalVisible}
        setModalVisible={setLinkModalVisible}
      />

      <View className="flex-1 gap-8 justify-start items-center py-10">
        <CustomButton
          text="Create Band"
          onPress={() => setCreateModalVisible(true)}
        />
        <CustomButton text="Manage Bands" onPress={routeToManageBandsScreen} />
        <CustomButton
          text="Link Existing Band"
          onPress={() => setLinkModalVisible(true)}
        />
        <Button title="Sign out" onPress={signoutUser} />
      </View>
    </ScrollView>
  );
};

export default UserSettingsScreen;
