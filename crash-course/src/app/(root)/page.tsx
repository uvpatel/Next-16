"use client";

import Link from "next/link";
// Data Fetching
// servercomponentcatch 


function Home() {
  return (
    <div>
      <h1 className="text-blue-200 ">Hello</h1>
      <Link href="/about">About</Link>
    </div>
  )
}

export default Home
