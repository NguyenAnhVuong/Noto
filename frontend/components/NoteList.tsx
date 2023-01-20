import { getFolder } from '@/graphql-client/queries';
import { useQuery } from '@apollo/client';
import { Col, List, Row } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import Loading from './Loading';
import { Note } from './Note';

type Props = {
  id: string[];
};

const NoteList = ({ id }: Props) => {
  const { loading, error, data } = useQuery(getFolder, {
    variables: { id: Number(id[0]) },
    skip: !id || !id.length,
  });
  if (loading) return <Loading />;
  if (error) return <p>Error :</p>;

  return (
    <Row>
      <Col className="p-2 bg-[#F0EBE3]" span={8}>
        <span className="font-semibold ">Notes</span>
        <List>
          {data.folder.notes.map((note: any) => (
            <List.Item
              className={
                (id && id.length && id[2] == note.id
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
                <div
                  className="font-semibold "
                  dangerouslySetInnerHTML={{
                    __html: `${note.content.substring(0, 30) || 'Empty'}`,
                  }}
                />
                <div className="">
                  {moment(note.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </div>
              </Link>
            </List.Item>
          ))}
        </List>
      </Col>
      <Col span={16}>{id && id.length && id[2] && <Note />}</Col>
    </Row>
  );
};

export default NoteList;
