import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      {children}
    </Stack>
  );
}
