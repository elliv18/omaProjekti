import React from 'react'
import '../styles/AppbarStyle.css'
import { Link, NavLink } from 'react-router-dom'
import { IconButton, Drawer, List, ListItem, Divider, Button, AppBar, Typography, makeStyles, Hidden, Grid, Tooltip } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import drawerStyle from '../styles/drawerStyle'
import Cookies from 'js-cookie'
import { setAuthStates } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { withApollo } from 'react-apollo';

import HomeIcon from '@material-ui/icons/Home';
import AlbumIcon from '@material-ui/icons/Album';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import LogOutIcon from '@material-ui/icons/ExitToAppOutlined';

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
                            < Grid item xs={12} className={classes.menuButton}>
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
                                                <Tooltip title="Siirry etusivulle">
                                                    <IconButton>
                                                        <HomeIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <Link to="/artists" className={classes.link}>
                                                <Tooltip title="Artistit">
                                                    <IconButton>
                                                        <PeopleIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <Link to="/vinyls" className={classes.link}>
                                                <Tooltip title="Levyt">
                                                    <IconButton>
                                                        <AlbumIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <Link to="/categories" className={classes.link}>
                                                <Tooltip title="Kategoriat">
                                                    <IconButton >
                                                        <CategoryIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                        </React.Fragment>
                                        : null}
                                </Grid>
                            </Hidden>
                            : null
                        : null}


                    <Hidden xsDown>
                        <Grid item sm={logOutItemMd} className={classes.logOut}>
                            {props.authenticated
                                ? <Tooltip title="Kirjaudu ulos">
                                    <IconButton
                                        onClick={() => logOut()}
                                    >
                                        <LogOutIcon />
                                    </IconButton>
                                </Tooltip>
                                : null}
                        </Grid>
                    </Hidden>
                </Grid>
            </AppBar>
            <div className="content">
                {props.children}
            </div>
            <CustomDrawer open={open} handleClose={closeDrawer} logOut={logOut} />

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

            <div className={classes.header}>
                <Button variant="contained" onClick={props.logOut} className={classes.logOutButton} color="default">
                    <LogOutIcon style={{ marginRight: '3px' }} />
                    Kirjaudu ulos
                </Button>
            </div>

            <List className={classes.list}>

                <ListItem component={NavLink} to="/" button={true}>
                    <Grid container>
                        <Grid item xs={3}>
                            <HomeIcon />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1">
                                Etusivu
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>

                <Divider />

                <ListItem component={NavLink} to="/artists" button={true}>
                    <Grid container>
                        <Grid item xs={3}>
                            <PeopleIcon />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1">
                                Artistit
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>

                <Divider />

                <ListItem component={NavLink} to="/vinyls" button={true}>
                    <Grid container>
                        <Grid item xs={3}>
                            <AlbumIcon />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1">
                                Levyt
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider />

                <ListItem component={NavLink} to="/categories" button={true}>
                    <Grid container>
                        <Grid item xs={3}>
                            <CategoryIcon />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1">
                                Kategoriat
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider />


            </List>
        </Drawer>

    )
}

