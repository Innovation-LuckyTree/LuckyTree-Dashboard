import { useState } from "react";
import { useAuthStore } from "./useAuthStore";
import * as authService from './../../services/authService';
import { LoginRequest } from "../../pages/login/models/request";
import axios from "axios";

export const useAuth=() => {
  const { user, setUserAuth, logout: clearUser} = useAuthStore();
  const [ loading, setLoading] = useState(false);
  const [ error, setError] = useState<string | null>(null);
      
  const login = async (payload: LoginRequest) => {
    setLoading(true);
    try {
      const response = await authService.login(payload);
      setUserAuth(response.data.token,response.data.user);
      setError(null);
    } catch (err: any) {
      let message = 'Login failed';
      if (axios.isAxiosError(err)) {
        var code = err.status;
        switch (code){
          case 404:
            message = "Api not found";
            break;
          case 400:
            message = "Username or Password is incorrect";
            break;
          case 500:
            message = "Something went wrong with the servers. Try again later.";
            break;
        }
      }
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearUser();
  };

  return {
    login,
    user,
    loading,
    logout,
    error,
    isAuthenticated: !!user
  }
}