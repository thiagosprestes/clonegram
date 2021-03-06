import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './appRoutes';
import HomeIcon from '~/assets/icons/Home.svg';
import SearchIcon from '~/assets/icons/Search.svg';
import Home from '~/features/App/Home/Screen';
import PostLikes from '~/features/App/PostLikes/Screen';
import PostComments from '~/features/App/PostComments/Screen';
import Profile from '~/features/App/Profile/Screen';
import Post from '~/features/App/Post/Screen';
import Search from '~/features/App/Search/Screen';
import Followers from '~/features/App/Followers/Screen';
import Following from '~/features/App/Following/Screen';
import EditProfileScreen from '~/features/App/EditProfile/Screen';
import Camera from '~/features/App/Camera/Screen';

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
      <HomeStack.Screen
        name={Routes.Profile}
        component={Profile}
        options={({ navigation }) => ({
          headerShown: true,
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
        name={Routes.Followers}
        component={Followers}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Seguidores',
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
        name={Routes.Following}
        component={Following}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Seguindo',
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
      <HomeStack.Screen name={Routes.Camera} component={Camera} />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <HomeStack.Screen name={Routes.Search} component={Search} />
      <HomeStack.Screen
        name={Routes.Profile}
        component={Profile}
        options={({ navigation }) => ({
          headerShown: true,
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
        name={Routes.Followers}
        component={Followers}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Seguidores',
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
        name={Routes.Following}
        component={Following}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Seguindo',
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

function ProfileStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen name={Routes.Profile} component={Profile} />
      <HomeStack.Screen
        name={Routes.Post}
        component={Post}
        options={({ navigation }) => ({
          title: 'Publicações',
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
        name={Routes.Followers}
        component={Followers}
        options={({ navigation }) => ({
          title: 'Seguidores',
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
        name={Routes.Following}
        component={Following}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Seguindo',
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
        name={Routes.EditProfile}
        component={EditProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Editar perfil',
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
          component={SearchStackScreen}
          options={{
            tabBarIcon: () => <SearchIcon width={30} height={30} />,
          }}
        />
        <Tab.Screen
          name={Routes.Profile}
          component={ProfileStackScreen}
          options={{
            tabBarIcon: () => (
              <Ionicons name='person-circle-outline' size={35} color='black' />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AppRoutes;
