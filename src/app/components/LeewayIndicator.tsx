import { TLeeway } from '../types/TLeeway';

const LeewayIndicator: React.FC<{ level?: TLeeway }> = ({ level }) => {
  switch (level) {
    case 'medium':
      return (
        <div className="flex flex-row items-start">
          <span className="icon-filled text-orange-l-1">nutrition</span>
          <div className="flex flex-row items-start">
            <span className="icon-filled text-orange-l-5">nutrition</span>
            <span className="icon-filled text-orange-l-5">nutrition</span>
          </div>
        </div>
      );
    case 'low':
      return (
        <div className="flex flex-row items-start">
          <div className="flex flex-row items-start">
            <span className="icon-filled text-orange-l-1">nutrition</span>
            <span className="icon-filled text-orange-l-1">nutrition</span>
          </div>
          <span className="icon-filled text-orange-l-5">nutrition</span>
        </div>
      );
    case 'none':
      return (
        <div className="flex flex-row items-start">
          <span className="icon-filled text-orange-l-1">nutrition</span>
          <span className="icon-filled text-orange-l-1">nutrition</span>
          <span className="icon-filled text-orange-l-1">nutrition</span>
        </div>
      );
    case 'high':
    default:
      return (
        <div className="flex flex-row items-start">
          <span className="icon-filled text-leaf-l-3">nutrition</span>
          <span className="icon-filled text-leaf-l-3">nutrition</span>
          <span className="icon-filled text-leaf-l-3">nutrition</span>
        </div>
      );
  }
};

export default LeewayIndicator;
