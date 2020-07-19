import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  value: string,
  onChange: (search: string) => void,
  onClear: () => void
}

export default function Search({ value, onChange, onClear }: Props) {
  return (
    <InputGroup className='search'>
      <Form.Control
        className='search-input'
        value={value}
        size='lg'
        placeholder='Search nearby places...'
        onChange={event => onChange(event.target.value)}
      />
      {value !== '' &&
        <InputGroup.Append>
          <InputGroup.Text>
            <FontAwesomeIcon
              icon='times'
              color='black'
              onClick={onClear}
            />
          </InputGroup.Text>
        </InputGroup.Append>
      }
    </InputGroup>
  );
}