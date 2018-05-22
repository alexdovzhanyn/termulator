import { USER_KEY_PRESS } from './constants/terminal-constants'

const userKeyPress = key => {
  return {
    type: USER_KEY_PRESS,
    key
  }
}

export {
  userKeyPress
}
