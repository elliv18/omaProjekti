import React from 'react'
import { useQuery } from 'react-apollo'
import { ALL_VINYLS } from '../graphql/resolvers/queries'
import Loading from '../components/Loading'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, ExpansionPanelActions, Button, Grid, makeStyles } from '@material-ui/core';
import { Fade, Stagger } from 'react-animation-components'

const styles = makeStyles(theme => ({
    expansionPanel: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    },
    content: {
        [theme.breakpoints.up('sm')]: {

            padding: 20,
            position: 'absolute',
            top: 42, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            backgroundColor: 'lightGrey',
        },
        [theme.breakpoints.down('sm')]: {

            padding: 6,
            position: 'absolute',
            top: 42, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            backgroundColor: 'lightGrey',
        }
    },
    title: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'grey'
    },
}))
const Vinyls = React.memo(function Vinyls(props) {
    const { loading, error, data } = useQuery(ALL_VINYLS)
    const classes = styles()

    if (loading) { return <Loading open={true} /> }
    console.log(data)
    if (error) {
        console.log(error)
    }

    return (
        <div>
            <div className={classes.title}>
                <Typography variant="h5" >
                    Myytävät tuotteet
                </Typography>
            </div>
            <div className={classes.content}>
                {data.allVinyls.map(row => {
                    return (
                        <Stagger in chunk={7} key={row.id} duration={500}>
                            <Fade>
                                <ExpansionPanel elevation={3} className={classes.expansionPanel}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography variant="h5">{row.name}</Typography>
                                    </ExpansionPanelSummary>

                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <Grid item xs={12} md={4}>
                                                <Typography variant="subtitle1">
                                                    <b>Tyyppi:</b> {row.type}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Typography variant="subtitle1">
                                                    <b>Kunto: </b>{row.condition}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Typography variant="subtitle1">
                                                    <b>Kategoria: </b>  {row.category.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <br />

                                                <Typography variant="subtitle1">
                                                    <b>Artistit: </b>
                                                    {row.artists.map((artist, i) => {
                                                        const a = i + 1 === row.artists.length ? artist.name : artist.name + ", "
                                                        return (a)
                                                    })}
                                                </Typography>
                                                <hr />

                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelActions>
                                        <Button fullWidth variant="outlined" color="secondary">Poista</Button>
                                        <Button fullWidth variant="outlined" color="primary">Myyntiin</Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            </Fade>
                        </Stagger>
                    )
                })}
            </div>
        </div>
    )
})

export default Vinyls