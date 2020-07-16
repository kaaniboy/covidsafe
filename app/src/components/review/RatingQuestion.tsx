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
  { label: '1', value: 1, primaryColor: '#FA533D', secondaryColor: '#FDBAB1' },
  { label: '2', value: 2, primaryColor: '#FB873E', secondaryColor: '#FDCFB2' },
  { label: '3', value: 3, primaryColor: '#FAB53F', secondaryColor: '#FDE2B2' },
  { label: '4', value: 4, primaryColor: '#B6C64C', secondaryColor: '#E2E9B9' },
  { label: '5', value: 5, primaryColor: '#94C975', secondaryColor: '#D5E9C8' },
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
              { borderColor: option.primaryColor },
              value === option.value
                ? { backgroundColor: option.primaryColor }
                : { backgroundColor: option.secondaryColor }
            ]}
            key={option.value}
            onPress={() => onPress(option.value)}
          >
            {textProps => (
              <Text category='s2'
                style={
                  value === option.value
                    ? { color: option.secondaryColor }
                    : { color: option.primaryColor }
                }
              >
                {option.label}
              </Text>
            )}
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
    borderWidth: 1.5
  }
});