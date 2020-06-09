import { makeStyles } from "@material-ui/core";


const drawerStyle = makeStyles(theme => ({
    drawerPaper: {
        width: 240,
    },
    header: {
        height: 56,
        backgroundColor: theme.palette.primary.main
    },
    list: {
        backgroundColor: theme.palette.footer.main,
        height: '100%'
    },
    logOutButton: {
        width: '90%',
        margin: theme.spacing(1)
    }
}))

export default drawerStyle