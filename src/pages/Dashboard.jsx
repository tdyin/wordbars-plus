import React from 'react'
import '../styles/dashboard.css'
import Navbar from '../components/Navbar'
import SearchView from '../components/SearchView'
import Words from '../components/Words'

function Dashboard() {
  return (
    <div className='dashboard'>
      <nav>
        <Navbar />
      </nav>
      <main>
        <SearchView />
      </main>
      <aside>
        <Words />
      </aside>
    </div>
  )
}

export default Dashboard
