import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/features/App/Home/Screen';
import HomeIcon from '~/assets/icons/Home.svg';
import SearchIcon from '~/assets/icons/Search.svg';
import { useTheme } from 'styled-components';
import { removeAuthData } from '~/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import PostLikes from '~/features/App/PostLikes/Screen';
import PostComments from '~/features/App/PostComments/Screen';
import { Routes } from './appRoutes';
import { AntDesign } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '~/features/App/Profile/Screen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen name={Routes.Home} component={Home} />
      <HomeStack.Screen
        name={Routes.PostLikes}
        component={PostLikes}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Curtidas',
          headerLeft: () => (
            <AntDesign
              name='arrowleft'
              size={24}
              color='black'
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginRight: 10 }}
            />
          ),
        })}
      />
      <HomeStack.Screen
        name={Routes.PostComments}
        component={PostComments}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Comentários',
          headerLeft: () => (
            <AntDesign
              name='arrowleft'
              size={24}
              color='black'
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginRight: 10 }}
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveBackgroundColor: colors.primary,
        })}
      >
        <Tab.Screen
          name={Routes.Home}
          component={HomeStackScreen}
          options={{
            tabBarIcon: () => <HomeIcon width={30} height={30} />,
          }}
        />
        <Tab.Screen
          name={Routes.Search}
          component={Home}
          options={{
            tabBarIcon: () => (
              <SearchIcon
                width={30}
                height={30}
                onPress={() => dispatch(removeAuthData())}
              />
            ),
          }}
        />
        <Tab.Screen
          name={Routes.Profile}
          component={Profile}
          options={{
            tabBarIcon: () => (
              <AntDesign name='profile' width={30} height={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AppRoutes;
