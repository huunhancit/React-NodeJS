import * as UserActions from './user'
import * as AuthenActions from './authen'
import * as MessageActions from './message'


export const ActionCreators = Object.assign({},
    UserActions,
    AuthenActions,
    MessageActions
);
