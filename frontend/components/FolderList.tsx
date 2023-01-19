import { Folder } from '@/models';
import { List } from 'antd';
import Link from 'next/link';
import NewFolder from './NewFolder';

interface Props {
  folders: Folder[];
  id: string[];
}

const FolderList = ({ folders, id }: Props) => {
  return (
    <div className="bg-[#7D9D9C] p-2">
      <div className="flex justify-between">
        <h2 className="font-semibold text-white">Folders</h2>
        <NewFolder />
      </div>
      <List>
        {folders &&
          folders.length > 0 &&
          folders.map((folder: any) => (
            <List.Item
              className={
                (id && id.length && id[0] == folder.id
                  ? 'bg-[#FFD38C] '
                  : 'bg-white ') + 'shadow-md my-2 rounded-md cursor-pointer'
              }
              key={folder.id}
            >
              <Link className="h-full w-full" href={`/folders/${folder.id}`}>
                {folder.name}
              </Link>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default FolderList;
