import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RiskLevel } from '../../services/RatingService';

import { Text, useTheme } from '@ui-kitten/components';

type Props = {
  risk: RiskLevel
};

const COLORS: { [key in RiskLevel]: string } = {
  'unknown': 'primary',
  'low': 'success',
  'medium': 'warning',
  'high': 'danger'
}

export default function RiskIndicator({ risk }: Props) {
  const theme = useTheme();
  const backgroundColor = theme[`color-${COLORS[risk]}-default`];

  const riskText = risk.toUpperCase() + ' RISK';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text} category='s1' appearance='alternative'>
        {riskText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5
  },
  text: {
    textAlign: 'center'
  }
});