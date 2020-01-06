import React from 'react'
import useGlobalHook from 'use-global-hook'
import * as actions from '../actions'
import variabels from '../config/variabels'

const initialState = {
  showSpinner: false,
  showChip: false,
  showModal: false,
  showStartWeightModal: false,
  authError: '',
  viewToShow: variabels.historyView,
  weight: '',
  startWeight: '',
  startWeightFromDB: '',
  date: new Date(),
  records: []
}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal
