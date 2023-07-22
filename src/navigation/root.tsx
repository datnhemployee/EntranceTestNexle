import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignUp';
import CategoryScreen from '../screens/Category';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
