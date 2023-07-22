import React, {useEffect} from 'react';
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
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getCategoryList} from '../../redux/category/actions';
import {Category} from '../../redux/category/slice';

type CategoryScreenProps = {};

const NUM_CATEGORY_PER_ROW = 3;

const CategoryScreen: React.FC<CategoryScreenProps> = () => {
  const dimension = useWindowDimensions();
  const dispatch = useAppDispatch();

  const categoryList = useAppSelector(state => state.category.data);
  const status = useAppSelector(state => state.category.status);

  const categoryWidth = (dimension.width - 16 * 2 - 8 * 2) / 3;

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCategoryList()).unwrap();
      } catch (error) {
        console.log('Got error on fetch category list');
      }
    })();
  }, []);

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

            {!!categoryList?.length &&
              categoryList
                .reduce<Category[][]>((prevList, category, index) => {
                  if (!prevList?.length) {
                    return [[category]];
                  }
                  if (index % NUM_CATEGORY_PER_ROW === 0) {
                    prevList.push([category]);
                    return prevList;
                  }
                  const prevRow = prevList[prevList.length - 1];
                  prevRow.push(category);
                  return prevList;
                }, [])
                .map((row: Category[]) => (
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    {row.map((category, categoryIndex) => (
                      <View
                        style={{
                          marginLeft: categoryIndex ? 8 : 0,
                          width: categoryWidth,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: 'white',
                          borderRadius: 8,
                          borderWidth: 1,
                          height: 71,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            textAlign: 'center',
                          }}>
                          {category?.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}

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
