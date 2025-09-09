import { api } from "@/lib/api";
import { User } from "@/types";
import { LoginInput, RegisterInput } from "@/types";

const authApi = {
    
    login: async (credentials: LoginInput) => {
      return api.post<User>('/auth/sign-in', credentials);
    },
  
    signUp: async (data: RegisterInput) => {
      return api.post<User>('/auth/sign-up', data);
    },
  
    signOut: async () => {
      return api.post('/auth/sign-out');
    },
  
    getMe: async () => {
      return api.get<User>('/auth/me');
    },

    getProfile: async () => {
      return api.get<User>('/auth/profile');
    },

    resendVerificationEmail: async (email: string) => {
      return api.post('/auth/resend-verification-email', { email });
    },
  };

  export default authApi;