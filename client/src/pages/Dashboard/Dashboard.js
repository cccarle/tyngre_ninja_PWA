import React, { useEffect } from 'react'
import {
  fetchRecords,
  fetchStartWeight,
  listenForNinjaRecords
} from '../../actions'
import Navbar from '../../components/navbar'
import useGlobal from '../../store/store'
import BottomNav from '../../components/bottomNav'
import AddView from '../AddView/AddView'
import HistoryView from '../HistoryView/HistoryView'
import NinjaOfTheDayView from '../NinjaOfTheDayView/NinjaOfTheDayView'
import Chip from '../../components/succsChip'
import ErrorModal from '../../components/errorModal'
import StartWeightModal from '../../components/startWeightModal'
import variabels from '../../config/variabels'

function Dashboard() {
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    fetchRecords(globalState, globalActions)
    fetchStartWeight(globalState, globalActions)
    listenForNinjaRecords(globalState, globalActions)
  }, [])

  function viewToShow() {
    if (globalState.viewToShow == variabels.addView) {
      return <AddView />
    }

    if (globalState.viewToShow == variabels.historyView) {
      return <HistoryView />
    }

    if (globalState.viewToShow == variabels.ninjaView) {
      return <NinjaOfTheDayView />
    }
  }

  return (
    <div className="appContainer">
      <Navbar />
      {viewToShow()}
      <Chip />
      <ErrorModal />
      <StartWeightModal />
      <BottomNav />
    </div>
  )
}

export default Dashboard
