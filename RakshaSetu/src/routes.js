import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ShakeHandler from "../src/components/ShakeHandler";
import VoiceHandler from "../src/components/VoiceHandler";

import KeyboardAwareWrapper from "./components/KeyboardAwareWrapper";
import AddFriendsScreen from "./screens/AddCloseFriendsScreen";
import BudgetToolScreen from "./screens/BudgetToolScreen";
import CommunityScreen from "./screens/CommunityScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import EmergencyHelplineScreen from "./screens/EmergencyHelplineScreen";
import FakeCallScreen from "./screens/FakeCallScreen";
import FinancialNews from "./screens/FinancialNews";
import GeminiChatScreen from "./screens/GeminiChatScreen";
import GenerateReportScreen from "./screens/GenerateReportScreen";
import HomeScreen from "./screens/HomeScreen";
import InAppChatScreen from "./screens/InAppChatScreen";
import JobMarketScreen from "./screens/JobMarketScreen";
import LiveLocationScreen from "./screens/LiveLocationScreen";
import LoginScreen from "./screens/LoginScreen";
import MyLearningPath from "./screens/MyLearningPathScreen";
import MyPostsScreen from "./screens/MyPostsScreen";
import MyReportsScreen from "./screens/MyReportsScreen";
import OTPVerificationScreen from "./screens/OTPVerificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SkillDevelopmentScreen from "./screens/SkillDevelopmentScreen";
import SOSScreen from "./screens/SOSScreen";
import SplashScreen from "./screens/SplashScreen";
import TellUsAboutYourselfScreen from "./screens/TellUsAboutYourselfScreen";
import TrackMeScreen from "./screens/TrackMeScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const withKeyboardAwareWrapper = (Component) => (props) => (
  <KeyboardAwareWrapper>
    <Component {...props} />
  </KeyboardAwareWrapper>
);

/** ========== Home Stack ========== **/
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="FakeCall" component={FakeCallScreen} />
      <Stack.Screen name="AddFriends" component={AddFriendsScreen} />
      <Stack.Screen name="GenerateReport" component={GenerateReportScreen} />
      <Stack.Screen name="TrackMe" component={TrackMeScreen} />
      <Stack.Screen name="SkillDevelopment" component={SkillDevelopmentScreen} />
      <Stack.Screen name="BudgetTool" component={BudgetToolScreen} />
      <Stack.Screen name="MyLearningPath" component={MyLearningPath} />
      <Stack.Screen name="FinancialNews" component={FinancialNews} />
      <Stack.Screen name="LiveLocationScreen" component={LiveLocationScreen} />
      <Stack.Screen name="JobMarket" component={JobMarketScreen} />
    </Stack.Navigator>
  );
}

/** ========== Profile Stack ========== **/
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="MyPosts" component={MyPostsScreen} />
      <Stack.Screen name="MyReports" component={MyReportsScreen} />
      <Stack.Screen name="EmergencyHelpline" component={EmergencyHelplineScreen} />
    </Stack.Navigator>
  );
}

function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityMain" component={CommunityScreen} />
      <Stack.Screen name="GeminiChat" component={GeminiChatScreen} />
      <Stack.Screen name="InAppChat" component={InAppChatScreen} />
    </Stack.Navigator>
  );
}

/** ========== Example Floating Tab Bar ========== **/
function FloatingTabBar({ state, descriptors, navigation }) {
  const currentRouteName = state.routes[state.index].name;
  let hideTabBar = false;

  if (currentRouteName === "Home") {
    const childRoute = getFocusedRouteNameFromRoute(state.routes[state.index]) ?? "HomeMain";
    if (childRoute === "FakeCall" || childRoute === "AddFriends" || childRoute === "GenerateReport" || childRoute === "JobMarket" || childRoute === "BudgetTool" || childRoute === "FinancialNews" || childRoute === "MyLearningPath") {
      hideTabBar = true;
    }
  } else if (currentRouteName === "Profile") {
    const childRoute = getFocusedRouteNameFromRoute(state.routes[state.index]) ?? "ProfileMain";
    if (childRoute === "EditProfile" || childRoute === "EmergencyHelpline" || childRoute === "MyPosts" || childRoute === "MyReports") {
      hideTabBar = true;
    }
  } else if (currentRouteName === "Community") {
    const childRoute = getFocusedRouteNameFromRoute(state.routes[state.index]) ?? "CommunityMain";
    if (childRoute === "GeminiChat" || childRoute === "InAppChat") {
      hideTabBar = true;
    }
  }
  if (hideTabBar) {
    return null;
  }

  return (
    <View style={styles.floatingContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = options.title !== undefined ? options.title : route.name;

        let iconName = "";
        let IconComponent = Ionicons;

        if (route.name === "Home") {
          iconName = isFocused ? "home" : "home-outline";
        } else if (route.name === "Navigation") {
          IconComponent = MaterialCommunityIcons;
          iconName = "navigation-variant-outline";
        } else if (route.name === "SOS") {
          iconName = "alert-circle-outline";
        } else if (route.name === "Community") {
          iconName = isFocused ? "people" : "people-outline";
        } else if (route.name === "Profile") {
          iconName = isFocused ? "person" : "person-outline";
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Animated.View style={[styles.iconContainer, isFocused && styles.iconFocused]}>
              <IconComponent
                name={iconName}
                size={24}
                color={isFocused ? "#FF4B8C" : "#8e8e8e"}
                style={{ transform: [{ translateY: isFocused ? -2 : 0 }] }}
              />
            </Animated.View>
            <Text style={[styles.tabLabel, { color: isFocused ? "#FF4B8C" : "#8e8e8e" }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/** ========== Main Tabs ========== **/
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Navigation" component={TrackMeScreen} options={{ title: "Track Me" }} />
      <Tab.Screen name="SOS" component={SOSScreen} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

/** ========== Root Stack ========== **/
export default function Routes() {
  return (
    <>
      {/* Always active ShakeHandler to detect shakes and navigate to SOS */}
      <ShakeHandler />
      <VoiceHandler />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="TellUsAboutYourselfScreen" component={TellUsAboutYourselfScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </>
  );
}

/** ========== STYLES ========== **/
const styles = StyleSheet.create({
  floatingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconFocused: {
    backgroundColor: "rgba(255, 75, 140, 0.1)",
  },
  tabLabel: {
    fontSize: 11,
    paddingBottom: 8,
  },
});
