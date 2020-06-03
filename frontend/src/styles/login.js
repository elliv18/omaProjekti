import { makeStyles } from "@material-ui/core";


const loginStyle = makeStyles(theme => ({
    loginButton: {
        marginTop: 50
    },
    paper: {
        padding: 20,
        // backgroundColor: theme.palette.loginBack.main

    },
    link: {
        //  textDecoration: 'none',
        marginTop: theme.spacing(3),
    }
}))

export default loginStyle