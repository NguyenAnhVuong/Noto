import { gql } from '@apollo/client';

// Folder mutation

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

// Note mutation

const createNoteMutation = gql`
  mutation createNote($folderId: Int!, $content: String!) {
    createNote(createNoteInput: { folderId: $folderId, content: $content }) {
      createdAt
    }
  }
`;

const updateNoteMutation = gql`
  mutation updateNote($id: Int!, $content: String!) {
    updateNote(updateNoteInput: { id: $id, content: $content }) {
      updatedAt
    }
  }
`;

const removeNoteMutation = gql`
  mutation removeNote($id: Int!) {
    removeNote(id: $id) {
      updatedAt
    }
  }
`;

export {
  resgisterMutation,
  createFolderMutation,
  updateFolderMutation,
  removeFolderMutation,
  createNoteMutation,
  updateNoteMutation,
  removeNoteMutation,
};
