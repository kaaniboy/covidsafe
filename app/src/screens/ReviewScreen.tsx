import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Text } from '@ui-kitten/components';

export default class ReviewScreen extends React.Component<{}, {}> {
  static navigationOptions = {
    title: 'Write a Review'
  };

  render() {
    return (
      <Layout></Layout>
    );
  }
}

const styles = StyleSheet.create({});