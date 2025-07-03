import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function Auth() {

    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");   

    //const {signIn,signUp} = useAuth(); // Assuming useAuth is defined in your auth context

    const theme = useTheme();
    // const router = useRouter();

    const handleSwitch = () => {
        setIsSignUp((prev) => !prev);
    }

    const handleAuth = async () => {
        if(!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        if(password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setError(null);
        // try {
        //     if (isSignUp) {
        //         await signUp(email, password);
        //     } else {
        //         await signIn(email, password);
        //     }
        // } catch (err) {
        //     if (err instanceof Error) {
        //         setError(err.message);
        //     } else {
        //         setError("An unexpected error occurred");
        //     }
        // }
        // router.replace("/"); // Navigate to the home screen after successful auth

    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"}
        style= {styles.container}
    >
        <View  style= {styles.content}>
            <Text style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"} </Text>
            <TextInput 
            label="Email" 
            autoCapitalize='none' 
            keyboardType='email-address' 
            placeholder='example@gmial.com'
            mode='outlined'
            style= {styles.input}
            onChangeText= {setEmail}
            />
            
            <TextInput 
            label="Password" 
            autoCapitalize='none' 
            secureTextEntry={true}
            mode='outlined'
            style= {styles.input}
            onChangeText={setPassword}
            />

            {error && <Text style={{color: theme.colors.error}}>{error}</Text>}                                                                                                                                                       

            <Button mode='contained' 
                    style={styles.button} onPress={handleAuth}>
                 {isSignUp? "Sign Up" : "Sign In"} 
            </Button>
            <Button mode='text' onPress={handleSwitch} style={styles.switchButton}> 
                {isSignUp ? "Already have an account? Sign In" :
                 "Don't have an account? Sign Up"} 
                 </Button>
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title:{
        textAlign: 'center',
        fontSize: 24,
    },
    input:{
        marginBottom: 10,
         marginTop: 10},
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    switchButton: {
        marginTop: 17,  
    }
});