import React from 'react'

async function UserDetails({params} : {params: Promise<{ id: string}>}) {
    const { id } = await params; // page params

  return (
    
    <div>
      <h1>Showind Details for user #{id}</h1>
    </div>
  )
}

export default UserDetails
