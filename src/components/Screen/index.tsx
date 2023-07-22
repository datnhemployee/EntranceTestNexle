import React, {PropsWithChildren, forwardRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ScreenProps = PropsWithChildren<{
  locations?: number[];
}>;

const Screen = forwardRef<any, ScreenProps>((props, ref) => {
  const dimension = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <ScrollView
        ref={ref}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
          locations={props?.locations ?? [0, 0.4, 0.6]}
          style={[styles.linear, {minHeight: dimension.height}]}>
          {props?.children}
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default Screen;

export const styles = StyleSheet.create({
  scroll: {minHeight: '100%'},
  linear: {paddingHorizontal: 16},
});
