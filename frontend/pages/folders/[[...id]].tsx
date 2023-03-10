import FolderList from '@/components/FolderList';
import Loading from '@/components/Loading';
import NoteList from '@/components/NoteList';
import UserMenu from '@/components/UserMenu';
import { getFolders } from '@/graphql-client/queries';
import { useQuery } from '@apollo/client';
import { Col, Row, Spin } from 'antd';
import { useRouter } from 'next/router';

export default function Folder() {
  const router: any = useRouter();
  const { loading, error, data } = useQuery(getFolders);

  if (loading) return <Loading />;
  if (error) return <p>Error :</p>;
  return (
    <div className="flex justify-center mt-9 ">
      <div className="w-[1200px] flex flex-col relative">
        <span className="text-4xl text-center">Noto</span>
        <div className="absolute right-0 top-12">
          <UserMenu />
        </div>
        <Row className="mt-24 shadow-md rounded-lg overflow-hidden">
          <Col span={6}>
            <FolderList folders={data.folders} id={router.query.id} />
          </Col>
          {router.query.id && router.query.id.length && (
            <Col span={18}>
              <NoteList id={router.query.id} />
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}
