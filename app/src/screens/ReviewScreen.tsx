import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Select, SelectItem, Modal, Card, Text } from '@ui-kitten/components';
import { NavigationProp } from '@react-navigation/core';
import ConfirmationModal from '../components/ConfirmationModal';

type Props = {
  navigation: NavigationProp<any>
};

type State = {
  isConfirmationVisible: boolean
};

export default class ReviewScreen extends React.Component<Props, State> {
  state = {
    isConfirmationVisible: false
  };

  submitReview = () => {
    this.setState({ isConfirmationVisible: true });
  }

  confirm = () => {
    this.setState({ isConfirmationVisible: false });
    this.props.navigation.goBack();
  }

  render() {
    const { isConfirmationVisible } = this.state;

    return (
      <Layout style={styles.layout}>
        <ConfirmationModal
          isVisible={isConfirmationVisible}
          onConfirm={this.confirm}
        />
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
        <Button onPress={this.submitReview}>
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