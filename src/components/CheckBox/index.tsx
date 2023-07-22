import React from 'react';
import Images from '../../assets';
import {Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

type CheckBoxProps = {
  onToggle: (nextValue: boolean) => void;
  value?: boolean;
  containerStyle?: ViewStyle;
};

const CheckBox: React.FC<CheckBoxProps> = props => {
  const onPress = () => {
    const nextValue = !props?.value;
    props?.onToggle?.(nextValue);
  };

  return (
    <TouchableOpacity onPress={onPress} style={props.containerStyle}>
      <Image
        style={styles.checkbox}
        source={
          props?.value ? Images.Icon.CheckedBox : Images.Icon.UncheckedBox
        }
      />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkbox: {
    height: 24,
    width: 24,
  },
});
