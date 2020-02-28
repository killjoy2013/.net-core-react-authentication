import gql from "graphql-tag";

const QUERY_CAR = gql`
  query carForm {
    carForm @client {
      brand
      model
      year
      fastEnough
    }
  }
`;

const QUERY_CITY = gql`
  query cityForm {
    cityForm @client {
      name
      country
      population
    }
  }
`;

const PERSIST_CAR_FORM = gql`
  mutation persistCarForm($args: CarFormInput!) {
    persistCarForm(carFormInput: $args) @client
  }
`;

const PERSIST_CITY_FORM = gql`
  mutation persistCityForm($args: CityFormInput!) {
    persistCityForm(cityFormInput: $args) @client
  }
`;

export const Queries = {
  QUERY_CAR,
  QUERY_CITY
};

export const Mutations = {
  PERSIST_CAR_FORM,
  PERSIST_CITY_FORM
};
