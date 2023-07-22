import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StatusBar, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Images from '../../assets';
import Background from '../../components/Background';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Screen from '../../components/Screen';
import ButtonBack from '../../components/Screen/ButtonBack';
import Header from '../../components/Screen/Header';
import Typography from '../../components/Typography';
import {signUpAndSignIn} from '../../redux/auth/actions';
import {useAppDispatch} from '../../redux/store';
import {FetchStatus} from '../../types';
import Colors from '../../utils/colors';
import ButtonSignUp from './components/ButtonSignUp';
import {
  PasswordLevelLine,
  PasswordLevelText,
  usePasswordLevel,
} from './components/PasswordLevel';
import styles from './styles';
import useForm, {PASSWORD_MAX_LENGTH} from './useForm';
import useKeyboardKit from './useKeyboardKit';

type SignInScreenProps = {};

const SignInScreen: React.FC<SignInScreenProps> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const dimension = useWindowDimensions();
  const keyboardKit = useKeyboardKit();

  const safeInset = useSafeAreaInsets();

  const [status, setState] = useState<FetchStatus>('new');
  const [checkBox, setCheckBox] = useState(false);
  const [topMargin, setTopMargin] = useState(dimension.height * 0.4);

  const form = useForm();
  const passwordLevel = usePasswordLevel(form?.form?.password);

  const refPassword = useRef(null);
  const refScreen = useRef(null);
  const refBottomForm = useRef(null);

  const onToggleCheckBox = (nextValue: boolean) => setCheckBox(nextValue);

  const updateTopMargin = (layoutContentEvent: any) => {
    const contentHeight = layoutContentEvent?.nativeEvent?.layout?.height;
    let nextTopMargin = Math.min(
      dimension.height - contentHeight,
      dimension.height * 0.4,
    );
    if (nextTopMargin < dimension.height * 0.2) {
      nextTopMargin = dimension.height * 0.4;
    }
    setTopMargin(nextTopMargin);
  };

  const scrollToViewForm = async () => {
    const keyboardHeight = await keyboardKit.promise;
    const topKeyboard = dimension.height - keyboardHeight;

    const bottomForm: any = await new Promise(resolve => {
      (refBottomForm.current as any)?.measureLayout?.(
        refScreen?.current,
        (_: any, nextBottomLogInForm: number) => resolve(nextBottomLogInForm),
      );
    });
    const delta = bottomForm - topKeyboard + (StatusBar.currentHeight ?? 0);

    (refScreen?.current as any)?.scrollTo?.({
      y: delta,
      animated: true,
    });
  };

  const onNext = (type: 'email' | 'password') => () => {
    switch (type) {
      case 'email':
        (refPassword.current as any)?.focus?.();
        return;
      case 'password':
        if (form.hasError) return;
        onSignUp();
    }
  };

  const onSignUp = async () => {
    try {
      setState('loading');
      setState('loading');
      await dispatch(signUpAndSignIn(form.form)).unwrap();
      navigation.navigate('Category');
      Toast.show({
        type: 'success',
        text1: 'Done!',
        text2: 'Sign in success!',
      });
      setState('success');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed!',
        text2: 'Something went wrong!',
      });
      console.log('Something went wrong!', error);
      setState('error');
    }
  };

  useEffect(() => {
    (function changeAndValidateOnMountForm() {
      form.onChangeAndValidate('email')('');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <Background source={Images.Background.LogIn} />

      <Screen ref={refScreen}>
        <View style={{marginTop: topMargin}} />

        <View onLayout={updateTopMargin}>
          <Typography level="h1">Let's get you started!</Typography>

          <View style={styles.fieldEmail}>
            <Input
              title="Your email"
              value={form.form.email}
              onFocus={scrollToViewForm}
              onChangeText={form.onChangeAndValidate('email')}
              onSubmitEditing={onNext('email')}
              returnKeyType="next"
            />

            <View style={styles.fieldErrorAndLevelWrapper}>
              <Typography level="subscript" color={Colors.ERROR}>
                {form?.errors?.email ?? ''}
              </Typography>
            </View>
          </View>

          <View style={styles.fieldPassword}>
            <Input
              ref={refPassword}
              secure
              title="Your password"
              value={form.form.password}
              onFocus={scrollToViewForm}
              onChangeText={form.onChangeAndValidate('password')}
              bottomLine={
                form?.form?.password ? (
                  <PasswordLevelLine level={passwordLevel} />
                ) : undefined
              }
              maxLength={PASSWORD_MAX_LENGTH}
              onSubmitEditing={onNext('password')}
              returnKeyType="done"
            />

            <View style={styles.fieldErrorAndLevelWrapper}>
              <Typography level="subscript" color={Colors.ERROR}>
                {form?.errors?.password ?? ''}
              </Typography>

              <PasswordLevelText level={passwordLevel} />
            </View>
          </View>

          <View ref={refBottomForm} />

          <View style={styles.checkboxWrapper}>
            <CheckBox
              value={checkBox}
              onToggle={onToggleCheckBox}
              containerStyle={styles.checkbox}
            />
            <Typography level="body">I am over 16 years of age</Typography>
          </View>

          <View style={styles.termAndPolicy}>
            <Typography level="subscript">
              {`By clicking Sign Up, you are indicating that you have read and agree to the `}
              <Typography level="subscript" color={Colors.PRIMARY}>
                Terms of Service
              </Typography>
              {' and '}
              <Typography level="subscript" color={Colors.PRIMARY}>
                Privacy Policy
              </Typography>
            </Typography>
          </View>

          <ButtonSignUp onPress={onSignUp} disabled={form.hasError} />

          <View style={{height: safeInset.bottom + 20}} />
        </View>
      </Screen>

      {status === 'loading' && <Loading />}

      <Header>
        <ButtonBack />
      </Header>
    </>
  );
};

export default SignInScreen;
