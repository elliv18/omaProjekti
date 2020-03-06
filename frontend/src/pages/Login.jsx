import React from 'react'
import Paper from '@material-ui/core/Paper';
import '../styles/Login.css'
import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import loginStyle from '../styles/login';
import { withApollo } from "react-apollo";
import { LOGIN_MUTATION } from '../graphql/resolvers/mutations';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import { useDispatch, useSelector } from 'react-redux'
import { setAuthStates } from '../redux/actions';
import { GET_CURRENT_USER } from '../graphql/resolvers/queries';
import { withRouter } from 'react-router';

const initialStates = {
    email: '',
    pw: '',
    errorMsg: null
}
function Login({ client, history }) {
    const [states, setStates] = React.useState(initialStates)
    const classes = loginStyle()
    const dispatch = useDispatch()
    const CU = useSelector(state => state.authReduser.currentUser)

    React.useEffect(() => {
        if (CU) {
            history.push('/')
        }
    })

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
                        console.log('CU RES', res.data)
                        const cu = res.data.getCurrentUser
                        dispatch(setAuthStates(true, cu))
                        history.push('/')

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
            {states.errorMsg
                ? <CustomAlert msg={states.errorMsg} status="error" isLogin={true} />
                : null}
            <Paper elevation={7} className={classes.paper}>
                <Typography variant="h4" style={{ padding: 20 }}>
                    Kirjaudu Sisään
                    </Typography>
                <form>
                    <FormControl fullWidth>
                        <TextField
                            type="text"
                            className="textField"
                            value={states.email}
                            onChange={handleUsername}
                            autoComplete="username"
                            variant="outlined"
                            margin="normal"
                            label="Sähköposti"
                        />
                        <TextField
                            type="password"
                            className="textField"
                            value={states.pw}
                            onChange={handlePW}
                            autoComplete="current-password"
                            variant="outlined"
                            margin="normal"
                            label="Salasana"
                        />
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={login}
                            disabled={disabled}
                        >
                            Kirjaudu sisään
                    </Button>

                        <Link to="signUp" className={classes.link}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="default"
                            >
                                Rekisteröidy
                        </Button>
                        </Link>

                    </FormControl>
                </form>
            </Paper>
        </div>
    )
}

export default withRouter(withApollo(Login))

