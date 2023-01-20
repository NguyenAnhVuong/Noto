import { Folder } from '@/models';
import { Form, Input, List, message, Popconfirm, Tooltip } from 'antd';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import NewFolder from './NewFolder';
import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import {
  removeFolderMutation,
  updateFolderMutation,
} from '@/graphql-client/mutations';
import Loading from './Loading';
import { getFolders } from '@/graphql-client/queries';
import { useRouter } from 'next/router';

interface Props {
  folders: Folder[];
  id: string[];
}

const FolderList = ({ folders, id }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [editFolderId, setEditFolderId] = useState<number>(-1);
  const [oldFolderName, setOldFolderName] = useState<string>('');
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [updateFolderName, { data, loading, error }] =
    useMutation(updateFolderMutation);
  const [removeFolder, { data: removeData, loading: removeLoading }] =
    useMutation(removeFolderMutation);
  const handleSelectEditFolder = (folder: Folder) => {
    setEditFolderId(folder.id);
    setOldFolderName(folder.name);
    setNewFolderName(folder.name);
  };
  const handleRename = async () => {
    if (oldFolderName === newFolderName) {
      setEditFolderId(-1);
      return;
    }
    try {
      await updateFolderName({
        variables: {
          id: editFolderId,
          name: newFolderName,
        },
        refetchQueries: [{ query: getFolders }],
      });
      setEditFolderId(-1);
      messageApi.open({
        type: 'success',
        content: 'Folder renamed successfully',
      });
    } catch (e) {}
  };

  const handleRemove = async (folder: Folder) => {
    try {
      await removeFolder({
        variables: {
          id: folder.id,
        },
        refetchQueries: [{ query: getFolders }],
      });
      messageApi.open({
        type: 'success',
        content: 'Folder removed successfully',
      });
      const currentFolder = folders.find((folder1) => folder1.id !== folder.id);
      if (currentFolder) {
        router.push(`/folders/${currentFolder.id}`);
      } else {
        router.push(`/folders`);
      }
    } catch (e) {}
  };

  return (
    <div className="bg-[#7D9D9C] p-2">
      {contextHolder}
      <div className="flex justify-between">
        <span className="font-semibold text-white">Folders</span>
        <NewFolder />
      </div>
      <List>
        {folders &&
          folders.length > 0 &&
          folders.map((folder: Folder) => (
            <List.Item
              className={
                (id && id.length && Number(id[0]) === folder.id
                  ? 'bg-[#FFD38C] '
                  : 'bg-white ') +
                'shadow-md my-2 rounded-md cursor-pointer font-semibold'
              }
              key={folder.id}
            >
              <Link className="h-full w-full" href={`/folders/${folder.id}`}>
                {editFolderId === folder.id ? (
                  <div className="flex justify-between items-center">
                    <Form.Item
                      className="mb-0 w-full mr-5"
                      help={error?.message}
                      validateStatus={error ? 'error' : 'success'}
                    >
                      <Input
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                      />
                    </Form.Item>
                    <Tooltip title="Save">
                      <BsCheckLg size={20} onClick={handleRename} />
                    </Tooltip>
                  </div>
                ) : (
                  <div className="flex justify-between text-black">
                    <span>{folder.name}</span>
                    <div className="flex gap-3">
                      <Tooltip title="Rename">
                        <AiFillEdit
                          size={20}
                          onClick={() => handleSelectEditFolder(folder)}
                        />
                      </Tooltip>
                      <Popconfirm
                        title="Are you sure to remove this folder?"
                        description="This action cannot be undone"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleRemove(folder)}
                      >
                        <Tooltip title="Delete">
                          <AiFillDelete size={20} />
                        </Tooltip>
                      </Popconfirm>
                    </div>
                  </div>
                )}
              </Link>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default FolderList;
