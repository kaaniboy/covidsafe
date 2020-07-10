import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';

type Props = {
  risk: 'low' | 'medium' | 'high'
};

const COLORS = {
  'low': 'success',
  'medium': 'warning',
  'high': 'danger'
};

export default function RiskIndicator({ risk }: Props) {
  const theme = useTheme();
  const backgroundColor = theme[`color-${COLORS[risk]}-default`];
  
  const riskText = risk.toUpperCase() + ' RISK';
  
  return (
    <View style={[styles.view, { backgroundColor }]}>
      <Text style={styles.text} category='s1' appearance='alternative'>{riskText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingVertical: 5
  },
  text: {
    textAlign: 'center'
  }
});