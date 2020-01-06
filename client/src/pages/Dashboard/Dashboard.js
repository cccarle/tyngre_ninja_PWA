import React from 'react'
import Navbar from '../../components/navbar'
import useGlobal from '../../store/store'
import BottomNav from '../../components/bottomNav'
import AddView from '../AddView/AddView'
import variabels from '../../config/variabels'

function Dashboard() {
  const [globalState, globalActions] = useGlobal()

  function viewToShow() {
    if (globalState.viewToShow == variabels.addView) {
      return <AddView />
    }
  }

  return (
    <div className="appContainer">
      <Navbar />
      {viewToShow()}
      <BottomNav />
    </div>
  )
}

export default Dashboard
