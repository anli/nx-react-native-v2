import * as Types from '../../../utils/graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
};

export type AddHabitActivityInput = {
  count: Scalars['Int'];
  date: Scalars['DateTime'];
  habit: HabitRef;
};

export type AddHabitActivityPayload = {
  __typename?: 'AddHabitActivityPayload';
  habitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddHabitActivityPayloadHabitActivityArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitActivityOrder>;
};

export type AddHabitInput = {
  habitActivities?: InputMaybe<Array<HabitActivityRef>>;
  name: Scalars['String'];
  user: UserRef;
};

export type AddHabitPayload = {
  __typename?: 'AddHabitPayload';
  habit?: Maybe<Array<Maybe<Habit>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddHabitPayloadHabitArgs = {
  filter?: InputMaybe<HabitFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitOrder>;
};

export type AddUserInput = {
  email: Scalars['String'];
  habits?: InputMaybe<Array<HabitRef>>;
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  numUids?: Maybe<Scalars['Int']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type AddUserPayloadUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrder>;
};

export type AuthRule = {
  and?: InputMaybe<Array<InputMaybe<AuthRule>>>;
  not?: InputMaybe<AuthRule>;
  or?: InputMaybe<Array<InputMaybe<AuthRule>>>;
  rule?: InputMaybe<Scalars['String']>;
};

export type ContainsFilter = {
  point?: InputMaybe<PointRef>;
  polygon?: InputMaybe<PolygonRef>;
};

export type CustomHttp = {
  body?: InputMaybe<Scalars['String']>;
  forwardHeaders?: InputMaybe<Array<Scalars['String']>>;
  graphql?: InputMaybe<Scalars['String']>;
  introspectionHeaders?: InputMaybe<Array<Scalars['String']>>;
  method: HttpMethod;
  mode?: InputMaybe<Mode>;
  secretHeaders?: InputMaybe<Array<Scalars['String']>>;
  skipIntrospection?: InputMaybe<Scalars['Boolean']>;
  url: Scalars['String'];
};

export type DateTimeFilter = {
  between?: InputMaybe<DateTimeRange>;
  eq?: InputMaybe<Scalars['DateTime']>;
  ge?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  le?: InputMaybe<Scalars['DateTime']>;
  lt?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeRange = {
  max: Scalars['DateTime'];
  min: Scalars['DateTime'];
};

export type DeleteHabitActivityPayload = {
  __typename?: 'DeleteHabitActivityPayload';
  habitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteHabitActivityPayloadHabitActivityArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitActivityOrder>;
};

export type DeleteHabitPayload = {
  __typename?: 'DeleteHabitPayload';
  habit?: Maybe<Array<Maybe<Habit>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteHabitPayloadHabitArgs = {
  filter?: InputMaybe<HabitFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitOrder>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type DeleteUserPayloadUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrder>;
};

export const DgraphIndex = {
  Bool: 'bool',
  Day: 'day',
  Exact: 'exact',
  Float: 'float',
  Fulltext: 'fulltext',
  Geo: 'geo',
  Hash: 'hash',
  Hour: 'hour',
  Int: 'int',
  Int64: 'int64',
  Month: 'month',
  Regexp: 'regexp',
  Term: 'term',
  Trigram: 'trigram',
  Year: 'year'
} as const;

export type DgraphIndex = typeof DgraphIndex[keyof typeof DgraphIndex];
export type FloatFilter = {
  between?: InputMaybe<FloatRange>;
  eq?: InputMaybe<Scalars['Float']>;
  ge?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  le?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
};

export type FloatRange = {
  max: Scalars['Float'];
  min: Scalars['Float'];
};

export type GenerateMutationParams = {
  add?: InputMaybe<Scalars['Boolean']>;
  delete?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<Scalars['Boolean']>;
};

export type GenerateQueryParams = {
  aggregate?: InputMaybe<Scalars['Boolean']>;
  get?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['Boolean']>;
  query?: InputMaybe<Scalars['Boolean']>;
};

export const HttpMethod = {
  Delete: 'DELETE',
  Get: 'GET',
  Patch: 'PATCH',
  Post: 'POST',
  Put: 'PUT'
} as const;

export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];
export type Habit = {
  __typename?: 'Habit';
  habitActivities?: Maybe<Array<HabitActivity>>;
  habitActivitiesAggregate?: Maybe<HabitActivityAggregateResult>;
  id: Scalars['ID'];
  name: Scalars['String'];
  user: User;
};


export type HabitHabitActivitiesArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitActivityOrder>;
};


export type HabitHabitActivitiesAggregateArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
};


