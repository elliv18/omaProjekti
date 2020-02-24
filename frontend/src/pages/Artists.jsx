import React from 'react'
import { useQuery, withApollo } from 'react-apollo'
import { ALL_ARTISTS } from '../graphql/resolvers/queries'
import Loading from '../components/Loading'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, ExpansionPanelActions, Button, Grid, makeStyles, IconButton, TextField, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = makeStyles(theme => ({
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
    header: {
        position: 'relative',
        height: 55,
        backgroundColor: 'grey',

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
    expanded: {
        backgroundColor: 'lightBlue',
    },
    gridLeft: {
        textAlign: 'left'
    },
    gridRight: {
        textAlign: 'right',
    },
    search: {
        position: 'absolute',
        right: 16,
        bottom: 8,
    },
    input1: {
        height: 2
    },
    infiniteScroll: {
        width: '100%',
        padding: theme.spacing(1)
    }

}))

const Artists = React.memo(function Artists(props) {
    /* const { loading, error, data, fetchMore } = useQuery(ALL_ARTISTS, {
         variables: {
             first: 20
         },
         fetchPolicy: "cache-and-network",
         notifyOnNetworkStatusChange: true
 
     })*/
    const [data, setData] = React.useState([])
    const [hasMore, setHasMore] = React.useState(true)
    const [showData, setShowData] = React.useState([])
    const classes = styles()

    const fetch = async () => {
        console.log('Fetch')
        await props.client.query({
            query: ALL_ARTISTS,
            variables: {
                first: 30,
            },
        })
            .then(res => {
                setData(res.data.allArtists)
            })
    }
    React.useEffect(() => {
        fetch()
    }, [])

    if (data.length === 0) { return <Loading open={true} /> }
    /*  if (error) {
          console.log(error)
      }*/



    const handleSearch = ({ target: { value } }) => {
        /*  let newList = data.allArtists.filter(filter => {
              return filter.name.toLowerCase().includes(value)
          })*/

        if (value.length >= 3) {
            props.client.query({
                query: ALL_ARTISTS,
                variables: {
                    filter: value
                }
            })
                .then(res => {
                    const data2 = res.data.allArtists
                    console.log(data2)
                    if (data2.length > 0)
                        setData(data2)
                })
                .catch(e => console.log(e))
        }

    }


    const onFetchMore = () => {
        props.client.query({
            query: ALL_ARTISTS,
            variables: {
                first: 30,
                after: data[data.length - 1].id
            }
        })
            .then(res => {

                let temp = data.slice()
                const data2 = res.data.allArtists
                console.log(data2)
                temp.push(...data2)
                setData(temp)
                if (data2.length === 0)
                    setHasMore(false)
            })
    }

    console.log('length', data.length)
    return (
        <div>
            <div className={classes.header}>
                <Typography className={classes.title}>
                    Artistit
                </Typography>
                <Tooltip title="Kirjoita vähintään 3 kirjainta hakeaksesi" arrow placement="left">
                    <TextField
                        className={classes.search}
                        InputProps={{ classes: { input: classes.input1 } }}
                        onChange={handleSearch}
                        variant="outlined"
                        placeholder="Search..."
                    />
                </Tooltip>


            </div>
            <div className={classes.content} >

                <InfiniteScroll
                    className={classes.infiniteScroll}
                    height={'calc(100vh - 111px)'}
                    dataLength={data.length}
                    next={onFetchMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    refreshFunction={fetch}
                    pullDownToRefresh
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                    endMessage={
                        <Typography variant="h6">
                            Jee, kaikki artistit on jo listattu
                        </Typography>
                    }
                >
                    {data.map((row, i) => {

                        return (

                            <ExpansionPanel key={i} classes={{ expanded: classes.expanded }} elevation={3} className={classes.expansionPanel}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item xs={2} className={classes.gridLeft}>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={10} className={classes.gridLeft}>
                                            <Typography variant="h5">{row.name + " " + i}</Typography>
                                        </Grid>
                                    </Grid>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        {row.vinyls.map((vinyl, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1">
                                                            <b>Levyn nimi: </b>                                                            {i + 1 === row.vinyls.length ? vinyl.name : vinyl.name + ", "}
                                                            {i + 1 === row.vinyls.length ? vinyl.name : vinyl.name + ", "}

                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="subtitle1">
                                                            <b>Levyn tyyppi</b>  {vinyl.type}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1">

                                                            <b>Kategoria</b> {vinyl.category.name}
                                                        </Typography>
                                                    </Grid>
                                                    <hr />
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
})

export default withApollo(Artists)

/*
*/