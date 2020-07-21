import React from 'react';
import { Risk, RISK_COLORS, RISK_LABELS } from '../../services/RatingService';

type Props = {
  risk: Risk
};

export default function RiskIndicator({ risk }: Props) {
  if (risk === 'unknown') {
    return null;
  }

  const riskText = RISK_LABELS[risk].toUpperCase() + ' RISK';

  return (
    <div className={`risk-indicator bg-${RISK_COLORS[risk]}`}>
      <p className='risk-text'>{riskText}</p>
    </div>
  );
}