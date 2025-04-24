import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import ManageBandsScreen from '@/src/components/screens/ManageBandsScreen';
import BandInfoScreen from '@/src/components/screens/BandInfoScreen';
import { FirestoreBandType } from '@/src/types/FirestoreBandType';
import { useAuth } from '@/src/contexts/AuthContext';
import { getBandIDs, getBandInfo } from '@/src/services/bandService';

// Display loading animation until all screens have rendered properly? Have to see how to handle Firestore fetching
// maybe *this* can be were I finally implement Redis... (cries internally)
export default function Index() {
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
  }
  return showBandInfo ? (
    <BandInfoScreen
      onButtonPress={toggleBandView}
      code={currBandID}
      info={bandInfo[currBandID]}
    />
  ) : (
    <ManageBandsScreen onButtonPress={toggleBandView} bandsData={bandIDs} />
  );
}
