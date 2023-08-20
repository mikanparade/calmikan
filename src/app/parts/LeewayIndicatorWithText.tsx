import { TLeeway } from '../types/TLeeway';

import LeewayIndicator from './LeewayIndicator';

const LeewayIndicatorWithText: React.FC<{ level?: TLeeway }> = ({ level }) => {
  switch (level) {
    case 'medium':
      return (
        <div className="flex flex-row items-start">
          <span className="text-orange-l-5">まあまあ</span>
          <LeewayIndicator level={level} />
        </div>
      );

    case 'low':
      return (
        <div className="flex flex-row items-start">
          <span className="text-orange-l-5">忙しい</span>
          <LeewayIndicator level={level} />
        </div>
      );

    case 'none':
      return (
        <div className="flex flex-row items-start">
          <span className="text-orange-l-6">厳しい</span>
          <LeewayIndicator level={level} />
        </div>
      );

    case 'high':
    default:
      return (
        <div className="flex flex-row items-start">
          <span className="text-leaf-l-6">余裕</span>
          <LeewayIndicator level={level} />
        </div>
      );
  }
};

export default LeewayIndicatorWithText;
