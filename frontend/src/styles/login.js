import { makeStyles } from "@material-ui/core";


const loginStyle = makeStyles(theme => ({
    loginButton: {
        marginTop: 50
    },
    paper: {
        padding: 20,
        backgroundColor: theme.palette.loginBack.main

    },
    link: {
        textDecoration: 'none',
        color: 'white',
        marginTop: theme.spacing(7),
    }
}))

export default loginStyle