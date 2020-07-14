import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Modal, Card, Text } from '@ui-kitten/components';

type Props = {
  message: string,
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
    const { message, isVisible, onConfirm } = this.props;

    return (
      <Modal
        backdropStyle={styles.modalBackdrop}
        visible={isVisible}
      >
        <Animated.View style={{ opacity: this.opacity }}>
          <Card style={styles.card} disabled>
            <View style={styles.message}>
              {message.split('\\n').map((line, i) => (
                <Text category='s1' key={i}>
                  {line.replace('\\n', '')}
                </Text>
              ))}
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