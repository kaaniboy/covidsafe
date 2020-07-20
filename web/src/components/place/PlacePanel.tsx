import React from 'react';
import { Swipeable } from 'react-swipeable';
import { Button, Spinner } from 'react-bootstrap';
import AnimateHeight from 'react-animate-height';
import { Place } from '../../services/PlaceService';
import ReviewService, { Review } from '../../services/ReviewService';
import RatingService, { PlaceRating } from '../../services/RatingService';
import PlaceHeader from './PlaceHeader';
import RiskIndicator from './RiskIndicator';
import PlaceReviewsList from './PlaceReviewsList';
import ReviewModal from '../reviews/ReviewModal';
import '../../styles/PlacePanel.scss';
import PlaceRatingsOverview from './PlaceRatingsOverview';

const ANIMATION_DURATION = 200;
const EXPANDED_HEIGHT = '70%';
const RETRACTED_HEIGHT = '20%';

const DEFAULT_RATING: PlaceRating = {
  categories: {},
  overallRisk: 'unknown'
};

type Props = {
  isActive: boolean,
  place: Place
};

type State = {
  reviews: Review[],
  rating: PlaceRating,
  isExpanded: boolean,
  isLoading: boolean,
  isReviewModalVisible: boolean
};

export default class PlacePanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      reviews: [],
      rating: DEFAULT_RATING,
      isLoading: false,
      isExpanded: false,
      isReviewModalVisible: false
    };
  }

  async componentDidMount() {
    await this.retrieveReviews();
  }

  async componentDidUpdate(prevProps: Props) {
    if (!prevProps.isActive && this.props.isActive) {
      this.setState({ isExpanded: false });
    }

    if (prevProps.place.id !== this.props.place.id) {
      await this.retrieveReviews();
    }
  }

  async retrieveReviews() {
    const { place } = this.props;
    this.setState({ isLoading: true });

    try {
      const reviews = await ReviewService.getPlaceReviews(place.id);
      const rating = RatingService.ratePlace(reviews);

      this.setState({
        reviews,
        rating,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        reviews: [],
        rating: DEFAULT_RATING,
        isLoading: false
      });
    }
  }

  onReviewSubmitted = async () => {
    this.setState({ isReviewModalVisible: false });
    await this.retrieveReviews();
  }

  toggleExpanded = () => {
    this.setState(prev => ({
      isExpanded: !prev.isExpanded
    }))
  };

  render() {
    const { place, isActive } = this.props;
    const { rating, reviews, isLoading, isExpanded, isReviewModalVisible } = this.state;
    const height = isActive
      ? (isExpanded ? EXPANDED_HEIGHT : RETRACTED_HEIGHT)
      : '0%';

    return (
      <>
        <ReviewModal
          place={place}
          isVisible={isReviewModalVisible}
          onClose={() => this.setState({ isReviewModalVisible: false })}
          onSubmit={this.onReviewSubmitted}
        />

        <AnimateHeight
          duration={ANIMATION_DURATION}
          height={height}
          className='place-panel'
        >
          <Swipeable onSwiped={this.toggleExpanded} trackMouse>
            <PlaceHeader place={place} />
          </Swipeable>
          {isLoading &&
            <div className='text-center'>
              <Spinner animation="border" variant="primary" />
            </div>
          }
          {!isLoading &&
            <div className='scrolling-panel'>
              <RiskIndicator risk={rating.overallRisk} />
              <PlaceRatingsOverview place={place} rating={rating} />

              <h5 className='text-center'>Newest Reviews</h5>
              <div className='text-center'>
                <Button
                  className='text-center'
                  variant='outline-primary'
                  size='sm'
                  onClick={() => this.setState({ isReviewModalVisible: true })}
                >
                  Write a Review
              </Button>Î
              </div>
              <PlaceReviewsList reviews={reviews} />
            </div>
          }
        </AnimateHeight>
      </>
    );
  }
}