## Introduction

In this article, we will create a sample  Reactjs application to demonstrate form data persistency between routes making use of apollo cache. Since our main goal is to demonstrate the use of apollo cache as an application state container, we won't be dealing with fancy form design. Yet, a bare minimum UI design will be applied using Material-UI. 
In this sample app, we're using Formik with its 2.0.3 version that allows us create a form context with useFormikContex hook. Since this is not an article specifically for Formik. We're just using its basic form functionalities. 

You can test the working [demo](https://codesandbox.io/embed/apollo-forms-2bomy?fontsize=14) before we begin. 
[Github project](https://github.com/killjoy2013/forms-persistency-with-apollo-cache/tree/persist_forms_to_apollo_cache) is at your disposal as well.


Lets start...  

### Construct the project

We're using Create React App like the vast majority of the react applications as a starter template ;

`npx create-react-app apollo-forms --typescript`

And need to install initial dependencies. First material-ui

`yarn add @material-ui/core clsx `

React router;

`yarn add react-router-dom history @types/react-router-dom -D @types/history -D`

Formik;

`yarn add formik`

Now let's add our form pages and routes;

*src/pages/Cars.tsx*

```jsx
import * as React from "react";
import { Formik, useFormikContext } from "formik";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  Button,
  makeStyles,
  Theme,
  createStyles,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import DisplayFormikState from "./DisplayFormikState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      width: 250
    },
    input: {
      width: 250
    },
    formControl: {
      width: 250
    }
  })
);

type Car = {
  brand: string;
  model: string;
  year: number;
  fastEnough: boolean;
};

const CarForm = () => {
  const classes = useStyles();
  const formik = useFormikContext<Car>();
  return (
    <form>
      <Grid container direction="column" justify="center" alignItems="center">
        <TextField
          className={classes.input}
          name="brand"
          label="Brand"
          value={formik.values.brand}
          onChange={formik.handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          className={classes.input}
          name="model"
          label="Model"
          value={formik.values.model}
          onChange={formik.handleChange}
          variant="outlined"
          margin="normal"
        />

        <FormControl
          margin="normal"
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={formik.values.year}
            onChange={e => {
              formik.setFieldValue("year", e.target.value);
            }}
            labelWidth={30}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              name="fastEnough"
              checked={formik.values.fastEnough}
              value="fastEnough"
              onChange={e => {
                formik.setFieldValue("fastEnough", e.target.checked);
              }}
            />
          }
          label="Fast Enough"
        ></FormControlLabel>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => formik.submitForm()}
        >
          Persist Cars
        </Button>
      </Grid>
      <DisplayFormikState {...formik.values} />
    </form>
  );
};

interface ICars {}

const Cars: React.FunctionComponent<ICars> = (props: ICars) => {
  return (
    <Formik
      initialValues={{
        brand: "",
        model: "",
        year: "",
        fastEnough: false
      }}
      onSubmit={() => alert("Nowhere to persist :-(")}
    >
      <CarForm />
    </Formik>
  );
};

export default Cars;
```

*src/pages/Cities.tsx*
```jsx
import * as React from "react";
import { Formik, useFormikContext } from "formik";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  Button,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import DisplayFormikState from "./DisplayFormikState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      width: 250
    },
    input: {
      width: 250
    }
  })
);

type City = {
  name: "";
  country: "";
  population: "";
};

const CityForm = () => {
  const classes = useStyles();
  const formik = useFormikContext<City>();

  return (
    <form>
      <Grid container direction="column" justify="center" alignItems="center">
        <TextField
          className={classes.input}
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          className={classes.input}
          name="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          className={classes.input}
          name="population"
          label="Population"
          value={formik.values.population}
          onChange={formik.handleChange}
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => formik.submitForm()}
        >
          Persist Cities
        </Button>
      </Grid>
      <DisplayFormikState {...formik.values} />
    </form>
  );
};

interface ICities {}

const Cities: React.FunctionComponent<ICities> = (props: ICities) => {
  return (
    <Formik
      initialValues={{
        brand: "",
        model: "",
        year: ""
      }}
      onSubmit={() => alert("Nowhere to persist :-(")}
    >
      <CityForm />
    </Formik>
  );
};

export default Cities;
```

*src/pages/Home.tsx*
```jsx
import * as React from "react";

const Home = () => {
  return <h1>welcome to apollo forms!</h1>;
};

export default Home;
```
*src/pages/Routes.tsx*
```jsx
import * as React from "react";
import { Router, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Cars from "./Cars";
import Cities from "./Cities";
import Home from "./Home";
import {
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";

const history = createBrowserHistory();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    href: {
      margin: 20,
      color: "white"
    }
  })
);

const Routes = () => {
  const classes = useStyles();
  return (
    <Router history={history}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link className={classes.href} to="/">
              Home
            </Link>
            <Link className={classes.href} to="/cars">
              Cars
            </Link>
            <Link className={classes.href} to="/cities">
              Cities
            </Link>
          </Toolbar>
        </AppBar>

        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/cars">
            <Cars />
          </Route>
          <Route path="/cities">
            <Cities />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
```
*src/pages/App.tsx*
```jsx
import React from "react";
import "./App.css";
import Routes from "./pages/Routes";

const App = () => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;
```

*src/pages/DisplayFormikState.tsx*
```jsx
import * as React from "react";

const DisplayFormikState = (formikProps: any) => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".9rem",
        padding: ".5rem"
      }}
    >
      <strong>props</strong> = {JSON.stringify(formikProps, null, 2)}
    </pre>
  </div>
);

export default DisplayFormikState;
```

At this point, we have a basic app with Cars and Cities pages and we can navigate between. Nothing spacial so far. Form data wich we entered can not be persisted yet. 
Now we can ask the eternal question; how to persist the form states? So that when we route back to our page we can find our form filled with previous data.

## **Keeping the form state**
State management is one of the most important topics in React. A few years ago Redux and Mobx were the way to go. Today we have React Context as of React 16.3. When dealing with form states, we may attempt to keep our form in sync with our React context. This seems very logical and easy; just bind the form controls value properties to our context entity's relevant properties in the context and be happy! Very soon we'd discover that this causes undesired re-renders and results in terrible performance... 

Formik documentation indicates that the form state is ***ephemeral***. And it should stay so. We may think 'Ok we can update the React Context upon form submission, that's fine enough'. This is quite logical indeed. There are tons of documents on the web about using React Context. However, if we are using GraphQL we have another option; using Apollo Cache to keep the form state between routes...

## **GraphQL & Apollo Client & graphql-code-generator**
GraphQL is an awesone technology that lets us write our backend in very neat and imparative way independent of the language. There are wonderful resources on the web to go into details of GraphQL.

Of course it's not only for backend. We develop our frontend applications making use of GraphQL query & mutation paradigm. Oftenly, frontend teams drive the transition toward GraphQL. [PayPal](https://medium.com/paypal-engineering/graphql-a-success-story-for-paypal-checkout-3482f724fb53) success story is a must read.

I believe, two things are indispensible especially for large development teams; typescript & code generators. As the complexity of your app increases, developing with confidence and ease is crucial. Let's add Apollo & GraphQL to our sample app;

`yarn add @apollo/react-hooks apollo-cache-inmemory apollo-client graphql graphql-tag react-apollo `

And graphql-code-generator

`@graphql-codegen/add @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript-resolvers`

Now GraphQL queries and mutations;

*src/queries.ts*
```jsx
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
```

Now we're creating our client side schema definition file that graphql-code-generator will use to generate the GraphQL types and schema definitions; 

*client-schema.graphql*
```jsx
type Car {
  brand: String
  model: String
  year: String
  fastEnough: Boolean!
}

type City {
  name: String
  country: String
  population: Int
}

input CarFormInput {
  brand: String
  model: String
  year: String
  fastEnough: Boolean!
}

input CityFormInput {
  name: String
  country: String
  population: Int
}

type Query {
  carForm: Car
  cityForm: City
}

type Mutation {
  persistCarForm(carFormInput: CarFormInput!): String
  persistCityForm(cityFormInput: CityFormInput!): String
}
```

Our final file to add is to configure graphql-code-generator;

*codegen.yml*
```jsx
documents:
  - ./src/queries.ts
overwrite: true
generates:
  ./src/graphql/types.tsx:
    schema: client-schema.graphql
    plugins:
      - add: "/* eslint-disable */"
      - typescript
      - typescript-operations
      - typescript-react-apollo
      - typescript-resolvers
    # The combined options of all provided plug-ins
    # More information about the options below:
    # graphql-code-generator.com/docs/plugins/typescript-react-apollo#configuration
    config:
      withHOC: false
      withHooks: true
      withComponent: false
      useIndexSignature: true
```
Please refer to [graphql-code-generator](https://graphql-code-generator.com/) web site for all config details.

Finally, we need to add codegen script to *package.json*;

```jsx
  "scripts": {
    "codegen": "gql-gen",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
At this point we can run codegen to create *src/graphql/types.tsx*;

`yarn run codegen`

If you followed along so far, you're supposed to have *src/graphql/types.tsx*. You can check the file and the generated types.

## **Apollo Client & resolvers**

Now we need to create Apollo Client and initialize Apollo Cache using *ApolloProxy.ts*;

*src/ApolloProxy.ts*
```jsx
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
```
*src/resolvers.ts*
```jsx
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
      return "OK";
    },
    persistCityForm: (
      _,
      { cityFormInput },
      { cache }: { cache: InMemoryCache }
    ) => {
      const { name, country, population } = cityFormInput;

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
      return "OK";
    }
  }
};
```

In this sample app, we have no graphql server. We'll only use Apollo Cache for our forms data. So, *ApolloProxy.ts* has no link to a backend. We're creating default form data, `carForm` & `cityForm`. Notice, we're using typescript generics with the generated types `CarFormQuery` & `CityFormQuery` in cache write operations. We're totally type safe here. For instance, try to change the name property of the cityForm to cityName. Typescript compiler immediately complains and warns you.  
In *resolvers.ts*, we're using `Resolvers` and other generated types by *graphql-code-generator*. 


