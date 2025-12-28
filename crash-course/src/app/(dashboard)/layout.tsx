import React from 'react'

function Layout({children} : {children : React.ReactNode}) {
  return (
    <div>
      <p>Dashboard Navbar</p>
      {children}
    </div>
  )
}

export default Layout
