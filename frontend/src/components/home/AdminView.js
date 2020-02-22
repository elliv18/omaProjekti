import React from 'react'
import { Button } from '@material-ui/core'
import { withApollo } from 'react-apollo'
import { ALL_VINYLS } from '../../graphql/resolvers/queries/allVinyls';

class AdminView extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const { client } = this.props;

        await client.query({
            query: ALL_VINYLS
        })
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }

    render() {
        console.log(this.props)

        return (
            <div>
                ADMIN

                <Button
                    onClick={this.fetch}
                >click
                </Button>
            </div>
        )
    }
}

export default withApollo(AdminView)