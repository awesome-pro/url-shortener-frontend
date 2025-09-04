import { Navbar } from '@/components/layout/navbar'
import React from 'react'

function PublicLayout(
    {children}: {children: React.ReactNode}
) {
  return (
    <main>
        <Navbar />
        {children}
    </main>
  )
}

export default PublicLayout
