import React, { PureComponent } from 'react'
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core';
import { AdminView, UserView } from '../components/home'
const useStyles = {
    root: {
        width: '100%',
        minHeight: '100%',
        margin: 'auto',
        position: 'relative'
    },

}

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.userType = null
    }

    state = {
        error: false,
        username: '',
        password: '',
        loading: false,
    };



    render() {
        console.log('HOME', this.props.currentUser)

        const { classes, currentUser } = this.props
        this.userType = currentUser ? currentUser.type : null

        return (
            <div className={classes.root}>
                {this.userType === 'ADMIN'
                    ? <AdminView />
                    : this.userType === 'USER'
                        ? <UserView />
                        : null}
            </div>
        )
    }
}

export default withStyles(useStyles)(withApollo(Home))



