import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { RouteProp, NavigationProp, Route } from '@react-navigation/core';
import ConfirmationModal from '../components/ConfirmationModal';
import { Review } from '../services/ReviewService';
import Constants from 'expo-constants';
import { StackParamList } from '../../App';


type Props = {
  navigation: NavigationProp<StackParamList>,
  route: RouteProp<StackParamList, 'Review'>
};

type State = {
  isConfirmationVisible: boolean,
  review: Review
};

const SelectOptions = (
  <>
    <SelectItem title='Yes' />
    <SelectItem title='No' />
    <SelectItem title='Not sure' />
  </>
);

const SELECT_VALUES = [10, 20, 30];

export default class ReviewScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const placeId = this.props.route.params.place.id as string;
    const userId = Constants.deviceId || 'DEVICE_ID_MISSING';

    this.state = {
      isConfirmationVisible: false,
      review: { placeId, userId } as Review
    };
  }

  submitReview = () => {
    this.setState({ isConfirmationVisible: true });
  }

  confirm = () => {
    this.setState({ isConfirmationVisible: false });
    this.props.navigation.goBack();
  }

  onSelectChange = (field: string, index: IndexPath | IndexPath[]) => {
    const value = SELECT_VALUES[(index as IndexPath).row];
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
          onSelect={index => this.onSelectChange('masks', index)}
        >
          {SelectOptions}
        </Select>
        <Select
          style={styles.formControl}
          placeholder='Are social distancing measures in place?'
        >
          {SelectOptions}
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