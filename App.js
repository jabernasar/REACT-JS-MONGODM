import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./src/utils/store";
import { Provider } from "react-redux";
import Navigation from "./src/Components/Navigation";
import ImmediateScreen from "./src/Screens/ImmediateScreen";
import MovieScreen from "./src/Screens/MovieScreen";
import SearchScreen from "./src/Screens/SearchScreen";
import AuthScreen from "./src/Screens/AuthScreen";
import { ToastProvider } from "react-native-toast-notifications";
import { auth } from "./src/utils/firebase";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(user);
      } else {
        setIsLogin(false);
      }
    });
  }, [auth]);
  return (
    <NavigationContainer>
      <ToastProvider offsetTop={50}>
        <Provider store={store}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#000",
                borderBottomColor: "#000",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                // fontFamily: "Poppins_400Regular",
              },
              headerTitleAlign: "center",
            }}
          >
            {isLogin ? (
              <>
                <Stack.Screen name='Edit Profile' component={ImmediateScreen} />
                <Stack.Screen
                  name='Landing'
                  component={Navigation}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name='Movie' component={MovieScreen} />
                <Stack.Screen name='Search' component={SearchScreen} />
              </>
            ) : (
              <>
                <Stack.Screen
                  name='Auth'
                  component={AuthScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </Provider>
      </ToastProvider>
    </NavigationContainer>
  );
}
