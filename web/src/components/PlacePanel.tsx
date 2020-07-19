import React from 'react';
import { Swipeable } from 'react-swipeable';
import AnimateHeight from 'react-animate-height';
import { Place } from '../services/PlaceService';
import '../styles/PlacePanel.scss';

const ANIMATION_DURATION = 200;
const EXPANDED_HEIGHT = '50%';
const RETRACTED_HEIGHT = '20%';

type Props = {
  isActive: boolean,
  place: Place
};

type State = {
  isExpanded: boolean
};

export default class MapPage extends React.Component<Props, State> {
  state = {
    isExpanded: false
  };

  toggleExpanded = () => {
    this.setState(prev => ({
      isExpanded: !prev.isExpanded
    }))
  };

  render() {
    const { isActive } = this.props;
    const { isExpanded} = this.state;
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
        </AnimateHeight>
      </Swipeable>
    );
  }
}