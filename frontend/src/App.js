import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import { withApollo } from 'react-apollo';
import Signup from './pages/Signup';
import CustomAppBar from './components/CustomAppbar'
import Artists from './pages/Artists';
import Vinyls from './pages/Vinyls2';
import { setAuthStates } from './redux/actions'
import { connect } from 'react-redux'
import ErrorPage from './pages/Errorpage';
import Categories from './pages/Categories';
import PrivateRoute from './components/PrivateRoute';
import { AdminView, UserView } from './components/home';



class App extends React.PureComponent {


  render() {
    const { authenticated, currentUser } = this.props;
    //console.log('App render', currentUser)

    return (
      <BrowserRouter>
        <CustomAppBar
          authenticated={authenticated}
          currentUser={currentUser}
        >
          <CssBaseline />
          <Switch>
            <Route path="/login"
              render={() => (
                <Login />
              )}
            />
            <Route path="/signup"
              render={() => (
                <Signup />
              )}
            />

            <PrivateRoute exact path="/" componentUser={UserView} componentAdmin={AdminView} CU={currentUser} />

            <PrivateRoute path="/categories" componentAdmin={Categories} CU={currentUser} />

            <PrivateRoute path="/artists" componentAdmin={Artists} CU={currentUser} />

            <PrivateRoute path="/vinyls" componentAdmin={Vinyls} CU={currentUser} />

            <PrivateRoute componentAdmin={ErrorPage} componentUser={ErrorPage} CU={currentUser} />
          </Switch>
        </CustomAppBar>

      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state', state)
  return {
    authenticated: state.authReduser.authenticated,
    currentUser: state.authReduser.currentUser
  }
}

export default connect(
  mapStateToProps,
  { setAuthStates }
)(withApollo(App))





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