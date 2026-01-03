// src/providers/AppProviders.tsx

import { AuthProvider } from "../module/auth/provider/AuthProvider";
import { SalesProvider } from "../module/base/sales/provider/SalesProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>
    <SalesProvider>
      {children}
      </SalesProvider>
  </AuthProvider>
}
