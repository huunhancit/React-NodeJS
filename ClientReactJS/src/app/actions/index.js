import * as UserActions from './user'
import * as AuthenActions from './authen'


export const ActionCreators = Object.assign({},
    UserActions,
    AuthenActions
);
