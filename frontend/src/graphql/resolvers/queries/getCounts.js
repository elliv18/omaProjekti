import gql from 'graphql-tag';

const GET_COUNTS = gql`
query {
    getCounts{
      vinylCount
      categoryCount
      artistCount
    }
}
`;
export default GET_COUNTS