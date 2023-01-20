import { gql } from '@apollo/client';

const getFolders = gql`
  query folders {
    folders {
      id
      name
    }
  }
`;

const getFolder = gql`
  query folder($id: Int!) {
    folder(id: $id) {
      id
      notes {
        id
        content
        updatedAt
      }
    }
  }
`;

export { getFolders, getFolder };
