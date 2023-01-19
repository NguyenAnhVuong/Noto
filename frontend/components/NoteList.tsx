import { Col, List, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Note } from './Note';

type Props = {
  id: string[];
};

const NoteList = ({ id }: Props) => {
  const router: any = useRouter();
  const folder = {
    notes: [
      { id: '1', content: 'This is new note' },
      { id: '2', content: 'This is new note 2' },
      { id: '3', content: 'This is new note 3' },
    ],
  };

  return (
    <Row>
      <Col className="p-2 bg-[#F0EBE3]" span={8}>
        <h2 className="font-semibold ">Notes</h2>
        <List>
          {folder.notes.map((note: any) => (
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
                className="h-full w-full"
                href={
                  '/folders/' + (id && id.length && id[0]) + '/note/' + note.id
                }
              >
                {note.content}
              </Link>
            </List.Item>
          ))}
        </List>
      </Col>
      <Col span={16}>
        <Note />
      </Col>
    </Row>
  );
};

export default NoteList;
