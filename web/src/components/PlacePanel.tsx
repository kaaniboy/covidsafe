import React from 'react';
import { Swipeable } from 'react-swipeable';
import AnimateHeight from 'react-animate-height';
import { Place } from '../services/PlaceService';
import ReviewService, { Review } from '../services/ReviewService';
import RatingService, { PlaceRating } from '../services/RatingService';
import PlaceHeader from '../components/place/PlaceHeader';
import RiskIndicator from './place/RiskIndicator';
import '../styles/PlacePanel.scss';

const ANIMATION_DURATION = 200;
const EXPANDED_HEIGHT = '50%';
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
};

export default class MapPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      reviews: [],
      rating: DEFAULT_RATING,
      isLoading: false,
      isExpanded: false
    };
  }

  async componentDidMount() {
    await this.retrieveReviews();
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

  toggleExpanded = () => {
    this.setState(prev => ({
      isExpanded: !prev.isExpanded
    }))
  };

  render() {
    const { place, isActive } = this.props;
    const { rating, isExpanded } = this.state;
    const height = isActive
      ? (isExpanded ? EXPANDED_HEIGHT: RETRACTED_HEIGHT)
      : '0px';

    return (
      <Swipeable onSwiped={this.toggleExpanded} trackMouse>
        <AnimateHeight
          duration={ANIMATION_DURATION}
          height={height}
          className='place-panel'
        >
        <PlaceHeader place={place} />
        <RiskIndicator risk={rating.overallRisk} />
        </AnimateHeight>
      </Swipeable>
    );
  }
}