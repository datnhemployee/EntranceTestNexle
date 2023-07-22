import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography from '../../../components/Typography';
import Colors from '../../../utils/colors';
import Images from '../../../assets';

type ButtonSignUpProps = React.ComponentProps<typeof TouchableOpacity>;

const ButtonSignUp: React.FC<ButtonSignUpProps> = props => {
  return (
    <TouchableOpacity
      style={[styles.button, props.disabled ? styles.buttonDisabled : {}]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Typography level="button">Sign Up</Typography>
      <View style={styles.borderArrow}>
        <Image source={Images.Icon.ArrowRight} style={styles.arrow} />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonSignUp;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
  },
  buttonDisabled: {opacity: 0.3},
  borderArrow: {
    borderRadius: 27,
    width: 54,
    height: 54,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    height: 12,
    width: 21,
  },
});
