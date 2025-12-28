"use client";

import Link from 'next/link';
import React from 'react'

function User() {
  return (
    <div>
        <h1>Dashboard Users</h1>

        <ul className="mt-10">
            <li><Link href="/dashboard/users/1">User 1</Link></li>
            <li><Link href="/dashboard/users/2">User 2</Link></li>
            <li><Link href="/dashboard/users/3">User 3</Link></li>
        </ul>
    </div>
  )
}

export default User
