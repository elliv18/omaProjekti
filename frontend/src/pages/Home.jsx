import React, { PureComponent } from 'react'
import { withApollo } from 'react-apollo';
import API from '../services/api'
import { Button, Paper, withStyles, Typography } from '@material-ui/core';
import { AdminView, UserView } from '../components/home'
const useStyles = {
    root: {
        width: '100%',
        minHeight: '100%',
        margin: 'auto',
        padding: 8,
        position: 'relative'
    },
    welcome: {
        textAlign: 'center',
        padding: 10
    }
}

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.enterListener = ({ key }) => {
            if (key === 'Enter' && this.canLogin()) {
                this.login();
            }
        };
    }

    state = {
        error: false,
        username: '',
        password: '',
        loading: false,
        userType: this.props.currentUser.userType
    };


    render() {
        const { classes, currentUser } = this.props
        const { userType } = this.state
        console.log(this.props.authenticated)

        return (
            <Paper elevation={7} className={classes.root}>
                {userType === 'ADMIN'
                    ? <AdminView />
                    : <UserView />}
            </Paper>
        )
    }
}

export default withStyles(useStyles)(withApollo(Home))



