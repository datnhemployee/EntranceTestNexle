import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets';
import Background from '../../components/Background';
import {signUpAndSignIn} from '../../redux/auth/actions';
import {useAppDispatch} from '../../redux/store';
import useForm from './useForm';
import useKeyboardKit from './useKeyboardKit';

type SignInScreenProps = {};

const SignInScreen: React.FC<SignInScreenProps> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const form = useForm();

  const ref = useRef(null);
  const refLastInput = useRef(null);

  const keyboardKit = useKeyboardKit();

  const [topMargin, setTopMargin] = useState(dimension.height * 0.4);

  const updateTopMargin = (layoutContentEvent: any) => {
    const contentHeight = layoutContentEvent?.nativeEvent?.layout?.height;
    const nextTopMargin = Math.min(
      dimension.height - contentHeight,
      dimension.height * 0.4,
    );
    setTopMargin(nextTopMargin);
  };

  const scrollToField = async () => {
    const keyboardHeight = await keyboardKit.promise;
    const topOfKeyboard = dimension.height - keyboardHeight;
    const bottomOfLogInForm: any = await new Promise(resolve => {
      (refLastInput.current as any)?.measureLayout?.(
        ref?.current,
        (_: any, nextBottomLogInForm: number) => resolve(nextBottomLogInForm),
      );
    });
    const delta =
      bottomOfLogInForm - topOfKeyboard + (StatusBar.currentHeight ?? 0);

    (ref?.current as any)?.scrollTo?.({
      y: delta,
      animated: true,
    });
  };

  const onSignUp = async () => {
    try {
      await dispatch(signUpAndSignIn(form.form)).unwrap();
      navigation.navigate('Category');
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      <Background source={Images.Background.LogIn} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView
          ref={ref}
          style={{
            minHeight: '100%',
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
            locations={[0, 0.4, 0.6]}
            style={{
              minHeight: dimension.height,
              paddingHorizontal: 32,
            }}>
            <View
              style={{
                marginTop: topMargin,
              }}
            />

            <View onLayout={updateTopMargin}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                }}>
                Let's get you started!
              </Text>

              <View style={{marginTop: 41}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                  }}>
                  Your email
                </Text>
                <TextInput
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    borderColor: 'white',
                    padding: 0,
                  }}
                  value={form.form.email}
                  includeFontPadding={false}
                  onFocus={scrollToField}
                  onChangeText={form.onChange('email')}
                />

                {!!form?.errors?.email && (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 12,
                    }}>
                    {form?.errors?.email}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 26}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                  }}>
                  Your Password
                </Text>
                <TextInput
                  style={{color: 'white', padding: 0}}
                  includeFontPadding={false}
                  value={form.form.password}
                  secureTextEntry
                  onChangeText={form.onChange('password')}
                />

                {!!form?.errors?.email && (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 12,
                    }}>
                    {form?.errors?.password}
                  </Text>
                )}
              </View>

              <View
                ref={refLastInput}
                style={{borderWidth: 1, borderColor: 'white'}}
              />

              <View
                style={{
                  marginTop: 49,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    width: 23,
                    height: 23,
                    marginRight: 8,
                  }}
                />
                <Text style={{color: 'white'}}>I am over 16 years of age</Text>
              </View>

              <View style={{flex: 1, marginTop: 29}}>
                <Text style={{color: 'white'}}>
                  By clicking Sign Up, you are indicating that you have read and
                  agree to the{' '}
                  <Text style={{color: 'purple'}}>Terms of Service</Text> and{' '}
                  <Text style={{color: 'purple'}}>Privacy Policy</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  flex: 1,
                  marginTop: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 54,
                }}
                onPress={onSignUp}>
                <Text style={{color: 'white'}}>Sign Up</Text>
                <View
                  style={{
                    borderRadius: 27,
                    width: 54,
                    height: 54,
                    borderWidth: 1,
                    borderColor: 'purple',
                  }}
                />
              </TouchableOpacity>

              <SafeAreaView />
            </View>
          </LinearGradient>
        </ScrollView>

        <View style={{position: 'absolute', top: 0, left: 0, right: 0}}>
          <SafeAreaView />
          <Text>Back</Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignInScreen;
