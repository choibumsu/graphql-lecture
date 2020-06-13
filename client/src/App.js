import React from "react";
import { ApolloProvider, useSubscription } from "@apollo/react-hooks";
import client from "./apolloClient";
import gql from "graphql-tag";

const LOAD_PROGRAMMERS = gql`
  query {
    programmers {
      id
      name
      gender
    }
  }
`;

const LOADED_SUBSCRIPTION = gql`
  subscription {
    programmerLoaded {
      id
      name
      gender
      address {
        location
        detail
      }
    }
  }
`;

const ADDED_SUBSCRIPTION = gql`
  subscription {
    programmerAdded {
      id
      name
      gender
      address {
        location
        detail
      }
    }
  }
`;

function Loaded() {
  const { loading, error, data } = useSubscription(LOADED_SUBSCRIPTION);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  const { programmerLoaded } = data;
  return (
    <div>
      <h3>Loaded Programmer</h3>
      <div>
        {programmerLoaded.name}({programmerLoaded.gender})
      </div>
      <div>
        {programmerLoaded.address.location} {programmerLoaded.address.detail}
      </div>
    </div>
  );
}

function Added() {
  const { loading, error, data } = useSubscription(ADDED_SUBSCRIPTION);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  const { programmerAdded } = data;
  return (
    <div>
      <h3>Added Programmer</h3>
      <div>
        {programmerAdded.name} ({programmerAdded.gender})
      </div>
      <div>
        {programmerAdded.address.location} {programmerAdded.address.detail}
      </div>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Loaded></Loaded>
      <Added></Added>
    </ApolloProvider>
  );
}

export default App;
