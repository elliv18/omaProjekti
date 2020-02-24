import React from 'react'
import Paper from '@material-ui/core/Paper';
import '../styles/Login.css'
import { Button } from '@material-ui/core';
import loginStyle from '../styles/login';
import { withApollo } from "react-apollo";
import { LOGIN_MUTATION } from '../graphql/resolvers/mutations';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import { useDispatch } from 'react-redux'
import { setAuthStates } from '../redux/actions';
import { GET_CURRENT_USER } from '../graphql/resolvers/queries';


const initialStates = {
    email: '',
    pw: '',
    errorMsg: null
}
function Login({ client }) {
    const [states, setStates] = React.useState(initialStates)
    const classes = loginStyle()
    const dispatch = useDispatch()

    const handleUsername = ({ target: { value } }) => {
        console.log(value)
        setStates({ ...states, email: value })
    }
    const handlePW = ({ target: { value } }) => {
        setStates({ ...states, pw: value })
    }

    const login = async () => {
        await client.mutate({
            variables: {
                email: states.email,
                password: states.pw
            },
            mutation: LOGIN_MUTATION
        })
            .then(async res => {
                const jwt = res.data.logIn.jwt
                Cookies.set('jwt', jwt)

            })
            .catch(e => {
                console.log(e)
                let error = e.message.replace("GraphQL error:", "").trim()
                setStates({ ...states, errorMsg: error, email: '', pw: '' })
            })
            .finally(async () => {
                await client.query({
                    query: GET_CURRENT_USER
                })
                    .then(res => {
                        const cu = res.data.getCurrentUser
                        dispatch(setAuthStates(true, cu))
                    })
                    .catch(e => console.log(e))
            })
    }

    const canLogin = () => {
        return states.email.length > 0 && states.pw.length > 0
    }


    const disabled = !canLogin()
    return (

        <div className="root">
            <Paper elevation={7} className={classes.paper}>
                {states.errorMsg
                    ? <CustomAlert msg={states.errorMsg} status="error" isLogin={true} />
                    : null}
                <form className="form">
                    <label >
                        <strong className="labelText">Username</strong>
                        <input
                            type="text"
                            className="textField"
                            value={states.email}
                            onChange={handleUsername}
                            autoComplete="username"
                        />
                    </label>
                    <label >
                        <strong className="labelText">Password</strong>
                        <input
                            type="password"
                            className="textField"
                            value={states.pw}
                            onChange={handlePW}
                            autoComplete="current-password"
                        />
                    </label>
                    <Button
                        className={classes.loginButton}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={login}
                        disabled={disabled}
                    >
                        click

                        </Button>
                </form>
                <hr />
                <div >
                    <Link to="/signup">
                        Don't have an account? Sign up
                    </Link>
                </div>
            </Paper>
        </div>
    )
}

export default withApollo(Login)