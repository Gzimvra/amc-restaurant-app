import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { UserProvider } from "../contexts/UserContext";

const RootLayout = () => {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Both index and login route to the same screen */}
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="restaurants" options={{ title: "Restaurants" }} />
      </Stack>

      {/* Global Toast Component */}
      <Toast />
    </UserProvider>
  );
};

export default RootLayout;
