import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <>
      <Stack>
        {/* Both index and login route to the same screen */}
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="restaurants" options={{ title: "Restaurants" }} />
      </Stack>

      {/* Global Toast Component */}
      <Toast />
    </>
  );
};

export default RootLayout;