export type HabitUserArgs = {
  filter?: InputMaybe<UserFilter>;
};

export type HabitActivity = {
  __typename?: 'HabitActivity';
  count: Scalars['Int'];
  date: Scalars['DateTime'];
  habit: Habit;
  id: Scalars['ID'];
};


export type HabitActivityHabitArgs = {
  filter?: InputMaybe<HabitFilter>;
};

export type HabitActivityAggregateResult = {
  __typename?: 'HabitActivityAggregateResult';
  count?: Maybe<Scalars['Int']>;
  countAvg?: Maybe<Scalars['Float']>;
  countMax?: Maybe<Scalars['Int']>;
  countMin?: Maybe<Scalars['Int']>;
  countSum?: Maybe<Scalars['Int']>;
  dateMax?: Maybe<Scalars['DateTime']>;
  dateMin?: Maybe<Scalars['DateTime']>;
};

export type HabitActivityFilter = {
  and?: InputMaybe<Array<InputMaybe<HabitActivityFilter>>>;
  date?: InputMaybe<DateTimeFilter>;
  has?: InputMaybe<Array<InputMaybe<HabitActivityHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  not?: InputMaybe<HabitActivityFilter>;
  or?: InputMaybe<Array<InputMaybe<HabitActivityFilter>>>;
};

export const HabitActivityHasFilter = {
  Count: 'count',
  Date: 'date',
  Habit: 'habit'
} as const;

export type HabitActivityHasFilter = typeof HabitActivityHasFilter[keyof typeof HabitActivityHasFilter];
export type HabitActivityOrder = {
  asc?: InputMaybe<HabitActivityOrderable>;
  desc?: InputMaybe<HabitActivityOrderable>;
  then?: InputMaybe<HabitActivityOrder>;
};

export const HabitActivityOrderable = {
  Count: 'count',
  Date: 'date'
} as const;

export type HabitActivityOrderable = typeof HabitActivityOrderable[keyof typeof HabitActivityOrderable];
export type HabitActivityPatch = {
  count?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['DateTime']>;
  habit?: InputMaybe<HabitRef>;
};

export type HabitActivityRef = {
  count?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['DateTime']>;
  habit?: InputMaybe<HabitRef>;
  id?: InputMaybe<Scalars['ID']>;
};

export type HabitAggregateResult = {
  __typename?: 'HabitAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
};

export type HabitFilter = {
  and?: InputMaybe<Array<InputMaybe<HabitFilter>>>;
  has?: InputMaybe<Array<InputMaybe<HabitHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<StringFullTextFilter>;
  not?: InputMaybe<HabitFilter>;
  or?: InputMaybe<Array<InputMaybe<HabitFilter>>>;
};

export const HabitHasFilter = {
  HabitActivities: 'habitActivities',
  Name: 'name',
  User: 'user'
} as const;

export type HabitHasFilter = typeof HabitHasFilter[keyof typeof HabitHasFilter];
export type HabitOrder = {
  asc?: InputMaybe<HabitOrderable>;
  desc?: InputMaybe<HabitOrderable>;
  then?: InputMaybe<HabitOrder>;
};

export const HabitOrderable = {
  Name: 'name'
} as const;

export type HabitOrderable = typeof HabitOrderable[keyof typeof HabitOrderable];
export type HabitPatch = {
  habitActivities?: InputMaybe<Array<HabitActivityRef>>;
  name?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserRef>;
};

export type HabitRef = {
  habitActivities?: InputMaybe<Array<HabitActivityRef>>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserRef>;
};

export type Int64Filter = {
  between?: InputMaybe<Int64Range>;
  eq?: InputMaybe<Scalars['Int64']>;
  ge?: InputMaybe<Scalars['Int64']>;
  gt?: InputMaybe<Scalars['Int64']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int64']>>>;
  le?: InputMaybe<Scalars['Int64']>;
  lt?: InputMaybe<Scalars['Int64']>;
};

export type Int64Range = {
  max: Scalars['Int64'];
  min: Scalars['Int64'];
};

export type IntFilter = {
  between?: InputMaybe<IntRange>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
};

