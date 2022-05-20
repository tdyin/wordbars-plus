import React from 'react'
import { useSelector } from 'react-redux'
function SearchResults() {
  const { query } = useSelector((state) => state.query)
  let str = query.join('+')
  return (
    <div style={{ height: '100%' }}>
      <iframe
        title='Google'
        width='100%'
        height='100%'
        src={`https://www.google.com/search?igu=1&q=${str}`}
      ></iframe>
    </div>
  )
}

export default SearchResults
