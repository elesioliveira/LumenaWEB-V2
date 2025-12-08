// src/providers/AppProviders.tsx

import { AuthProvider } from "../module/auth/provider/AuthProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>
    {children}
  </AuthProvider>
}
