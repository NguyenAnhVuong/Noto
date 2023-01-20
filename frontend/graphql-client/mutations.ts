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

const updateFolderMutation = gql`
  mutation updateFolder($id: Int!, $name: String!) {
    updateFolder(updateFolderInput: { id: $id, name: $name }) {
      updatedAt
    }
  }
`;

const removeFolderMutation = gql`
  mutation removeFolder($id: Int!) {
    removeFolder(id: $id) {
      updatedAt
    }
  }
`;

export {
  resgisterMutation,
  createFolderMutation,
  updateFolderMutation,
  removeFolderMutation,
};
