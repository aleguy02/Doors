import { useEffect, useState } from 'react';
import { ActivityIndicator, View, ScrollView, Text } from 'react-native';

import BandListScreen from './BandListScreen';
import BandInfoScreen from './BandInfoScreen';
import { FirestoreBandType } from '../../types/FirestoreBandType';
import { useAuth } from '../../contexts/AuthContext';
import { getBandIDs, getBandInfo } from '../../services/bandService';

// Display loading animation until all screens have rendered properly? Have to see how to handle Firestore fetching
// maybe *this* can be were I finally implement Redis... (cries internally)
const ManageBandsScreen = () => {
  const { fireStoreDB, authState } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showBandInfo, setShowBandInfo] = useState(false);
  const [currBandID, setCurrBandID] = useState('');
  const toggleBandView = (id: string) => {
    setShowBandInfo(!showBandInfo);
    setCurrBandID(id);
  };

  const [bandIDs, setBandIDs] = useState<Record<string, string>>({});
  const [bandInfo, setBandInfo] = useState<Record<string, FirestoreBandType>>(
    {}
  );
  // on component mount
  useEffect(() => {
    if (!authState.user) {
      throw new Error('User is not authenticated');
    }

    // TODO: refactor this to async func (readability)
    getBandIDs(fireStoreDB, authState.user)
      .then((res) => {
        setBandIDs(res);
        return Object.values(res);
      })
      .then((ids) => {
        getBandInfo(fireStoreDB, ids).then((res) => {
          console.log(res);
          setBandInfo(res);
        });
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  } else if (Object.keys(bandInfo).length === 0) {
    return (
      <ScrollView>
        <View className="flex-1 gap-8 justify-start items-center py-10">
          <Text>
            Looks like you aren't part of any bands. Create or join a band to
            get started.
          </Text>
        </View>
      </ScrollView>
    );
  }
  return showBandInfo ? (
    <BandInfoScreen
      onButtonPress={toggleBandView}
      code={currBandID}
      info={bandInfo[currBandID]}
    />
  ) : (
    <BandListScreen onButtonPress={toggleBandView} bandsData={bandIDs} />
  );
};

export default ManageBandsScreen;
