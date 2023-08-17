"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ReactNode } from "react";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryCLient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
