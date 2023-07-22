import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Images from '../../assets';

type ButtonBackProps = {
  onPress?: () => void;
};

const HIT_SLOP = {top: 24, right: 24, left: 24, bottom: 24};

const ButtonBack: React.FC<ButtonBackProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress} hitSlop={HIT_SLOP}>
      <Image source={Images.Icon.Arrow} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default ButtonBack;

const styles = StyleSheet.create({
  icon: {
    height: 14,
    width: 7,
  },
});
