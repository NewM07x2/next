/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Link = {
  __typename?: 'Link';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  delete: Note;
  insert: Note;
  update: Note;
};


export type MutationDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInsertArgs = {
  memo: Scalars['String']['input'];
};


export type MutationUpdateArgs = {
  id: Scalars['ID']['input'];
  memo: Scalars['String']['input'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID']['output'];
  memo: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  message: Scalars['String']['output'];
  note: Array<Maybe<Note>>;
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type NoteQueryVariables = Exact<{ [key: string]: never; }>;


export type NoteQuery = { __typename?: 'Query', note: Array<{ __typename?: 'Note', id: string, memo: string } | null> };


export const NoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Note"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}}]}}]}}]} as unknown as DocumentNode<NoteQuery, NoteQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Link = {
  __typename?: 'Link';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  delete: Note;
  insert: Note;
  update: Note;
};


export type MutationDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInsertArgs = {
  memo: Scalars['String']['input'];
};


export type MutationUpdateArgs = {
  id: Scalars['ID']['input'];
  memo: Scalars['String']['input'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID']['output'];
  memo: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  message: Scalars['String']['output'];
  note: Array<Maybe<Note>>;
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type NoteQueryVariables = Exact<{ [key: string]: never; }>;


export type NoteQuery = { __typename?: 'Query', note: Array<{ __typename?: 'Note', id: string, memo: string } | null> };


export const NoteDocument = gql`
    query Note {
  note {
    id
    memo
  }
}
    `;

export function useNoteQuery(options?: Omit<Urql.UseQueryArgs<NoteQueryVariables>, 'query'>) {
  return Urql.useQuery<NoteQuery, NoteQueryVariables>({ query: NoteDocument, ...options });
};