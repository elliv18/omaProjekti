import React from 'react';
import { ApolloConsumer } from "react-apollo";
import { GET_USER_BY_ID } from './graphql/resolvers/queries';



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
