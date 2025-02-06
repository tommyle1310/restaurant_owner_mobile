import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PromotionManagement from './PromotionList';
import CustomerFeedback from './CustomerFeedback';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home'; // Default value

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Promotions':
                iconName = 'pricetags';
                break;
              case 'Feedback':
                iconName = 'chatbubbles';
                break;
              default:
                iconName = 'home'; // Fallback to prevent type error
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Promotions" component={PromotionManagement} />
        <Tab.Screen name="Feedback" component={CustomerFeedback} />
      </Tab.Navigator>
  );
};


export default AppNavigator;
