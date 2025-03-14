import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
        <Link href="/product/CompleteBloodCount"   style={styles.link}> </Link>
        <Link href="/product/LipidPanel"   style={styles.link}></Link>
        <Link href="/product/Urinalysis"   style={styles.link}></Link>
        <Link href="/product/TFT"   style={styles.link}></Link>
        <Link href="/product/INR"   style={styles.link}></Link>
        <Link href="/product/BMP"   style={styles.link}></Link>
        <Link href="/product/KFT"   style={styles.link}></Link>
        <Link href="/product/LFT"   style={styles.link}></Link>


          <ThemedText type="link">Go to CompleteBloodCount screen!</ThemedText>
       
        <Stack.Screen />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
