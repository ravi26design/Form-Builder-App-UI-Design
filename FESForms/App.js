import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/AppContext';
import { colors } from './src/theme';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import HomeScreen from './src/screens/HomeScreen';
import FormsScreen from './src/screens/FormsScreen';
import ProgramsScreen from './src/screens/ProgramsScreen';
import SubmissionsScreen from './src/screens/SubmissionsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SyncScreen from './src/screens/SyncScreen';

import BuilderScreen from './src/screens/BuilderScreen';
import FieldEditorScreen from './src/screens/FieldEditorScreen';
import FillFormScreen from './src/screens/FillFormScreen';
import FormDetailScreen from './src/screens/FormDetailScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import ProgramDetailScreen from './src/screens/ProgramDetailScreen';
import SubmissionDetailScreen from './src/screens/SubmissionDetailScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import TemplatesScreen from './src/screens/TemplatesScreen';
import AccountScreen from './src/screens/AccountScreen';
import TeamScreen from './src/screens/TeamScreen';
import IntegrationsScreen from './src/screens/IntegrationsScreen';
import HelpScreen from './src/screens/HelpScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS = {
  Dashboard: 'grid',
  Home: 'home',
  Forms: 'document-text',
  Programs: 'albums',
  Submissions: 'file-tray-full',
  Sync: 'cloud-upload',
  Profile: 'person',
};

function MainTabs() {
  const { isFieldUser } = useApp();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brandBlue,
        tabBarInactiveTintColor: '#9AA6BF',
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6, borderTopColor: colors.borderSubtle },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? TAB_ICONS[route.name] : TAB_ICONS[route.name] + '-outline'} size={22} color={color} />
        ),
      })}
    >
      {isFieldUser ? (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Forms" component={FormsScreen} />
          <Tab.Screen name="Sync" component={SyncScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Forms" component={FormsScreen} />
          <Tab.Screen name="Programs" component={ProgramsScreen} />
          <Tab.Screen name="Submissions" component={SubmissionsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { authed } = useApp();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }}>
      {!authed ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Tabs" component={MainTabs} />
          <Stack.Screen name="Builder" component={BuilderScreen} />
          <Stack.Screen name="FieldEditor" component={FieldEditorScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="FillForm" component={FillFormScreen} />
          <Stack.Screen name="FormDetail" component={FormDetailScreen} />
          <Stack.Screen name="Preview" component={PreviewScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} />
          <Stack.Screen name="SubmissionDetail" component={SubmissionDetailScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="Templates" component={TemplatesScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Team" component={TeamScreen} />
          <Stack.Screen name="Integrations" component={IntegrationsScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
