import React from 'react';
import { Spinner, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  value: string,
  isLoading: boolean,
  onChange: (search: string) => void,
  onEnter: (search: string) => void,
  onClear: () => void
}

export default function Search({ value, isLoading, onChange, onEnter, onClear }: Props) {
  return (
    <div className='search'>
      <InputGroup>
        <Form.Control

          className='search-input'
          value={value}
          size='lg'
          placeholder='Search nearby places...'
          onChange={event => onChange(event.target.value)}
          onKeyPress={(event: any) => {
            if (event.key === 'Enter') {
              onEnter(value);
            }
          }}
        />
      </InputGroup>
      {isLoading &&
        <Spinner
          className='loading'
          animation='grow'
          variant='primary'
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      {!isLoading && value !== '' &&
        <div className='search-icon'>
          <FontAwesomeIcon
            icon='times'
            color='black'
            size='lg'
            onClick={onClear}
          />
        </div>
      }
    </div>
  );
}