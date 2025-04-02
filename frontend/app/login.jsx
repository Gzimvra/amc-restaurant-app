import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { authenticateUser } from '../services/auth';
import WaveBackground from '../components/WaveBackground';
import ToastHandler from '../components/ToastHandler';
import LoadingButton from '../components/LoadingButton';
import InputField from '../components/InputField';
import { useUser } from '../contexts/UserContext';
import styles from '../styles/AuthStyles';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const { colors } = useTheme();
    const router = useRouter();
    const { setUser } = useUser();

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');

        let valid = true;

        if (!email.trim()) {
            setEmailError('Email is required');
            valid = false;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            valid = false;
        }

        if (!valid) return;

        setLoading(true);

        try {
            setEmailError(false);
            setPasswordError(false);

            const response = await authenticateUser(email, password);
            setUser(response.user); // Store user in context
            router.push('restaurants');
            
            setEmail("");
            setPassword("");

        } catch (err) {
            ToastHandler('error', 'Login Failed', err?.response?.data?.message || "Oops! Something went wrong");

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

            <View style={{ paddingHorizontal: 20, width: '100%' }}>
                <Text style={styles.title}>Welcome Back! 👋</Text>
                <Text style={styles.subtitle}>Login to your account</Text>

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

                <LoadingButton loading={loading} onPress={handleLogin} label="Login" />

                <TouchableOpacity onPress={() => router.push('register')}>
                    <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
