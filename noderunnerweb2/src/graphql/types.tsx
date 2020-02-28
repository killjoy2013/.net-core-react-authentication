/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Car = {
   __typename?: 'Car',
  brand?: Maybe<Scalars['String']>,
  model?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['String']>,
  fastEnough: Scalars['Boolean'],
};

export type CarFormInput = {
  brand?: Maybe<Scalars['String']>,
  model?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['String']>,
  fastEnough: Scalars['Boolean'],
};

export type City = {
   __typename?: 'City',
  name?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  population?: Maybe<Scalars['Int']>,
};

export type CityFormInput = {
  name?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  population?: Maybe<Scalars['Int']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  persistCarForm?: Maybe<Scalars['String']>,
  persistCityForm?: Maybe<Scalars['String']>,
};


export type MutationPersistCarFormArgs = {
  carFormInput: CarFormInput
};


export type MutationPersistCityFormArgs = {
  cityFormInput: CityFormInput
};

export type Query = {
   __typename?: 'Query',
  carForm?: Maybe<Car>,
  cityForm?: Maybe<City>,
};

export type CarFormQueryVariables = {};


export type CarFormQuery = (
  { __typename?: 'Query' }
  & { carForm: Maybe<(
    { __typename?: 'Car' }
    & Pick<Car, 'brand' | 'model' | 'year' | 'fastEnough'>
  )> }
);

export type CityFormQueryVariables = {};


export type CityFormQuery = (
  { __typename?: 'Query' }
  & { cityForm: Maybe<(
    { __typename?: 'City' }
    & Pick<City, 'name' | 'country' | 'population'>
  )> }
);

export type PersistCarFormMutationVariables = {
  args: CarFormInput
};


export type PersistCarFormMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'persistCarForm'>
);

export type PersistCityFormMutationVariables = {
  args: CityFormInput
};


export type PersistCityFormMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'persistCityForm'>
);


export const CarFormDocument = gql`
    query carForm {
  carForm @client {
    brand
    model
    year
    fastEnough
  }
}
    `;

/**
 * __useCarFormQuery__
 *
 * To run a query within a React component, call `useCarFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useCarFormQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCarFormQuery({
 *   variables: {
 *   },
 * });
 */
export function useCarFormQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CarFormQuery, CarFormQueryVariables>) {
        return ApolloReactHooks.useQuery<CarFormQuery, CarFormQueryVariables>(CarFormDocument, baseOptions);
      }
export function useCarFormLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CarFormQuery, CarFormQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CarFormQuery, CarFormQueryVariables>(CarFormDocument, baseOptions);
        }
export type CarFormQueryHookResult = ReturnType<typeof useCarFormQuery>;
export type CarFormLazyQueryHookResult = ReturnType<typeof useCarFormLazyQuery>;
export type CarFormQueryResult = ApolloReactCommon.QueryResult<CarFormQuery, CarFormQueryVariables>;
export const CityFormDocument = gql`
    query cityForm {
  cityForm @client {
    name
    country
    population
  }
}
    `;

/**
 * __useCityFormQuery__
 *
 * To run a query within a React component, call `useCityFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useCityFormQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCityFormQuery({
 *   variables: {
 *   },
 * });
 */
export function useCityFormQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CityFormQuery, CityFormQueryVariables>) {
        return ApolloReactHooks.useQuery<CityFormQuery, CityFormQueryVariables>(CityFormDocument, baseOptions);
      }
export function useCityFormLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CityFormQuery, CityFormQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CityFormQuery, CityFormQueryVariables>(CityFormDocument, baseOptions);
        }
export type CityFormQueryHookResult = ReturnType<typeof useCityFormQuery>;
export type CityFormLazyQueryHookResult = ReturnType<typeof useCityFormLazyQuery>;
export type CityFormQueryResult = ApolloReactCommon.QueryResult<CityFormQuery, CityFormQueryVariables>;
export const PersistCarFormDocument = gql`
    mutation persistCarForm($args: CarFormInput!) {
  persistCarForm(carFormInput: $args) @client
}
    `;
export type PersistCarFormMutationFn = ApolloReactCommon.MutationFunction<PersistCarFormMutation, PersistCarFormMutationVariables>;

/**
 * __usePersistCarFormMutation__
 *
 * To run a mutation, you first call `usePersistCarFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersistCarFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [persistCarFormMutation, { data, loading, error }] = usePersistCarFormMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function usePersistCarFormMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PersistCarFormMutation, PersistCarFormMutationVariables>) {
        return ApolloReactHooks.useMutation<PersistCarFormMutation, PersistCarFormMutationVariables>(PersistCarFormDocument, baseOptions);
      }
export type PersistCarFormMutationHookResult = ReturnType<typeof usePersistCarFormMutation>;
export type PersistCarFormMutationResult = ApolloReactCommon.MutationResult<PersistCarFormMutation>;
export type PersistCarFormMutationOptions = ApolloReactCommon.BaseMutationOptions<PersistCarFormMutation, PersistCarFormMutationVariables>;
export const PersistCityFormDocument = gql`
    mutation persistCityForm($args: CityFormInput!) {
  persistCityForm(cityFormInput: $args) @client
}
    `;
export type PersistCityFormMutationFn = ApolloReactCommon.MutationFunction<PersistCityFormMutation, PersistCityFormMutationVariables>;

/**
 * __usePersistCityFormMutation__
 *
 * To run a mutation, you first call `usePersistCityFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersistCityFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [persistCityFormMutation, { data, loading, error }] = usePersistCityFormMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function usePersistCityFormMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PersistCityFormMutation, PersistCityFormMutationVariables>) {
        return ApolloReactHooks.useMutation<PersistCityFormMutation, PersistCityFormMutationVariables>(PersistCityFormDocument, baseOptions);
      }
export type PersistCityFormMutationHookResult = ReturnType<typeof usePersistCityFormMutation>;
export type PersistCityFormMutationResult = ApolloReactCommon.MutationResult<PersistCityFormMutation>;
export type PersistCityFormMutationOptions = ApolloReactCommon.BaseMutationOptions<PersistCityFormMutation, PersistCityFormMutationVariables>;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Car: ResolverTypeWrapper<Car>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  City: ResolverTypeWrapper<City>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  CarFormInput: CarFormInput,
  CityFormInput: CityFormInput,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Car: Car,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  City: City,
  Int: Scalars['Int'],
  Mutation: {},
  CarFormInput: CarFormInput,
  CityFormInput: CityFormInput,
}>;

export type CarResolvers<ContextType = any, ParentType extends ResolversParentTypes['Car'] = ResolversParentTypes['Car']> = ResolversObject<{
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  model?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  fastEnough?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type CityResolvers<ContextType = any, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  population?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  persistCarForm?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationPersistCarFormArgs, 'carFormInput'>>,
  persistCityForm?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationPersistCityFormArgs, 'cityFormInput'>>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  carForm?: Resolver<Maybe<ResolversTypes['Car']>, ParentType, ContextType>,
  cityForm?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Car?: CarResolvers<ContextType>,
  City?: CityResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
