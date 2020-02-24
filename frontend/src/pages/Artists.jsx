import React from 'react'
import { useQuery, withApollo } from 'react-apollo'
import { ALL_ARTISTS } from '../graphql/resolvers/queries'
import Loading from '../components/Loading'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, ExpansionPanelActions, Button, Grid, makeStyles, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfiniteScroll from 'react-infinite-scroll-component';

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
            top: 40, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            backgroundColor: 'lightGrey',
        },
        [theme.breakpoints.down('sm')]: {

            padding: 6,
            position: 'absolute',
            top: 40, bottom: 0, right: 0, left: 0,
            overflow: 'auto',
            backgroundColor: 'lightGrey',
        }
    },
    header: {
        position: 'relative',
        height: 40,
        backgroundColor: 'grey',

    },
    title: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        height: '100%'
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
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 4,
        marginBottom: 4,
        height: 30,
        marginRight: 20
    },

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
        let newList = data.allArtists.filter(filter => {
            return filter.name.toLowerCase().includes(value)
        })

        setShowData(newList)

        console.log('newlist', newList)

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
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <Typography variant="h5" className={classes.title}>
                            Artistit
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.gridRight}>
                        <strong>Search </strong><input className={classes.search} type="text" //onChange={handleSearch}
                        />
                    </Grid>
                </Grid>


            </div>
            <div className={classes.content} >

                <InfiniteScroll
                    height={'calc(100vh - 140px)'}
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