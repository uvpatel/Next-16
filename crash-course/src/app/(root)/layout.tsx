import Navbar from '@/components/Navbar'
import React from 'react'

function Layout({children} : {children : React.ReactNode}) {
  return (
    <div>
      Main Navbar
      {children}
    </div>
  )
}

export default Layout
