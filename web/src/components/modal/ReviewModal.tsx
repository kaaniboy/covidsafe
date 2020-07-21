import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReviewService, { Review } from '../../services/ReviewService';
import { Place } from '../../services/PlaceService';
import '../../styles/Modal.scss';
import FoodReviewForm from '../reviews/FoodReviewForm';
import RetailReviewForm from '../reviews/RetailReviewForm';

type Props = {
  place: Place,
  isVisible: boolean,
  onClose: () => void,
  onSubmit: () => void
};

type State = {
  review: Review,
  isSubmitDisabled: boolean
};

export default class ReviewModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { place } = this.props;
    const userId = this.getUserId();

    this.state = {
      review: { userId, placeId: place.id } as Review,
      isSubmitDisabled: false,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.isVisible && this.props.isVisible) {
      const userId = this.getUserId();
      this.setState({
        review: { userId, placeId: this.props.place.id } as Review,
        isSubmitDisabled: false
      });
    }
  }

  submitReview = async () => {
    const { onSubmit } = this.props;
    const { review } = this.state;
    this.setState({ isSubmitDisabled: true });

    try {
      await ReviewService.createReview(review);
    } catch (error) {
      console.log(error);
    }

    onSubmit();
  }

  getUserId = () => {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem(
        'userId',
        Math.random().toString(36).substring(2, 15)
        + Math.random().toString(36).substring(2, 15)
      );
    }
    return localStorage.getItem('userId');
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
        <Modal.Dialog className='review-modal' scrollable>
          <Modal.Header closeButton onHide={onClose}>
            <Modal.Title>Write a Review</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className='text-center'>
              Answer the following questions about <b>{place.name}</b>
              . You may leave questions unanswered.
            </p>
            <hr />

            {place.category === 'Food' ?
              (
                <FoodReviewForm
                  review={review}
                  onFieldChange={this.updateReview}
                />
              ) : (
                <RetailReviewForm
                  review={review}
                  onFieldChange={this.updateReview}
                />
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