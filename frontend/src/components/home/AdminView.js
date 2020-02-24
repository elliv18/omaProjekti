import React from 'react'
import { Typography } from '@material-ui/core'
import { withApollo } from 'react-apollo'
import Loading from '../Loading';
import { GET_COUNTS } from '../../graphql/resolvers/queries';


class AdminView extends React.PureComponent {

    state = {
        data: [],
        loading: true
    }

    async componentDidMount() {
        const { client } = this.props;

        await client.query({
            query: GET_COUNTS
        })
            .then(res => {
                const data = res.data.getCounts
                this.setState({ data: data, loading: false })
                console.log(data)
            })
            .catch(e => console.log(e))
        /*
                await client.query({
                    query: ALL_VINYLS
                })
                    .then(res => {
                        const data = res.data.allVinyls
                        this.setState({ data: data, loading: false })
                        console.log(data)
                    })
                    .catch(e => console.log(e))*/
    }

    render() {
        const { loading, data } = this.state
        console.log('ADMIN VIEW')

        return (
            <div>
                <Loading open={loading} />
                <Typography variant="h5">
                    Vinyls: {data.vinylCount}
                </Typography>
                <Typography variant="h5">
                    Categories: {data.categoryCount}
                </Typography>
                <Typography variant="h5">
                    Artists: {data.artistCount}
                </Typography>
            </div>
        )
    }
}

export default withApollo(AdminView)

/*
   {data.map(row => {
                    return (
                        <ExpansionPanel elevation={7} key={row.id}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography variant="h5">{row.name}</Typography>
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails>
                                <Typography>Type: {row.type}</Typography>
                                <Typography>Condition: {row.condition}</Typography>
                                <Typography>Category: {row.category.name}</Typography>

                            </ExpansionPanelDetails>

                            <ExpansionPanelActions>
                                <Button fullWidth variant="outlined" color="secondary">Poista</Button>
                                <Button fullWidth variant="outlined" color="primary">Myyntiin</Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    )
                })}*/