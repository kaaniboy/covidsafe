import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Select, SelectItem } from '@ui-kitten/components';

export default class ReviewScreen extends React.Component<{}, {}> {
  static navigationOptions = {
    title: 'Write a Review'
  };

  render() {
    return (
      <Layout style={styles.layout}>
        <Select
          style={styles.formControl}
          placeholder='Do employees wear masks?'
        >
          <SelectItem title='Yes' />
          <SelectItem title='No' />
          <SelectItem title='Not sure' />
        </Select>
        <Input
          style={styles.formControl}
          textStyle={styles.reviewContent}
          placeholder='Include any other details here!'
          multiline
        />
        <Button>
          Submit Review
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 10
  },
  formControl: {
    marginVertical: 10
  },
  reviewContent: {
    minHeight: 100
  }
});