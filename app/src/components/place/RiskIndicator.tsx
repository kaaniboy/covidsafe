import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Risk, RISK_COLORS, RISK_LABELS } from '../../services/RatingService';

import { Text, useTheme } from '@ui-kitten/components';

type Props = {
  risk: Risk
};

export default function RiskIndicator({ risk }: Props) {
  if (risk === 'unknown') {
    return null;
  }

  const theme = useTheme();
  const backgroundColor = theme[`color-${RISK_COLORS[risk]}-default`];
  const riskText = RISK_LABELS[risk].toUpperCase() + ' RISK';

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
    paddingVertical: 5,
    marginTop: 5
  },
  text: {
    textAlign: 'center'
  }
});