import React from 'react';
import { Risk, RISK_COLORS } from '../../services/RatingService';

type Props = {
  risk: Risk
};

export default function RiskIndicator({ risk }: Props) {
  if (risk === 'unknown') {
    return null;
  }

  const riskText = risk.toUpperCase() + ' RISK';

  return (
    <div className={`risk-indicator bg-${RISK_COLORS[risk]}`}>
      <p className='risk-text'>{riskText}</p>
    </div>
  );
}