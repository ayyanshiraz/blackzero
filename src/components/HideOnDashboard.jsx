'use client';

import { usePathname } from 'next/navigation';

export default function HideOnDashboard({ children }) {
  const pathname = usePathname();
  
  // Check if the current URL starts with /dashboard
  const isDashboard = pathname?.startsWith('/dashboard');

  // If we are on the dashboard, render absolutely nothing (hide the children)
  if (isDashboard) {
    return null;
  }

  // Otherwise, render the children (Header/Footer) normally
  return <>{children}</>;
}