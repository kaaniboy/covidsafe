import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

type Props = {
  label: string,
  value?: number,
  onChange: (value: number) => void
};

const OPTIONS = [
  { label: '1', value: 1, color: 'danger' },
  { label: '2', value: 2, color: 'warning' },
  { label: '3', value: 3, color: 'info' },
  { label: '4', value: 4, color: 'primary' },
  { label: '5', value: 5, color: 'success' },
];

export default function RatingSelect({ label, value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text
        style={styles.label}
      >
        {label}
      </Text>
      <View style={styles.optionsContainer}>
        {OPTIONS.map(option => (
          <Button
            style={styles.option}
            status={option.color}
            appearance={value === option.value ? 'filled' : 'outline'}
            key={option.value}
            onPress={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  option: {
    marginHorizontal: 2,
    flex: 1
  },
  label: {
    textAlign: 'center'
  }
});