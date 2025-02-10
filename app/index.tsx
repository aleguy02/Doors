import { Text, View, Button } from 'react-native';
import HomeScreen from '@/src/components/HomeScreen';

export default function Index() {
  return <HomeScreen has_scheduled_shows={false} />;
}
