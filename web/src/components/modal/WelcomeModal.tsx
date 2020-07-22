import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/Modal.scss';

type State = {
  dontShowAgain: boolean
};

type Props = {
  isVisible: boolean,
  onClose: (dontShowAgain: boolean) => void
};

export default class ReviewModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dontShowAgain: false
    };
  }

  render() {
    const { isVisible, onClose } = this.props;
    const { dontShowAgain } = this.state;

    if (!isVisible) {
      return null;
    }

    return (
      <>
        <div className='backdrop'></div>
        <Modal.Dialog className='welcome-modal' scrollable>
          <Modal.Header closeButton onHide={() => onClose(dontShowAgain)}>
            <Modal.Title>Welcome</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              <b>Mask Traffic</b> helps you stay safe by locating restaurants, coffee shops,
              and grocery stores that take proper safety precautions.
            </p>
            <p>
              You can use the platform to view reviews of restaurants and stores based on various categories,
              such as whether or not employees wear masks. You can also submit your own reviews
              to help keep your local community safe.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              type='checkbox' label="Don't show this again"
              checked={dontShowAgain}
              onChange={(event: any) => this.setState({ dontShowAgain: event.target.checked })}
            />
            <Button onClick={() => onClose(dontShowAgain)}>
              I'm ready!
          </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </>
    );
  }
}