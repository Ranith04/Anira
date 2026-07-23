import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from './client';
import type { UserProfile } from '@/types';

// Use a global variable to store the token in memory, or localStorage if you prefer persistence across tabs
let authToken = localStorage.getItem('anira_token') || '';

export function setAuthToken(token: string) {
  authToken = token;
  if (token) {
    localStorage.setItem('anira_token', token);
  } else {
    localStorage.removeItem('anira_token');
  }
}

export function getAuthToken() {
  return authToken;
}

// Override the fetchApi internally for auth calls to inject the Bearer token
export async function authFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  return fetchApi<T>(endpoint, { ...options, headers });
}

export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authFetch<UserProfile>('/auth/me'),
    enabled: !!authToken, // Only fetch if we have a token
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => fetchApi<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.setQueryData(authKeys.profile(), data.user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => fetchApi<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.setQueryData(authKeys.profile(), data.user);
    },
  });
}
