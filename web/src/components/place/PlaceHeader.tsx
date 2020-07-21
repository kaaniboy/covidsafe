import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlaceService, { Place } from '../../services/PlaceService';
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  place: Place,
  isPanelExpanded: boolean,
  onToggleExpanded: () => void
};

export default function PlaceHeader({ place, isPanelExpanded, onToggleExpanded }: Props) {
  return (
    <div className='place-header'>
      <div className='text-center'>
        <FontAwesomeIcon
          className='chevron-icon'
          icon={`chevron-${isPanelExpanded ? 'down' : 'up'}` as IconProp}
          color='black'
          size='2x'
          onClick={onToggleExpanded}
        />
      </div>
      <Row>
        <Col xs={10}>
          <h5 className='place-name wrap-text'>{place.name}</h5>
          <p className='place-address wrap-text'>{place.location.address}</p>
        </Col>
        <Col xs={2}>
          <FontAwesomeIcon
            className='place-icon'
            icon={PlaceService.getCategoryIcon(place)}
            color='black'
            size='2x'
          />
        </Col>
      </Row>
    </div>
  );
}