export type IntRange = {
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type IntersectsFilter = {
  multiPolygon?: InputMaybe<MultiPolygonRef>;
  polygon?: InputMaybe<PolygonRef>;
};

export const Mode = {
  Batch: 'BATCH',
  Single: 'SINGLE'
} as const;

export type Mode = typeof Mode[keyof typeof Mode];
export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addHabit?: Maybe<AddHabitPayload>;
  addHabitActivity?: Maybe<AddHabitActivityPayload>;
  addUser?: Maybe<AddUserPayload>;
  deleteHabit?: Maybe<DeleteHabitPayload>;
  deleteHabitActivity?: Maybe<DeleteHabitActivityPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  updateHabit?: Maybe<UpdateHabitPayload>;
  updateHabitActivity?: Maybe<UpdateHabitActivityPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationAddHabitArgs = {
  input: Array<AddHabitInput>;
};


export type MutationAddHabitActivityArgs = {
  input: Array<AddHabitActivityInput>;
};


export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
  upsert?: InputMaybe<Scalars['Boolean']>;
};


export type MutationDeleteHabitArgs = {
  filter: HabitFilter;
};


export type MutationDeleteHabitActivityArgs = {
  filter: HabitActivityFilter;
};


export type MutationDeleteUserArgs = {
  filter: UserFilter;
};


export type MutationUpdateHabitArgs = {
  input: UpdateHabitInput;
};


export type MutationUpdateHabitActivityArgs = {
  input: UpdateHabitActivityInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type NearFilter = {
  coordinate: PointRef;
  distance: Scalars['Float'];
};

export type Point = {
  __typename?: 'Point';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type PointGeoFilter = {
  near?: InputMaybe<NearFilter>;
  within?: InputMaybe<WithinFilter>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type PointRef = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type PolygonGeoFilter = {
  contains?: InputMaybe<ContainsFilter>;
  intersects?: InputMaybe<IntersectsFilter>;
  near?: InputMaybe<NearFilter>;
  within?: InputMaybe<WithinFilter>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type Query = {
  __typename?: 'Query';
  aggregateHabit?: Maybe<HabitAggregateResult>;
  aggregateHabitActivity?: Maybe<HabitActivityAggregateResult>;
  aggregateUser?: Maybe<UserAggregateResult>;
  getHabit?: Maybe<Habit>;
  getHabitActivity?: Maybe<HabitActivity>;
  getUser?: Maybe<User>;
  queryHabit?: Maybe<Array<Maybe<Habit>>>;
  queryHabitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  queryUser?: Maybe<Array<Maybe<User>>>;
};


export type QueryAggregateHabitArgs = {
  filter?: InputMaybe<HabitFilter>;
};


export type QueryAggregateHabitActivityArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
};


export type QueryAggregateUserArgs = {
  filter?: InputMaybe<UserFilter>;
};


export type QueryGetHabitArgs = {
  id: Scalars['ID'];
};


export type QueryGetHabitActivityArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryQueryHabitArgs = {
  filter?: InputMaybe<HabitFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitOrder>;
};


export type QueryQueryHabitActivityArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitActivityOrder>;
};


export type QueryQueryUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrder>;
};

export type StringExactFilter = {
  between?: InputMaybe<StringRange>;
  eq?: InputMaybe<Scalars['String']>;
  ge?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  le?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
};

export type StringFullTextFilter = {
  alloftext?: InputMaybe<Scalars['String']>;
  anyoftext?: InputMaybe<Scalars['String']>;
};

export type StringHashFilter = {
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StringRange = {
  max: Scalars['String'];
  min: Scalars['String'];
};

export type StringRegExpFilter = {
  regexp?: InputMaybe<Scalars['String']>;
};

export type StringTermFilter = {
  allofterms?: InputMaybe<Scalars['String']>;
  anyofterms?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  aggregateHabit?: Maybe<HabitAggregateResult>;
  aggregateHabitActivity?: Maybe<HabitActivityAggregateResult>;
  aggregateUser?: Maybe<UserAggregateResult>;
  getHabit?: Maybe<Habit>;
  getHabitActivity?: Maybe<HabitActivity>;
  getUser?: Maybe<User>;
  queryHabit?: Maybe<Array<Maybe<Habit>>>;
  queryHabitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  queryUser?: Maybe<Array<Maybe<User>>>;
};


export type SubscriptionAggregateHabitArgs = {
  filter?: InputMaybe<HabitFilter>;
};


export type SubscriptionAggregateHabitActivityArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
};


export type SubscriptionAggregateUserArgs = {
  filter?: InputMaybe<UserFilter>;
};


export type SubscriptionGetHabitArgs = {
  id: Scalars['ID'];
};


export type SubscriptionGetHabitActivityArgs = {
  id: Scalars['ID'];
};


export type SubscriptionGetUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionQueryHabitArgs = {
  filter?: InputMaybe<HabitFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitOrder>;
};


export type SubscriptionQueryHabitActivityArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitActivityOrder>;
};


