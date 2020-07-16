import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import * as FacebookAds from 'expo-ads-facebook';

const PLACEMENT_ID = Platform.select({
  ios: '923367898132562_923381704797848',
  android: '923367898132562_923410934794925',
  default: '923367898132562_923410934794925'
});

export default function FacebookAd() {
  return (
    <View style={styles.container}>
      <FacebookAds.BannerAd
        placementId={PLACEMENT_ID}
        type="standard"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  }
})