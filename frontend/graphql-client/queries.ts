import { gql } from '@apollo/client';

const folders = gql`
  query folders {
    folders {
      id
      name
    }
  }
`;

export { folders };
