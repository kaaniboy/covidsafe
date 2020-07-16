import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as FacebookAds from 'expo-ads-facebook';

const PLACEMENT_ID = '923367898132562_923381704797848';

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