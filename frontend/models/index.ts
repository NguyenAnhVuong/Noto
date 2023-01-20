export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  auth: any;
}

export interface Folder {
  id: number;
  name: string;
}

export interface Note {
  id: string;
  content: string;
  folderId: string;
}
