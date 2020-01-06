import React from 'react'
import useGlobalHook from 'use-global-hook'
import * as actions from '../actions'
import variabels from '../config/variabels'

const initialState = {
  showSpinner: false,
  showChip: false,
  showModal: false,
  authError: '',
  viewToShow: variabels.addView,
  weight: '',
  date: ''
}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal
