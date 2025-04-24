import { useState } from 'react';

import ManageBandsScreen from '@/src/components/screens/ManageBandsScreen';
import BandInfoScreen from '@/src/components/screens/BandInfoScreen';
import { FirestoreBandType } from '@/src/types/FirestoreBandType';

const dummy_user_bands_data: Record<string, string> = {
  'The Gnomies': 'band123',
  'Idle Hands': 'another123',
};

const dummy_band_member_data: Record<string, FirestoreBandType> = {
  band123: {
    owner: 'darthaleguy@gmail.com',
    members: ['fake@gmail.com'],
    name: 'The Gnomies',
  },
  another123: {
    owner: 'darthaleguy@gmail.com',
    members: [],
    name: 'Idle Hands',
  },
};

// Display loading animation until all screens have rendered properly? Have to see how to handle Firestore fetching
// maybe *this* can be were I finally implement Redis... (cries internally)
export default function Index() {
  const [showBandInfo, setShowBandInfo] = useState(false);
  const [currBandID, setCurrBandID] = useState('');
  const toggleBandView = (id: string) => {
    setShowBandInfo(!showBandInfo);
    setCurrBandID(id);
  };

  return showBandInfo ? (
    <BandInfoScreen
      onButtonPress={toggleBandView}
      code={currBandID}
      info={dummy_band_member_data[currBandID]}
    />
  ) : (
    <ManageBandsScreen
      onButtonPress={toggleBandView}
      bandsData={dummy_user_bands_data}
    />
  );
}
