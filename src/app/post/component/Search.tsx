// This is a Client Component, so we can use `useRouter` here
'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const SearchComponent = () => {
  const router = useRouter()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    // You can navigate or handle the search query here
    router.push(`/search?query=${query}`)
  }

  return (
    <input
      type='text'
      placeholder='Search...'
      onChange={handleSearch}
      className='py-1 px-3 w-full border border-slate-400 text-slate-400 rounded-md'
    />
  )
}

export default SearchComponent
