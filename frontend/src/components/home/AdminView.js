import React from 'react'
import { Typography, Grid, makeStyles } from '@material-ui/core'
import { withApollo } from 'react-apollo'
import Loading from '../Loading';
import { GET_COUNTS } from '../../graphql/resolvers/queries';
//import backgroundImage from '../../pictures/background.jpg'

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 56px)',
        // backgroundImage: `url(${backgroundImage})`
        //backgroundColor: theme.palette.background.main
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: theme.palette.footer.main
    },
    center: {
        textAlign: 'center'
    },
    right: {
        textAlign: 'right'
    },
    content: {
        position: 'fixed',
        top: 66,
        bottom: 102,
        left: 10,
        right: 10,
    },
    card: {
        width: '70%',
        margin: 'auto',
        marginTop: theme.spacing(3),

    }

}))
function AdminView(props) {

    const classes = styles()
    const [states, setStates] = React.useState({
        counts: {},
        loading: true
    })
    React.useEffect(() => {
        const { client, } = props;

        client.query({
            query: GET_COUNTS
        })
            .then(res => {
                const data = res.data.getCounts
                setStates(state => ({ ...state, counts: data, loading: false }))
            })
            .catch(e => console.log(e))
    }, [])

    const { counts, loading } = states
    const { CU } = props

    console.log('DATA', counts, CU)
    return (
        <div className={classes.root}>
            <Loading open={loading} />
            <div elevation={7} className={classes.content}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" className={classes.center}>
                            Tervetuloa {CU.name}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.card}>
                        <hr />

                        <Typography variant="h6" className={classes.center}>
                            Tietotokannassa on tallennettuna:
                            </Typography>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={12} className={classes.center}>
                                <Typography variant="subtitle1">
                                    Levyjä: {counts.vinylCount}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} className={classes.center}>
                                <Typography variant="subtitle1">
                                    Artisteja: {counts.artistCount}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} className={classes.center}>
                                <Typography variant="subtitle1">
                                    Kategorioita: {counts.categoryCount}
                                </Typography>
                            </Grid>



                        </Grid>

                    </Grid>

                </Grid>
            </div>

            <footer className={classes.footer}>
                <Typography variant="body1">My sticky footer can be found here.</Typography>
                <Copyright />
            </footer>
        </div>
    )
}

export default withApollo(AdminView)

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}

            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}