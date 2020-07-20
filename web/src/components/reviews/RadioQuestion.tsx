import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  question: string,
  options: { label: string, value?: string | number }[],
  value?: string | number,
  onChange: (value?: string | number) => void
};

export default function RadioQuestion({ question, options, value, onChange }: Props) {
  return (
    <div className='rating-question'>
      <Form.Group>
        <Form.Label as="legend">
          <h6>{question}</h6>
        </Form.Label>
        {options.map(option => (
          <Form.Check
            type="radio"
            label={option.label}
            key={option.label}
            onChange={() => onChange(option.value)}
            checked={value === option.value}
          />
        ))}
      </Form.Group>
    </div>
  );
}