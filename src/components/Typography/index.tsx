import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import Colors from '../../utils/colors';

export type TypographyProps = TextProps & {
  level: 'h1' | 'body' | 'subscript' | 'button';
  color?: string;
};

const Typography: React.FC<TypographyProps> = props => {
  return (
    <Text
      {...props}
      style={[styles[props.level], {color: props?.color}, props.style]}>
      {props?.children}
    </Text>
  );
};

Typography.defaultProps = {
  color: Colors.TEXT_LIGHT,
};

export default Typography;

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Lato Regular',
    fontSize: 22,
  },
  body: {
    fontFamily: 'Lato Regular',
    fontSize: 14,
  },
  subscript: {
    fontFamily: 'Lato Medium',
    fontSize: 12,
  },
  button: {
    fontFamily: 'Lato Regular',
    fontSize: 16,
  },
});
