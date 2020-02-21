import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Cookies from 'js-cookie'
import Home from './pages/Home';
import GET_CURRENT_USER from './graphql/resolvers/queries/getCurrentUser';
import { withApollo } from 'react-apollo';
import Signup from './pages/Signup';
import CustomAppBar from './components/CustomAppbar'
import LoadingSpinner from '@material-ui/core/CircularProgress';
import Artists from './pages/Artists';
import Vinyls from './pages/Vinyls';



class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.setAuth = this.setAuth.bind(this)
  }

  state = {
    authenticated: Cookies.get('jwt') ? true : false,
    currentUser: null,
    loading: true
  }


  componentDidMount() {
    const { authenticated } = this.state
    const { client } = this.props
    console.log('DID', authenticated)

    if (authenticated) {
      client.query({
        query: GET_CURRENT_USER
      })
        .then(res => {
          console.log(res.data)
          const CU = res.data.getCurrentUser
          if (CU !== undefined) {
            this.setState({ currentUser: CU })
          }
        })
        .catch(e => console.log(e))
        .finally(() => this.setState({ loading: false }))
    }
    else this.setState({ loading: false })

  }

  setAuth(auth) {
    this.setState({ authenticated: auth })
  }


  render() {
    const { authenticated, loading, currentUser } = this.state;
    if (loading) return <LoadingSpinner />

    return (
      <BrowserRouter>
        <CustomAppBar
          authenticated={authenticated}
          setAuth={this.setAuth}
        >

          {!authenticated ? <Redirect to="/login" /> : <Redirect to={"/home"} />}

          <CssBaseline />
          <Switch>
            <Route path="/login"
              render={() => (
                <Login authenticated={authenticated} setAuth={this.setAuth} />
              )}
            />
            <Route path="/signup"
              render={() => (
                <Signup />
              )}
            />

            <Route path="/home"
              render={() => (
                <Home
                  authenticated={authenticated}
                  currentUser={currentUser}
                />
              )}
            />

            <Route path="/artists"
              render={() => (
                < Artists />
              )}
            />

            <Route path="/vinyls"
              render={() => (
                <Vinyls />
              )}
            />

          </Switch>
        </CustomAppBar>

      </BrowserRouter>
    );
  }
}

export default withApollo(App)


/*
import React from 'react';
import { ApolloConsumer } from "react-apollo";
import { GET_USER_BY_ID } from './graphql/resolvers/queries';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


function App(props) {
  const [text, setText] = React.useState('')
  const onChange = event => {
    console.log(event.target.value)
    setText(event.target.value)
  }
  return (
    <div className="App">
      hello
      <input value={text} onChange={onChange} />
      <ApolloConsumer>
        {client => (
          <div>
            <button
              onClick={async () => {
                console.log('id', text)
                await client.query({
                  query: GET_USER_BY_ID,
                  variables: { id: text }
                })
                  .then(res => console.log(res.data.getUserById))
                  .catch(e => console.log(e))
              }}
            >
              Click me!
            </button>
          </div>
        )}
      </ApolloConsumer>
    </div >
  );
}

export default App;
*/