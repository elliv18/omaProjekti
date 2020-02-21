import React, { PureComponent } from 'react'
import { withApollo } from 'react-apollo';
import API from '../services/api'
import { Button } from '@material-ui/core';

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
    };


    render() {
        console.log(this.props.authenticated)

        return (
            <div>
                <div>Home</div>
                <Button variant="contained" onClick={() => {
                    API.logout()
                    this.props.setAuth(false)
                }}
                >
                    logout
                </Button>
            </div>
        )
    }
}

export default withApollo(Home)