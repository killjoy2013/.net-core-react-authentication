import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { CarFormQuery, CityFormQuery } from "./graphql/types";
import { resolvers } from "./resolvers";

export const getClient = () => {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    resolvers
  });

  cache.writeData<CarFormQuery>({
    data: {
      carForm: {
        __typename: "Car",
        brand: "",
        model: "",
        year: "",
        fastEnough: false
      }
    }
  });

  cache.writeData<CityFormQuery>({
    data: {
      cityForm: {
        __typename: "City",
        name: "",
        country: "",
        population: null
      }
    }
  });

  return client;
};
