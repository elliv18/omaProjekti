import React from 'react'
import '../styles/AppbarStyle.css'
import { Link, NavLink } from 'react-router-dom'
import { IconButton, Drawer, List, ListItem, Divider, Button, AppBar, Typography, makeStyles, Hidden, Grid } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import drawerStyle from '../styles/drawerStyle'
import Cookies from 'js-cookie'
import { setAuthStates } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { withApollo } from 'react-apollo';

const useStyles = makeStyles(theme => ({
    appbar: {
        height: 56,
    },
    root: {
        height: '100%'
    },
    logOut: {
        textAlign: 'right',
        paddingRight: theme.spacing(2)
    },
    menuButton: {
        textAlign: 'left',
        paddingLeft: theme.spacing(2)
    },
    pages: {
        textAlign: 'left',
        paddingLeft: theme.spacing(4)
    },
    link: {
        textDecoration: 'none'
    }
}));

function CustomAppBar(props) {
    const [open, setOpen] = React.useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()

    const openDrawer = () => {
        setOpen(true)
    }
    const closeDrawer = () => {
        setOpen(false)
    }
    const logOut = () => {
        Cookies.remove('jwt')
        localStorage.clear()
        dispatch(setAuthStates(false, null))
        props.client.cache.reset()
        // window.location.reload('/login');

    }

    const logOutItemXs = props.currentUser && props.currentUser.type === 'ADMIN' ? 6 : 12
    const logOutItemMd = props.currentUser && props.currentUser.type === 'ADMIN' ? 3 : 12

    return (
        <div>
            <AppBar position="static" className={classes.appbar}>
                <Grid container alignItems="center" justify="center" className={classes.root}>
                    <Hidden smUp>
                        {props.currentUser && props.currentUser.type === 'ADMIN' ?
                            < Grid item xs={6} className={classes.menuButton}>
                                <IconButton
                                    edge="start"

                                    color="inherit"
                                    aria-label="menu"
                                    onClick={openDrawer}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            : null
                        }
                    </Hidden>

                    {props.currentUser
                        ? props.currentUser.type === 'ADMIN'
                            ? <Hidden xsDown>
                                <Grid item xs={6} sm={9} className={classes.pages}>
                                    {props.authenticated
                                        ? <React.Fragment>
                                            <Link to="/" className={classes.link}>
                                                <Button>
                                                    Home
                                                </Button>
                                            </Link>
                                            <Link to="/artists" className={classes.link}>
                                                <Button>
                                                    Artists
                                                </Button>
                                            </Link>
                                            <Link to="/vinyls" className={classes.link}>
                                                <Button>
                                                    Vinyls
                                                </Button>
                                            </Link>
                                            <Link to="/categories" className={classes.link}>
                                                <Button >
                                                    Categories
                                                </Button>
                                            </Link>
                                        </React.Fragment>
                                        : null}
                                </Grid>
                            </Hidden>
                            : null
                        : null}


                    <Grid item xs={logOutItemXs} sm={logOutItemMd} className={classes.logOut}>
                        {props.authenticated
                            ? <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => logOut()}
                            >
                                Log out
                        </Button>
                            : null}
                    </Grid>
                </Grid>
            </AppBar>
            <div className="content">
                {props.children}
            </div>
            <CustomDrawer open={open} handleClose={closeDrawer} />

        </div >
    )
}

export default withApollo(CustomAppBar)




function CustomDrawer(props) {
    const classes = drawerStyle()
    return (

        <Drawer
            variant="temporary"
            classes={{
                paper: classes.drawerPaper,
            }}
            open={props.open}
            onClose={props.handleClose}
            onClick={props.handleClose}
        >

            <div style={{ height: 56, backgroundColor: 'red' }}>
                PAGES
            </div>

            <List>

                <ListItem component={NavLink} to="/" button={true}>
                    <Typography variant="h6">
                        Home
                    </Typography>
                </ListItem>

                <Divider />

                <ListItem component={NavLink} to="/artists" button={true}>
                    <Typography variant="h6">
                        Artists
                    </Typography>
                </ListItem>

                <Divider />

                <ListItem component={NavLink} to="/vinyls" button={true}>
                    <Typography variant="h6">
                        Vinyls
                    </Typography>
                </ListItem>
                <Divider />

                <ListItem component={NavLink} to="/categories" button={true}>
                    <Typography variant="h6">
                        Categories
                    </Typography>
                </ListItem>
                <Divider />


            </List>
        </Drawer>

    )
}

