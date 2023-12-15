import Icon from '../fundamentals/Icon';
import { TLeeway } from '../types/TLeeway';

const LeewayIndicator: React.FC<{ level?: TLeeway }> = ({ level }) => {
  switch (level) {
    case 'medium':
      return (
        <div className='flex flex-row items-start'>
          <Icon name='nutrition' type='filled' className='text-orange-l-1' />
          <div className='flex flex-row items-start'>
            <Icon name='nutrition' type='filled' className='text-orange-l-5' />
            <Icon name='nutrition' type='filled' className='text-orange-l-5' />
          </div>
        </div>
      );
    case 'low':
      return (
        <div className='flex flex-row items-start'>
          <div className='flex flex-row items-start'>
            <Icon name='nutrition' type='filled' className='text-orange-l-1' />
            <Icon name='nutrition' type='filled' className='text-orange-l-1' />
          </div>
          <Icon name='nutrition' type='filled' className='text-orange-l-5' />
        </div>
      );
    case 'none':
      return (
        <div className='flex flex-row items-start'>
          <Icon name='nutrition' type='filled' className='text-orange-l-1' />
          <Icon name='nutrition' type='filled' className='text-orange-l-1' />
          <Icon name='nutrition' type='filled' className='text-orange-l-1' />
        </div>
      );
    case 'high':
    default:
      return (
        <div className='flex flex-row items-start'>
          <Icon name='nutrition' type='filled' className='text-leaf-l-3' />
          <Icon name='nutrition' type='filled' className='text-leaf-l-3' />
          <Icon name='nutrition' type='filled' className='text-leaf-l-3' />F
        </div>
      );
  }
};

export default LeewayIndicator;
