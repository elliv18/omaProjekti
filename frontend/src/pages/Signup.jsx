import React from 'react'
import '../styles/Login.css'
import { Paper, Button, Tooltip, TextField, Typography } from '@material-ui/core'
import loginStyle from '../styles/login'
import { Link } from 'react-router-dom'
import { SIGNUP_MUTATION } from '../graphql/resolvers/mutations'
import { withApollo } from 'react-apollo'
import CustomAlert from '../components/CustomAlert'

const initialState = {
    name: '',
    email: '',
    pw: '',
    pw2: '',
    loading: false,
    status: '',
    msg: '',
    errorDesc: ''
}

function Signup({ client }) {
    const [states, setStates] = React.useState(initialState)

    const classes = loginStyle()
    const { name, email, pw, pw2, msg, status, errorDesc } = states

    const handleChangeName = ({ target: { value } }) => {
        setStates({ ...states, name: value })
    }

    const handleChangeEmail = ({ target: { value } }) => {
        setStates({ ...states, email: value })

    }

    const handleChangePw = ({ target: { value } }) => {
        setStates({ ...states, pw: value })
    }

    const handleChangePw2 = ({ target: { value } }) => {
        setStates({ ...states, pw2: value })
    }

    const signup = async () => {
        console.log('email', states.email, 'pw', states.pw)
        setStates({ ...states, loading: true })
        await client.mutate({
            variables: {
                name: states.name,
                email: states.email,
                password: states.pw,
                passwordAgain: states.pw2
            },
            mutation: SIGNUP_MUTATION
        })
            .then(async res => {
                const user = res.data.signUp.user.id
                console.log(user)
                user
                    ? setStates({ ...states, status: "success", msg: "Käyttäjän luonti onnistui!" })
                    : setStates({ ...states, status: "error", msg: 'Käyttäjän luonti epäonnistui' })

            })
            .catch(e => {
                console.log(e)
                let error = e.message.replace("GraphQL error:", "").trim()
                setStates({ ...states, status: "error", msg: 'Käyttäjän luonti epäonnistui', errorDesc: error })
            })
    }

    const canSignUp = () => {
        return email.length > 0 && name.length > 0 && pw.length > 0 && pw2.length > 0
    }

    const reset = () => {
        setStates(initialState)
    }

    const disabled = !canSignUp()
    return (
        <div className="root">
            <Paper elevation={7} className={classes.paper}>
                {status
                    ? <CustomAlert status={status} msg={msg} reset={reset} error={errorDesc} />
                    : <form className="form">
                        <label>
                            <Typography variant="h4">
                                REKISTERÖIDY
                            </Typography>
                        </label>
                        <TextField
                            type="text"
                            value={name}
                            onChange={handleChangeName}
                            autoComplete="username"
                            required={true}
                            margin="normal"
                            variant="outlined"
                            label="Username"
                            fullWidth
                        />

                        <TextField
                            margin="normal"
                            type="email"
                            className="textField"
                            value={email}
                            onChange={handleChangeEmail}
                            required={true}
                            label="Email"
                            variant="outlined"
                        />
                        <TextField
                            margin="normal"

                            type="password"
                            className="textField"
                            value={pw}
                            onChange={handleChangePw}
                            autoComplete="current-password"
                            required={true}
                            label="Salasana"
                            variant="outlined"
                        />
                        <TextField
                            margin="normal"
                            type="password"
                            className="textField"
                            value={pw2}
                            onChange={handleChangePw2}
                            autoComplete="current-password"
                            required={true}
                            label="Salasana uudeleen"
                            variant="outlined"
                        />


                        <Tooltip
                            title={disabled ? "Täytä kaikki kentät rekisteröityäksesi" : ''}
                            placement="top"
                            className={classes.loginButton}
                        >
                            <span>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={signup}
                                    disabled={disabled}
                                >
                                    Sign up
                                </Button>
                            </span>
                        </Tooltip>

                    </form>}
                <hr />
                <Link to="/login">
                    Already have an account? Login
                </Link>
            </Paper>
        </div>
    )
}


export default withApollo(Signup)