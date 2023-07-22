import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Images from '../../assets';
import Background from '../../components/Background';
import Loading from '../../components/Loading';
import Screen from '../../components/Screen';
import ButtonBack from '../../components/Screen/ButtonBack';
import Header from '../../components/Screen/Header';
import Typography from '../../components/Typography';
import Paragraph from '../../components/Typography/Paragraph';
import {getCategoryList} from '../../redux/category/actions';
import {Category, CategoryActions} from '../../redux/category/slice';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import CategoryItem from './components/CategoryItem';
import styles from './styles';
import useCategoryRowList from './useCategoryRowList';
import Toast from 'react-native-toast-message';

type CategoryScreenProps = {};

const CategoryScreen: React.FC<CategoryScreenProps> = () => {
  const navigation = useNavigation<any>();
  const dimension = useWindowDimensions();
  const dispatch = useAppDispatch();
  const safeInset = useSafeAreaInsets();

  const categoryList = useAppSelector(state => state.category.data);
  const pickedList = useAppSelector(state => state.category.pickedList);
  const rowList = useCategoryRowList(categoryList);
  const status = useAppSelector(state => state.category.status);

  const checkPickedCategory = (category: Category) => {
    const pickedIndex = pickedList?.findIndex?.(
      picked => picked?.id === category?.id,
    );
    return pickedIndex > -1;
  };

  const onPressCategory = (category: Category) => {
    const clone = JSON.parse(JSON.stringify(pickedList)) as Category[];
    const pickedIndex = clone?.findIndex?.(
      picked => picked?.id === category?.id,
    );
    if (pickedIndex < 0) {
      dispatch(CategoryActions.setPickedList([...clone, category]));
      return;
    }
    clone.splice(pickedIndex, 1);
    dispatch(CategoryActions.setPickedList(clone));
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCategoryList()).unwrap();
        Toast.show({
          type: 'success',
          text1: 'Done!',
          text2: 'Fetch success!',
        });
      } catch (error) {
        console.log('Got error on fetch category list', error);
        Toast.show({
          type: 'error',
          text1: 'Failed!',
          text2: 'Something went wrong!',
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <Background source={Images.Background.Category} />

      <Screen locations={[0, 0.2, 0.3]}>
        <View style={{marginTop: dimension.height * 0.3}} />
        <Typography level="h1">Wellcome to Nexle Entrance Test</Typography>

        <Paragraph style={styles.subTitle} level="body">
          Please select categories what you would like to
          {'\n'}see on your feed. You can set this later on Filter.
        </Paragraph>

        {!!rowList?.length &&
          rowList.map((row: Category[]) => (
            <View style={styles.categoryRow}>
              {row.map((category, categoryIndex) => (
                <CategoryItem
                  data={category}
                  index={categoryIndex}
                  onPress={onPressCategory}
                  isPicked={checkPickedCategory(category)}
                />
              ))}
            </View>
          ))}

        <View style={{height: safeInset.bottom + 33}} />
      </Screen>

      {status === 'loading' && <Loading />}

      <Header>
        <ButtonBack onPress={navigation.goBack} />

        <TouchableOpacity
          style={[
            styles.buttonDone,
            !pickedList?.length ? styles.buttonDoneDisabled : {},
          ]}
          disabled={!pickedList?.length}>
          <Typography level="button">Done</Typography>
        </TouchableOpacity>
      </Header>
    </>
  );
};

export default CategoryScreen;
