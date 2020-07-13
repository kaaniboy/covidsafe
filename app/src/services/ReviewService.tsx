import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import gql from 'graphql-tag';

const GET_REVIEWS_QUERY = gql`
  query ($placeId: String!) {
    allReviews(condition: { placeId: $placeId }) {
      edges {
        node {
          id content userId
          placeId updatedAt createdAt
          employeeMasks customerMasks
          distancing diningType
        }
      }
    }
  }
`;

const CREATE_REVIEW_MUTATION = gql`
  mutation (
    $placeId: String!
    $userId: String!
    $content: String
    $employeeMasks: Int
    $customerMasks: Int
    $distancing: Int
    $dividers: Int
    $diningType: String
  ) {
    createReview(input: {
      review: {
        placeId: $placeId
        userId: $userId
        content: $content
        employeeMasks: $employeeMasks
        customerMasks: $customerMasks
        distancing: $distancing
        dividers: $dividers
        diningType: $diningType
      }
    }) { clientMutationId }
  }
`;

const httpLink = new HttpLink({
  uri: 'https://covidsafe.herokuapp.com/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

export type Review = {
  id: number,
  placeId: string,
  userId: string,

  content?: string,
  employeeMasks?: number,
  customerMasks?: number,
  distancing?: number,
  dividers?: number,
  diningType?: string,

  createdAt?: Date,
  updatedAt?: Date
};

async function getPlaceReviews(placeId: string): Promise<Review[]> {
  const res = await client.query({
    query: GET_REVIEWS_QUERY,
    variables: { placeId }
  });
  return res.data.allReviews.edges.map((r: any) => r.node);
}

async function createReview(review: Review) {
  await client.mutate({
    mutation: CREATE_REVIEW_MUTATION,
    variables: review
  })
}

export default {
  createReview,
  getPlaceReviews
};