export type SubscriptionQueryUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrder>;
};

export type UpdateHabitActivityInput = {
  filter: HabitActivityFilter;
  remove?: InputMaybe<HabitActivityPatch>;
  set?: InputMaybe<HabitActivityPatch>;
};

export type UpdateHabitActivityPayload = {
  __typename?: 'UpdateHabitActivityPayload';
  habitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateHabitActivityPayloadHabitActivityArgs = {
  filter?: InputMaybe<HabitActivityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitActivityOrder>;
};

export type UpdateHabitInput = {
  filter: HabitFilter;
  remove?: InputMaybe<HabitPatch>;
  set?: InputMaybe<HabitPatch>;
};

export type UpdateHabitPayload = {
  __typename?: 'UpdateHabitPayload';
  habit?: Maybe<Array<Maybe<Habit>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateHabitPayloadHabitArgs = {
  filter?: InputMaybe<HabitFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitOrder>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  remove?: InputMaybe<UserPatch>;
  set?: InputMaybe<UserPatch>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  numUids?: Maybe<Scalars['Int']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type UpdateUserPayloadUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrder>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  habits?: Maybe<Array<Habit>>;
  habitsAggregate?: Maybe<HabitAggregateResult>;
  id: Scalars['ID'];
};


export type UserHabitsArgs = {
  filter?: InputMaybe<HabitFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<HabitOrder>;
};


export type UserHabitsAggregateArgs = {
  filter?: InputMaybe<HabitFilter>;
};

export type UserAggregateResult = {
  __typename?: 'UserAggregateResult';
  count?: Maybe<Scalars['Int']>;
  emailMax?: Maybe<Scalars['String']>;
  emailMin?: Maybe<Scalars['String']>;
};

export type UserFilter = {
  and?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  email?: InputMaybe<StringHashFilter>;
  has?: InputMaybe<Array<InputMaybe<UserHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  not?: InputMaybe<UserFilter>;
  or?: InputMaybe<Array<InputMaybe<UserFilter>>>;
};

export const UserHasFilter = {
  Email: 'email',
  Habits: 'habits'
} as const;

export type UserHasFilter = typeof UserHasFilter[keyof typeof UserHasFilter];
export type UserOrder = {
  asc?: InputMaybe<UserOrderable>;
  desc?: InputMaybe<UserOrderable>;
  then?: InputMaybe<UserOrder>;
};

export const UserOrderable = {
  Email: 'email'
} as const;

export type UserOrderable = typeof UserOrderable[keyof typeof UserOrderable];
export type UserPatch = {
  habits?: InputMaybe<Array<HabitRef>>;
};

export type UserRef = {
  email?: InputMaybe<Scalars['String']>;
  habits?: InputMaybe<Array<HabitRef>>;
  id?: InputMaybe<Scalars['ID']>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};

export type HabitsSubscriptionVariables = Types.Exact<{
  minDate: Types.Scalars['DateTime'];
  maxDate: Types.Scalars['DateTime'];
}>;


export type HabitsSubscription = { __typename?: 'Subscription', queryHabit?: Array<{ __typename?: 'Habit', id: string, name: string, habitActivities?: Array<{ __typename?: 'HabitActivity', id: string, count: number, date: any }> | null } | null> | null };


export const HabitsDocument = gql`
    subscription Habits($minDate: DateTime!, $maxDate: DateTime!) {
  queryHabit {
    habitActivities(filter: {date: {between: {min: $minDate, max: $maxDate}}}) {
      id
      count
      date
    }
    id
    name
  }
}
    `;

/**
 * __useHabitsSubscription__
 *
 * To run a query within a React component, call `useHabitsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useHabitsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHabitsSubscription({
 *   variables: {
 *      minDate: // value for 'minDate'
 *      maxDate: // value for 'maxDate'
 *   },
 * });
 */
export function useHabitsSubscription(baseOptions: Apollo.SubscriptionHookOptions<HabitsSubscription, HabitsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<HabitsSubscription, HabitsSubscriptionVariables>(HabitsDocument, options);
      }
export type HabitsSubscriptionHookResult = ReturnType<typeof useHabitsSubscription>;
export type HabitsSubscriptionResult = Apollo.SubscriptionResult<HabitsSubscription>;