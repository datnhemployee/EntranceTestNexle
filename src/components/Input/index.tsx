import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Colors from '../../utils/colors';
import Typography from '../Typography';
import Images from '../../assets';

type InputProps = TextInputProps & {
  title: string;
  color?: string;
  includeFontPadding?: boolean;
  bottomLine?: React.ReactNode;
  secure?: boolean;
};

const FOCUS_VALUE = 1;
const BLUR_VALUE = 0.01;

const Input = forwardRef<any, InputProps>((props, ref) => {
  const [secureTextEntry, setSecureTextEntry] = useState(props.secure);

  const refInput = useRef<React.ElementRef<typeof TextInput>>(null);

  const focusAnimatedValue = useRef(new Animated.Value(BLUR_VALUE));
  const titleInterpolation = useMemo(
    () =>
      focusAnimatedValue.current.interpolate({
        inputRange: [BLUR_VALUE, FOCUS_VALUE],
        outputRange: [styles.inputWrapper.marginTop + 24, 0],
      }),
    [],
  );
  const borderInterpolation = useMemo(
    () =>
      focusAnimatedValue.current.interpolate({
        inputRange: [BLUR_VALUE, FOCUS_VALUE],
        outputRange: [Colors.SECONDARY, Colors.PRIMARY],
      }),
    [],
  );

  const toggleSecureTextEntry = () => setSecureTextEntry(prev => !prev);

  const onPressInput = () => refInput?.current?.focus?.();

  const onFocus: TextInputProps['onFocus'] = event => {
    Animated.timing(focusAnimatedValue.current, {
      toValue: FOCUS_VALUE,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    props?.onFocus?.(event);
  };

  const onBlur: TextInputProps['onBlur'] = event => {
    if (props.value) {
      return;
    }
    Animated.timing(focusAnimatedValue.current, {
      toValue: BLUR_VALUE,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    props?.onBlur?.(event);
  };

  useImperativeHandle(ref, () => refInput.current);

  return (
    <TouchableWithoutFeedback onPress={onPressInput}>
      <View>
        <Animated.View
          style={[{transform: [{translateY: titleInterpolation}]}]}>
          <Typography level="subscript" color={Colors.SECONDARY}>
            {props.title}
          </Typography>
        </Animated.View>

        <View style={styles.inputWrapper}>
          <TextInput
            ref={refInput}
            {...props}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
            style={[styles.input, {color: props?.color}, props?.style]}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          {props?.secure && (
            <TouchableOpacity onPress={toggleSecureTextEntry}>
              <Image style={styles.eye} source={Images.Icon.Eye} />
            </TouchableOpacity>
          )}
        </View>

        {props?.bottomLine ?? (
          <Animated.View
            style={[styles.bottomLine, {borderColor: borderInterpolation}]}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});

Input.defaultProps = {
  color: Colors.TEXT_LIGHT,
  includeFontPadding: false,
  clearTextOnFocus: false,
};

export default Input;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato Regular',
    padding: 0,
  },
  eye: {
    marginLeft: 8,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  bottomLine: {
    borderBottomWidth: 1,
  },
});
