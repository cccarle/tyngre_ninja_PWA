import React, { useEffect } from 'react'
import {
  fetchRecords,
  fetchStartWeight,
  listenForNinjaRecords
} from '../../actions'
import Navbar from '../../components/navbar'
import useGlobal from '../../store/store'
import PublicBottomNav from '../../components/publicBottomNav'
import AddView from '../AddView/AddView'
import HistoryView from '../HistoryView/HistoryView'
import NinjaOfTheDayView from '../NinjaOfTheDayView/NinjaOfTheDayView'
import AddCommentView from '../AddCommentView/AddCommentView'
import CommentChip from '../../components/commentChip'

import ErrorModal from '../../components/errorModal'
import StartWeightModal from '../../components/startWeightModal'
import variabels from '../../config/variabels'
import CommentsView from './CommentsView'

function Dashboard() {
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    globalActions.fetchPublicComments(globalState, globalActions)
  }, [])

  function viewToShow() {
    if (globalState.publicViewToShow == variabels.addCommentView) {
      return <AddCommentView />
    }

    if (globalState.publicViewToShow == variabels.ninjaView) {
      return <NinjaOfTheDayView />
    }

    if (globalState.publicViewToShow == variabels.commentView) {
      return <CommentsView />
    }
  }

  return (
    <div className="appContainer">
      <Navbar />
      {viewToShow()}
      <PublicBottomNav />
      <CommentChip />
    </div>
  )
}

export default Dashboard
