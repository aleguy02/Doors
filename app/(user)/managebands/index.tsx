import { useState } from 'react';

import ManageBandsScreen from '@/src/components/screens/ManageBandsScreen';
import BandInfoScreen from '@/src/components/screens/BandInfoScreen';

const dummy_data: Record<string, string> = {
  'The Gnomies': 'band123',
  'Idle Hands': 'another123',
};

// Display loading animation until all screens have rendered properly? Have to see how to handle Firestore fetching
// maybe *this* can be were I finally implement Redis... (cries internally)
export default function Index() {
  const [showBandInfo, setShowBandInfo] = useState(false);
  const [currBandName, setCurrBandName] = useState('The Gnomies');
  const toggleBandView = (bandName: string) => {
    setShowBandInfo(!showBandInfo);
    setCurrBandName(bandName);
    console.log(bandName);
  };

  return showBandInfo ? (
    <BandInfoScreen
      onButtonPress={toggleBandView}
      name={currBandName}
      id={dummy_data[currBandName]}
    />
  ) : (
    <ManageBandsScreen onButtonPress={toggleBandView} bandsData={dummy_data} />
  );
}
