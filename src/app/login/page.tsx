'use client'
import Link from 'next/link'
import React from 'react'

function Login() {
  return (
    <div>
        Login
        <Link href={`/signup`}>Signup</Link>
    </div>
  )
}

export default Login