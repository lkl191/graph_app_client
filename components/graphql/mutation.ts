import { gql } from "@apollo/client";

//enum型はそのままでok
export const CREATE_GRAPH = gql`
  mutation createGraph(
    $title: String!
    $graphKind: GraphKind
    $category: String!
    $label: [String]
    $value: [Int]
  ) {
    createGraph(
      inputGraph: {
        title: $title
        graphKind: $graphKind
        category: $category
        label: $label
        value: $value
      }
    ) {
      id
      title
      graphKind
      category
    }
  }
`;

export const CREATE_GRAPH_DATA = gql`
  mutation createData($graphId: String!, $label: [String], $value: [Int]) {
    createData(inputData: { graphId: $graphId, label: $label, value: $value }) {
      id
      graphId
      data {
        label
        value
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($props: String) {
    Login(props: $props) {
      _id
      email
    }
  }
`;

export const SIGNIN = gql`
  mutation SignIn($email: String!) {
    SignIn(inputUser: { email: $email }) {
      email
    }
  }
`;

export const DELETE_GRAPH = gql`
  mutation deleteGraph($id: ID!) {
    deleteGraph(inputDeleteGraph: { id: $id })
  }
`;
