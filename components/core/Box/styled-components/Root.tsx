import { View } from 'react-native';
import { styled } from '../../styled';
import { Motion } from '@legendapp/motion';

export default styled(
  Motion.View,
  {},
  {
    descendantStyle: ['_text'],
  }
);
