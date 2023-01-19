import { gql } from '@apollo/client';

const resgisterMutation = gql`
  mutation register($uid: String!, $name: String!) {
    createAuthor(createAuthorInput: { uid: $uid, name: $name }) {
      createdAt
    }
  }
`;

const createFolderMutation = gql`
  mutation createFolder($name: String!) {
    createFolder(createFolderInput: { name: $name }) {
      createdAt
    }
  }
`;

export { resgisterMutation, createFolderMutation };
