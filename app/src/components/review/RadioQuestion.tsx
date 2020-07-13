import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Radio, RadioGroup } from '@ui-kitten/components';

type Props = {
  question: string,
  options: { label: string, value?: string | number }[],
  value?: string | number,
  onChange: (value?: string | number) => void
};

export default function RatingQuestion({ question, options, value, onChange }: Props) {

  let selectedIndex = options.findIndex(option => option.value === value);

  return (
    <View style={styles.container}>
      <Text style={styles.header} category='s1'>
        {question}
      </Text>
      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={index => onChange(options[index].value)}
      >
        {options.map(option => (
          <Radio key={option.label}>{option.label}</Radio>
        ))}
      </RadioGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20
  },
  header: {
    marginBottom: 10,
    textAlign: 'center'
  }
});