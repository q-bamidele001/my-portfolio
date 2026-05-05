'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') return;

    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router, pathname]);

  // Show login page without loading
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!session) {
    return null;
  }

  return <>{children}</>;
}