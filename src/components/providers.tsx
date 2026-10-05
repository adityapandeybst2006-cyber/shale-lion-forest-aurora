import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15_000,
        retry: 1,
        refetchOnWindowFocus: true,
      },
    },
  });
}

let browserClient: QueryClient | undefined;

function getClient() {
  if (typeof document === "undefined") return makeClient();
  browserClient ??= makeClient();
  return browserClient;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(getClient);
  return (
    <QueryClientProvider client={client}>
      <TooltipProvider delayDuration={250}>{children}</TooltipProvider>
    </QueryClientProvider>
  );
}
