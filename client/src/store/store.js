import React from 'react'
import useGlobalHook from 'use-global-hook'
import * as actions from '../actions'
import variabels from '../config/variabels'

const initialState = {
  showSpinner: false,
  showChip: false,
  showModal: false,
  showStartWeightModal: false,
  showAddComment: false,
  showCommentChip: false,
  isLoggedIn: false,
  firstLogIn: false,
  authError: '',
  viewToShow: variabels.ninjaView,
  publicViewToShow: variabels.ninjaView,
  weight: '',
  startWeight: '',
  startWeightFromDB: '',
  date: new Date(),
  records: [],
  ninjaRecords: [],
  ninjaOfTheDay: [],
  loggedInUserEmail: '',
  selectedHost: '',
  addCommentMSG: '',
  commentSender: '',
  comments: [],
  publicComments: []
}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal
