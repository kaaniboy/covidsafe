import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import gql from 'graphql-tag';

const GET_REVIEWS_QUERY = gql`
  query ($placeId: String!) {
    allReviews(condition: { placeId: $placeId }) {
      edges {
        node {
          id content userId
          placeId updatedAt createdAt
        }
      }
    }
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
  masks?: number,
  distancing?: number,
  pickup?: number,

  createdAt?: Date,
  updatedAt?: Date,
};

async function getPlaceReviews(placeId: string): Promise<Review[]> {
  const res = await client.query({
    query: GET_REVIEWS_QUERY,
    variables: { placeId }
  });
  return res.data.allReviews.edges.map((r: any) => r.node);
}

async function createReview(review: Review) { }

export default {
  createReview,
  getPlaceReviews
};