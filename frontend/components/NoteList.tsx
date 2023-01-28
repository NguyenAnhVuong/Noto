import {
  createNoteMutation,
  removeNoteMutation,
} from '@/graphql-client/mutations';
import { getFolder } from '@/graphql-client/queries';
import { Note } from '@/models';
import { useMutation, useQuery } from '@apollo/client';
import { Col, List, message, Popconfirm, Row, Tooltip } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineNoteAdd } from 'react-icons/md';
import Loading from './Loading';
import { NoteEditor } from './Note';

type Props = {
  id: string[];
};

const NoteList = ({ id }: Props) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const { loading, error, data } = useQuery(getFolder, {
    variables: { id: Number(id[0]) },
    skip: !id || !id.length,
  });

  const [addNote, { data: addNoteData }] = useMutation(createNoteMutation, {
    refetchQueries: [{ query: getFolder, variables: { id: Number(id[0]) } }],
  });

  const [removeNote, { data: removeData, loading: removeLoading }] =
    useMutation(removeNoteMutation);

  const handleRemoveNote = async (noteId: number) => {
    await removeNote({
      variables: {
        id: noteId,
      },
      refetchQueries: [
        {
          query: getFolder,
          variables: { id: Number(id[0]) },
        },
      ],
      onCompleted: () => {
        messageApi.success('Deleted note successfully');
        router.push('/folders/' + id[0]);
      },
    });
  };

  if (loading) return <Loading height="600px" />;
  if (error) return <p>Error :</p>;

  const handleAddNote = async () => {
    try {
      await addNote({
        variables: {
          folderId: Number(id[0]),
          content: '',
        },
      });
      if (addNoteData) {
        messageApi.success('Note added');
      }
    } catch (error) {}
  };

  const getTitle = (content: string) => {
    if (content == '<p></p>\n' || !content) return 'Empty';
    let string = content.substring(0, content.indexOf('</'));
    const title = string.substring(string.lastIndexOf('>') + 1, string.length);
    return title;
  };

  return (
    <Row className="">
      {contextHolder}
      <Col className="p-2 bg-[#F0EBE3]" span={8}>
        <div className="flex justify-between h-7">
          <span className="font-semibold ">Notes</span>
          <Tooltip className="cursor-pointer" title="Add Note">
            <MdOutlineNoteAdd
              className="text-[#0000008a]"
              size={24}
              onClick={handleAddNote}
            />
          </Tooltip>
        </div>
        <List className="overflow-y-auto h-[556px]">
          {data.folder.notes.map((note: Note) => (
            <List.Item
              className={
                (id && id.length && Number(id[2]) === note.id
                  ? 'bg-[#FFD38C] '
                  : 'bg-white') +
                'shadow-md bg-white my-2 rounded-md cursor-pointer'
              }
              key={note.id}
            >
              <Link
                className="h-full w-full text-black"
                href={
                  '/folders/' + (id && id.length && id[0]) + '/note/' + note.id
                }
              >
                <div className="">
                  <div className="flex justify-between">
                    <div
                      className="font-semibold w-48 truncate"
                      dangerouslySetInnerHTML={{
                        __html: getTitle(note.content),
                      }}
                    />
                    <Popconfirm
                      title="Are you sure to delete this note?"
                      description="This action cannot be undone"
                      onConfirm={() => handleRemoveNote(note.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Delete">
                        <AiFillDelete size={20} />
                      </Tooltip>
                    </Popconfirm>
                  </div>
                  <div className="">
                    {moment(note.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </div>
                </div>
              </Link>
            </List.Item>
          ))}
        </List>
      </Col>
      <Col span={16} className="h-[600px] overflow-y-auto">
        {id && id.length && id[2] && <NoteEditor />}
      </Col>
    </Row>
  );
};

export default NoteList;
