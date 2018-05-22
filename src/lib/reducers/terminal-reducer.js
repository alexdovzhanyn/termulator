import { USER_KEY_PRESS } from '../actions/constants/terminal-constants'

const initialState = {
  userKeysInput: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_KEY_PRESS:
      return {
        ...state,
        userKeysInput: state.userKeysInput.concat(action.key)
      }
    default:
      return state
  }
}
