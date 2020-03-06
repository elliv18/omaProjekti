import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({ componentUser: ComponentUser, componentAdmin: ComponentAdmin, CU, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            CU
                ? CU.type === 'ADMIN'
                    ? <ComponentAdmin {...props} />
                    : ComponentUser
                        ? <ComponentUser {...props} />
                        : <Redirect to='/' />
                : <Redirect to='/login' />
        )
        } />
    )
}

export default PrivateRoute