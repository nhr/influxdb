// Libraries
import {produce} from 'immer'

// Constants
import {AUTOREFRESH_DEFAULT} from 'src/shared/constants'

// Types
import {Action} from 'src/shared/actions/autorefresh'
import {AutoRefresh, AutoRefreshStatus} from 'src/types'

export interface AutoRefreshState {
  [dashboardID: string]: AutoRefresh
}

const initialState = (): AutoRefreshState => {
  return {}
}

export const autoRefreshReducer = (state = initialState(), action: Action) =>
  produce(state, draftState => {
    switch (action.type) {
      case 'SET_AUTO_REFRESH_INTERVAL': {
        const {dashboardID, milliseconds} = action.payload

        if (!draftState[dashboardID]) {
          draftState[dashboardID] = AUTOREFRESH_DEFAULT
        }

        if (milliseconds === 0) {
          draftState[dashboardID].status = AutoRefreshStatus.Paused
        } else {
          draftState[dashboardID].status = AutoRefreshStatus.Active
        }

        draftState[dashboardID].interval = milliseconds

        return
      }

      case 'SET_AUTO_REFRESH_STATUS': {
        const {dashboardID, status} = action.payload

        if (!draftState[dashboardID]) {
          draftState[dashboardID] = AUTOREFRESH_DEFAULT
        }

        draftState[dashboardID].status = status

        return
      }
    }
  })
