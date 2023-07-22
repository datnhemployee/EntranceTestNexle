import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets';
import Background from '../../components/Background';

type CategoryScreenProps = {};

const CategoryScreen: React.FC<CategoryScreenProps> = () => {
  const dimension = useWindowDimensions();

  return (
    <>
      <StatusBar barStyle="light-content" />

      <Background source={Images.Background.Category} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView
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
                marginTop: dimension.height * 0.3,
              }}
            />

            <Text
              style={{
                color: 'white',
                fontSize: 24,
              }}>
              Wellcome to Nexle Entrance Test
            </Text>

            <SafeAreaView />
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

export default CategoryScreen;
