import React from 'react'
import { Typography, makeStyles, ExpansionPanel, ExpansionPanelSummary, Grid, Tooltip, TextField, Select, ExpansionPanelDetails, MenuItem } from '@material-ui/core'
import { withApollo } from 'react-apollo';
import { ALL_FOR_SALE } from '../../graphql/resolvers/queries';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '@material-ui/core/CircularProgress';
import helpers from '../../helpers';

const Styles = makeStyles(theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.secondary.main,
            outline: '1px solid slategrey'
        }
    },
    expansionPanel: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    },
    content: {
        [theme.breakpoints.up('sm')]: {

            position: 'absolute',
            top: 55, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            backgroundColor: 'lightGrey',
        },
        [theme.breakpoints.down('sm')]: {

            padding: 6,
            position: 'absolute',
            top: 55, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            backgroundColor: 'lightGrey',
        }
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            top: 8,
            left: 8,
            fontSize: 24
        },
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
            height: 39,
            width: 120,
            position: 'absolute',
            top: 8,
            left: 'calc(50vh + 120px)',
            fontSize: 30
        }
    },
    add: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        // color: 'green'
    },
    infiniteScroll: {
        width: '100%',
        padding: theme.spacing(1)
    },
    header: {
        // position: 'relative',
        height: 55,
        backgroundColor: 'grey',

    },
    search: {
        position: 'absolute',
        right: 16,
        bottom: 8,
    },

    right: {
        textAlign: 'right'
    },
    center: {
        textAlign: 'center'
    },



}))
function UserView(props) {

    const [data, setData] = React.useState([])
    /* const [states, setStates] = React.useState({
         sortBy: "createdAt_DESC",
     })*/

    const fetch = React.useCallback(() => {
        props.client.query({
            query: ALL_FOR_SALE
        })
            .then(res => {
                console.log(res.data)
                setData(res.data.allForSale)
            })
            .catch(e => console.log(e))
    }, [props.client])

    React.useEffect(() => {
        fetch()
    }, [fetch])

    const classes = Styles()
    return (
        <div>
            <div className={classes.header}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={7}>
                        <Tooltip title="Kirjoita vähintään 3 kirjainta hakeaksesi" arrow placement="bottom">
                            <TextField
                                fullWidth
                                margin="dense"
                                InputProps={{ classes: { input: classes.input1 } }}
                                //  onChange={handleSearch}
                                variant="outlined"
                                placeholder="Search..."
                            />
                        </Tooltip>
                    </Grid>


                    <Grid item xs={5} className={classes.right}>
                        <Select
                            value={"createdAt_DESC"}
                        //   onChange={handleSort}
                        >
                            <MenuItem value={"createdAt_DESC"}>Uusin (lisätty)</MenuItem>
                            <MenuItem value={"createdAt_ASC"}>Vanhin (lisätty)</MenuItem>
                            <MenuItem value={"year_ASC"}>Vanhin levy</MenuItem>
                            <MenuItem value={"year_DESC"}>Uusin levy</MenuItem>
                            <MenuItem value={"name_ASC"}>Nimi (a-ö)</MenuItem>
                            <MenuItem value={"name_DESC"}>Nimi (ö-a)</MenuItem>
                            <MenuItem value={"forSale_DESC"}>Myynnissä</MenuItem>

                        </Select>
                    </Grid>
                </Grid>

            </div>
            <div className={classes.content}>
                <InfiniteScroll
                    className={classes.infiniteScroll}
                    height={'calc(100vh - 125px)'}
                    dataLength={data.length}
                    // next={onFetchMore}
                    //hasMore={hasMore}
                    loader={<div style={{ textAlign: 'center' }}><LoadingSpinner /></div>}

                    endMessage={
                        <Typography variant="h6">
                            Jee, kaikki artistit on jo listattu
                        </Typography>
                    }
                >
                    {data.map((row, i) => {

                        return (
                            <ExpansionPanel elevation={3} key={i} className={classes.expansionPanel}>
                                <ExpansionPanelSummary
                                    className={classes.test}
                                    expandIcon={<ExpandMoreIcon />}
                                >

                                    <Grid container>
                                        <Grid item md={9} xs={12}>
                                            <Typography variant="h6" >
                                                {row.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3} xs={12}>
                                            <Typography variant="h6" >
                                                <b>Hinta Yht.</b> {row.priceTotal}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                    <Grid container>
                                        {row.vinyls.map((vinyl, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <Grid item md={2} xs={12}>
                                                        <Typography variant="h6">
                                                            <b>Levy {i + 1}: </b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={8} xs={12}>
                                                        <Typography variant="h6">
                                                            {vinyl.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={2} xs={12}>
                                                        <Typography variant="h6">
                                                            <b>Hinta: </b> {row.pricePcs} €
                                                        </Typography>
                                                    </Grid>

                                                    {vinyl.artists.map((artist, i) => {
                                                        const name = helpers.Capitalize(artist.firstName) + " " + helpers.Capitalize(artist.lastName)

                                                        return (
                                                            <React.Fragment key={i}>
                                                                <Grid item md={2} xs={12}>
                                                                    <Typography variant="h6">
                                                                        <b>Artisti(t)</b>
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item md={10} xs={12} >
                                                                    <Typography variant="h6">
                                                                        {name}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12} style={{ borderBottom: '2px solid black', paddingTop: 10, paddingBottom: 10 }} />

                                                            </React.Fragment>
                                                        )
                                                    })}

                                                </React.Fragment>

                                            )
                                        })}
                                    </Grid>
                                </ExpansionPanelDetails>

                            </ExpansionPanel>

                        )
                    })}
                </InfiniteScroll>
            </div>
        </div>
    )


}

export default withApollo(UserView)


