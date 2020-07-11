import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Card, Text } from '@ui-kitten/components';

type Props = {
  isVisible: boolean,
  onConfirm: () => void
};

export default function ConfirmationModal({ isVisible, onConfirm }: Props) {
  return (
    <Modal
      backdropStyle={styles.modalBackdrop}
      visible={isVisible}
    >
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
    </Modal>
  );
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