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
import ReviewModal from '../modal/ReviewModal';
import '../../styles/PlacePanel.scss';
import PlaceRatingsOverview from './PlaceRatingsOverview';

const ANIMATION_DURATION = 200;
const EXPANDED_HEIGHT = '70%';
const RETRACTED_HEIGHT = '30%';

type Props = {
  isActive: boolean,
  place: Place,
  onReviewSubmitted: (placeRating: PlaceRating) => void
};

type State = {
  reviews: Review[],
  isExpanded: boolean,
  isLoading: boolean,
  isReviewModalVisible: boolean
};

export default class PlacePanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      reviews: [],
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

      this.setState({
        reviews,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        reviews: [],
        isLoading: false
      });
    }
  }

  onReviewSubmitted = async () => {
    this.setState({ isReviewModalVisible: false });
    await this.retrieveReviews();

    const { place } = this.props;
    try {
      const placeRating = await RatingService.retrievePlaceRating(place);
      this.props.onReviewSubmitted(placeRating);
    } catch (error) {
      console.log(error);
    }
  }

  toggleExpanded = () => {
    this.setState(prev => ({
      isExpanded: !prev.isExpanded
    }))
  };

  render() {
    const { place, isActive } = this.props;
    const { reviews, isLoading, isExpanded, isReviewModalVisible } = this.state;
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
          <Swipeable onSwiped={this.toggleExpanded}>
            <PlaceHeader
              place={place}
              isPanelExpanded={isExpanded}
              onToggleExpanded={this.toggleExpanded}
            />
          </Swipeable>
          {isLoading &&
            <div className='text-center'>
              <Spinner animation="border" variant="primary" />
            </div>
          }
          {!isLoading &&
            <div className='scrolling-panel'>
              <RiskIndicator risk={RatingService.getOverallRisk(place)} />
              <PlaceRatingsOverview place={place} />

              <h5 className='text-center'>Newest Reviews</h5>
              <div className='text-center'>
                <Button
                  className='text-center'
                  variant='outline-primary'
                  size='sm'
                  onClick={() => this.setState({ isReviewModalVisible: true })}
                >
                  Write a Review
              </Button>
              </div>
              <PlaceReviewsList reviews={reviews} />
            </div>
          }
        </AnimateHeight>
      </>
    );
  }
}