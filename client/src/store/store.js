import React from 'react'
import useGlobalHook from 'use-global-hook'
import * as actions from '../actions'
import variabels from '../config/variabels'

const initialState = {
  showSpinner: false,
  authError: '',
  viewToShow: ''
}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal
