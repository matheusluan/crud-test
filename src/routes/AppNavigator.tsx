// routes/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from '../screens/UserScreen';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from "../global/styles_global";
import CompanyScreen from '../screens/CompanyScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: styles.colors.contrast,
          elevation: 0,
          borderTopWidth: 1,
          borderColor: styles.colors.border,
          height: 70,
        },
        tabBarItemStyle: {
          padding: 12,
        },
        tabBarIconStyle: {
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontFamily: styles.fonts.medium,
          fontSize: 14,
        },
        tabBarActiveTintColor: styles.colors.blue,
      }}
    >
      <Tab.Screen
        name="Users"
        component={UserScreen}
        options={{
          tabBarLabel: 'Users',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Company"
        component={CompanyScreen}
        options={{
          tabBarLabel: 'Company',
          tabBarIcon: ({ color, size }) => (
            <Icon name='package' size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
