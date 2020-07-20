import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlaceService, { Place } from '../../services/PlaceService';
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col } from 'react-bootstrap';

type Props = {
  place: Place
};

export default function PlaceHeader({ place }: Props) {
  return (
    <Row className='place-header'>
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
  );
}