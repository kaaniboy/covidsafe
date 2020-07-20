import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

type Props = {
  question: string,
  options: { label: string, value?: string | number }[],
  value?: string | number,
  onChange: (value?: string | number) => void
};

export default function RadioQuestion({ question, options, value, onChange }: Props) {
  return (
    <div className='radio-question'>
      <h6 className='question-label'>{question}</h6>
      <Row>
        <Col
          xs={{ span: 9, offset: 3 }}
          md={{ span: 8, offset: 4 }}
        >
          {options.map(option => (
            <Form.Check
              type="radio"
              label={option.label}
              key={option.label}
              onChange={() => onChange(option.value)}
              checked={value === option.value}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
}