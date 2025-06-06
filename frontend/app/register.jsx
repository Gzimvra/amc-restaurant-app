import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { registerUser } from "../services/auth";
import WaveBackground from "../components/WaveBackground";
import ToastHandler from "../components/ToastHandler";
import LoadingButton from "../components/LoadingButton";
import InputField from "../components/InputField";
import styles from "../styles/AuthStyles";
import { useUser } from "../contexts/UserContext";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    const { colors } = useTheme();
    const router = useRouter();
    const { setUser } = useUser();

    const handleRegister = async () => {
        setUsernameError("");
        setEmailError("");
        setPasswordError("");

        let valid = true;

        if (!username.trim()) {
            setUsernameError("Username is required");
            valid = false;
        }

        if (!email.trim()) {
            setEmailError("Email is required");
            valid = false;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            valid = false;
        }

        if (!valid) return;

        setLoading(true);

        try {
            setUsernameError("");
            setEmailError("");
            setPasswordError("");

            await registerUser(username, email, password);
            router.push("restaurants");
            setUser(response.user); // Store user in context

            setUsername("");
            setEmail("");
            setPassword("");

        } catch (err) {
            ToastHandler("error", "Registration Failed", err?.response?.data?.message || "Oops! Something went wrong");

        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <WaveBackground />

            <View style={{ paddingHorizontal: 20, width: "100%" }}>
                <Text style={styles.title}>Join Us Today! 🎉</Text>
                <Text style={styles.subtitle}>Create your account to get started</Text>

                <InputField
                    label="Username"
                    labelIcon="account"
                    value={username}
                    onChangeText={setUsername}
                    error={usernameError}
                    keyboardType="default"
                />
                
                <InputField
                    label="Email"
                    labelIcon="email"
                    value={email}
                    onChangeText={setEmail}
                    error={emailError}
                    keyboardType="email-address"
                />

                <InputField
                    label="Password"
                    labelIcon="lock"
                    value={password}
                    onChangeText={setPassword}
                    error={passwordError}
                    secureTextEntry
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                />

                <LoadingButton loading={loading} onPress={handleRegister} label="Register" />

                <TouchableOpacity onPress={() => router.push("login")}>
                    <Text style={styles.signupText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
