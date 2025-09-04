import { AuthGuard } from '@/components/auth/auth-guard'
import React from 'react'

function ProtectedLayout(
    {children}: {children: React.ReactNode}
) {
  return (
    <AuthGuard>
        {children}
    </AuthGuard>
  )
}

export default ProtectedLayout
