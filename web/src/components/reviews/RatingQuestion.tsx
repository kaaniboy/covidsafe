import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

type Props = {
  question: string,
  leftLabel: string,
  rightLabel: string,
  value?: number,
  onChange: (value?: number) => void
};

const OPTIONS = [
  { label: '1', value: 1, primaryColor: '#FA533D', secondaryColor: '#FDBAB1' },
  { label: '2', value: 2, primaryColor: '#FB873E', secondaryColor: '#FDCFB2' },
  { label: '3', value: 3, primaryColor: '#FAB53F', secondaryColor: '#FDE2B2' },
  { label: '4', value: 4, primaryColor: '#B6C64C', secondaryColor: '#E2E9B9' },
  { label: '5', value: 5, primaryColor: '#94C975', secondaryColor: '#D5E9C8' },
];

export default function RatingQuestion({ question, leftLabel, rightLabel, value, onChange }: Props) {
  const onClick = (newValue?: number) => {
    onChange(newValue === value ? undefined : newValue);
  };

  return (
    <div className='rating-question'>
      <h6 className='question-label'> {question}</h6>
      <div className='buttons-container'>
        <div className='buttons'>
          <p className='side-label'>
            {leftLabel}
          </p>
          <ButtonGroup>
            {OPTIONS.map(option => (
              <Button
                variant={value === option.value ? 'primary' : 'outline-primary'}
                onClick={() => onClick(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
          <p className='side-label'>
            {rightLabel}
          </p>
        </div>
      </div>
    </div>
  );
}