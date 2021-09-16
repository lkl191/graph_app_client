import { gql } from "@apollo/client";

export const ALL_GRAPHS = gql`
  query allGraphs {
    allGraphs {
      id
      title
      category
      graphKind
      user {
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`;

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      id
      username
    }
  }
`;
export const SINGLE_GRAPH = gql`
  query singleGraph($id: ID!) {
    singleGraph(graphId: $id) {
      id
      title
      category
      graphKind
      source
      user {
        _id
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`;

export const MY_GRAPHS = gql`
  query myGraphs($userId: String) {
    myGraphs(userId: $userId) {
      id
      title
      category
      graphKind
      user {
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`;

export const GRAPH_CATEGORY = gql`
  query graphCate($category: String) {
    graphCate(category: $category) {
      id
      title
      category
      graphKind
      user {
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`;
