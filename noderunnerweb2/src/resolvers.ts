import {
  Resolvers,
  Car,
  CarFormQuery,
  City,
  CityFormQuery
} from "./graphql/types";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Queries } from "./queries";

export const resolvers: Resolvers = {
  Query: {
    carForm: (_, args, { cache }: { cache: InMemoryCache }) => {
      const queryCarForm = cache.readQuery<Car>({
        query: Queries.QUERY_CAR
      });
      return queryCarForm;
    },
    cityForm: (_, args, { cache }: { cache: InMemoryCache }) => {
      const queryCityForm = cache.readQuery<City>({
        query: Queries.QUERY_CITY
      });
      return queryCityForm;
    }
  },
  Mutation: {
    persistCarForm: (
      _,
      { carFormInput },
      { cache }: { cache: InMemoryCache }
    ) => {
      const { brand, model, year, fastEnough } = carFormInput;

      cache.writeData<CarFormQuery>({
        data: {
          carForm: {
            __typename: "Car",
            brand,
            model,
            year,
            fastEnough
          }
        }
      });
      return "";
    },
    persistCityForm: (
      _,
      { cityFormInput },
      { cache }: { cache: InMemoryCache }
    ) => {
      const { name, country, population } = cityFormInput;

      //const param = { __typename: "City", ...cityFormInput };

      cache.writeData<CityFormQuery>({
        data: {
          cityForm: {
            __typename: "City",
            name,
            country,
            population
          }
        }
      });
      return "";
    }
  }
};
