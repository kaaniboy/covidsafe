import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReviewService, { Review } from '../../services/ReviewService';
import { Place } from '../../services/PlaceService';
import '../../styles/ReviewModal.scss';
import FoodReviewForm from './FoodReviewForm';

type Props = {
  place: Place,
  isVisible: boolean,
  onClose: () => void
};

type State = {
  review: Review,
  isSubmitDisabled: boolean
};

export default class ReviewModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { place } = this.props;

    this.state = {
      review: { placeId: place.id } as Review,
      isSubmitDisabled: false,
    };
  }

  submitReview = async () => {
    const { review } = this.state;
    this.setState({ isSubmitDisabled: true });

    try {
      await ReviewService.createReview(review);
    } catch (error) {
      console.log(error);
    }
  }

  updateReview = (field: string, value: any) => {
    const { review } = this.state;
    (review as any)[field] = value;
    this.setState({ review });
  }

  render() {
    const { place, isVisible, onClose } = this.props;
    const { review, isSubmitDisabled } = this.state;

    if (!isVisible) {
      return null;
    }

    return (
      <>
        <div className='backdrop'></div>
        <Modal.Dialog className='review-modal'>
          <Modal.Header closeButton onHide={onClose}>
            <Modal.Title>Write a Review</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Answer the following questions about <b>{place.name}</b>
              . You may leave questions unanswered.
          </p>

            {place.category === 'Food' ?
              (
                <FoodReviewForm
                  review={review}
                  onFieldChange={this.updateReview}
                />
              ) : (
                <p>RETAIL</p>
              )
            }

          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.submitReview}
              disabled={isSubmitDisabled}
            >
              Submit Review
          </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </>
    );
  }
}