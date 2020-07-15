import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

type Props = {
  question: string,
  leftLabel: string,
  rightLabel: string,
  value?: number,
  onChange: (value?: number) => void
};

const OPTIONS = [
  { label: '1', value: 1, color: '#FB896D' },
  { label: '2', value: 2, color: '#F8A81C' },
  { label: '3', value: 3, color: '#FCAD6D' },
  { label: '4', value: 4, color: '#B6DE98' },
  { label: '5', value: 5, color: '#94C975' },
];

export default function RatingQuestion({ question, leftLabel, rightLabel, value, onChange }: Props) {

  const onPress = (newValue?: number) => {
    onChange(newValue === value ? undefined : newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.center} category='s1'>
        {question}
      </Text>
      <View style={styles.optionsContainer}>
        <Text style={styles.sideLabel}>{leftLabel}</Text>

        {OPTIONS.map((option, i) => (
          <Button
            size='small'
            style={[
              styles.option,
              { backgroundColor: option.color },
              value === option.value ? styles.selectedOption : {}
            ]}
            key={option.value}
            onPress={() => onPress(option.value)}
          >
            {option.label}
          </Button>
        ))}

        <Text style={styles.sideLabel}>{rightLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  sideLabel: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 5
  },
  center: {
    textAlign: 'center'
  },
  option: {
    marginHorizontal: 2,
    flex: 1,
    borderColor: 'white',
    borderWidth: 2
  },
  selectedOption: {
    borderColor: '#313136',
    borderWidth: 2
  }
});