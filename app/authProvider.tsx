import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';


const API_URL = 'http://192.168.0.140:3000/users'; 


type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('users');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      console.log('Failed to load user:', e);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const res = await axios.post(API_URL, { email, password });
      await AsyncStorage.setItem('users', JSON.stringify(res.data));
      setUser(res.data);
      return null;
    } catch (error) {
      console.log('Signup error:', error);
      return 'Signup failed';
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await axios.get(API_URL, {
        params: {
          email: email.toLowerCase().trim(),
          password: password.trim()
        }
      });
  
      if (!Array.isArray(res.data) || res.data.length !== 1) {
        return 'Invalid email or password';
      }
  
      const loggedInUser = res.data[0];
  
      await AsyncStorage.setItem('users', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
  
      return null;
    } catch (error) {
      console.log('Login error:', error);
      return 'Login failed';
    }
  };
  

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('users');
      setUser(null);
    } catch (error) {
      console.log('Sign-out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
