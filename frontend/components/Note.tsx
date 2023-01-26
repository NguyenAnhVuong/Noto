import { updateNoteMutation } from '@/graphql-client/mutations';
import { getFolder, getNote } from '@/graphql-client/queries';
import { Note } from '@/models';
import { useMutation, useQuery } from '@apollo/client';
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import Loading from './Loading';

// fix bug window is not defined when using react-draft-wysiwyg in nextjs
const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export const NoteEditor = () => {
  const [note, setNote] = useState<Note>({
    id: 0,
    content: '',
  });
  const router = useRouter();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  const [
    updateNote,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(updateNoteMutation);
  const typingTimeoutRef = useRef<any>(null);

  const handleUpdateNote = (content: string) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (note.content !== content && content.length !== 8) {
      typingTimeoutRef.current = setTimeout(async () => {
        await updateNote({
          variables: {
            id: note.id,
            content,
          },
          refetchQueries: [
            {
              query: getFolder,
              variables: { id: Number(router.query.id && router.query.id[0]) },
            },
          ],
          onCompleted: () => {
            setNote({
              id: note.id,
              content,
            });
          },
        });
      }, 1000);
    }
  };

  const handleOnChange = (e: any) => {
    setEditorState(e);
    handleUpdateNote(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  const { loading, error, data } = useQuery(getNote, {
    variables: {
      id: Number(router.query.id && router.query.id[2]),
    },
    skip: !router.query.id || !router.query.id[2],
    onCompleted: (data) => {
      setNote({
        ...data.note,
      });
    },
  });

  if (loading || !note) return <Loading />;
  if (error) return <p>Error:</p>;

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something!"
    />
  );
};
