import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Modal, Card, Text } from '@ui-kitten/components';

type Props = {
  isVisible: boolean,
  onConfirm: () => void
};

const FADE_DURATION = 250;

export default class ConfirmationModal extends React.Component<Props, {}> {
  opacity = new Animated.Value(0.0);

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.isVisible && this.props.isVisible) {
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true
      }).start();
    }
  }

  render() {
    const { isVisible, onConfirm } = this.props;

    return (
      <Modal
        backdropStyle={styles.modalBackdrop}
        visible={isVisible}
      >
        <Animated.View style={{ opacity: this.opacity }}>
          <Card style={styles.card} disabled>
            <View style={styles.message}>
              <Text category='s1'>Your review has been submitted.</Text>
              <Text category='s1'>Thank you!</Text>
            </View>
            <Button
              style={styles.confirmButton}
              status='basic'
              onPress={onConfirm}
            >
              Continue
        </Button>
          </Card>
        </Animated.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10
  },
  message: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButton: {
    marginTop: 20
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});