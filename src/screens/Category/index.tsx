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

  const categoryWidth = (dimension.width - 16 * 2 - 8 * 2) / 3;

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
              paddingHorizontal: 16,
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

            <View
              style={{
                flexDirection: 'row',
                marginTop: 11,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                  }}>
                  Please select categories what you would like to
                  {'\n'}see on your feed. You can set this later on Filter.
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View
                style={{
                  width: categoryWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'white',
                  borderRadius: 8,
                  borderWidth: 1,
                  height: 71,
                }}>
                <Text
                  style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
                  I Need Help
                </Text>
              </View>

              <View
                style={{
                  marginLeft: 8,
                  width: categoryWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'white',
                  borderRadius: 8,
                  borderWidth: 1,
                  height: 71,
                }}>
                <Text
                  style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
                  Helpful Tips
                </Text>
              </View>

              <View
                style={{
                  marginLeft: 8,
                  width: categoryWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'white',
                  borderRadius: 8,
                  borderWidth: 1,
                  height: 71,
                  paddingHorizontal: 8,
                }}>
                <Text
                  style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
                  Eating Disorders
                </Text>
              </View>
            </View>
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
