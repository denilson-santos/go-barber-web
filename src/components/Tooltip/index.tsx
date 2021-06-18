import React from 'react';

import * as Style from './style';

type TooltipProps = {
  title: string;
  className?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ title, children, className }) => (
  <Style.Tooltip className={className}>
    {children}
    <span>{title}</span>
  </Style.Tooltip>
);

export default Tooltip;
