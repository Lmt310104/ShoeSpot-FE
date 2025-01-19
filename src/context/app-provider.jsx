import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "../components/errors/main";
import { Suspense } from "react";
import AuthProvider from "./auth";

export default function AppProvider({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading....
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <AuthProvider>{children}</AuthProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
