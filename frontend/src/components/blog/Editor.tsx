import Toolbar from './Toolbar';

//editor
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

//lowlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';

//StorageApi
import { useUploadProjectFileMutation, useUploadPostFileMutation } from '@/redux/api/storageApi';

//react
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/router';

interface Props {
  initailState: string;
  onContentBlur(data: string): void;
}
const lowlight = createLowlight(all);

const Editor = ({ initailState, onContentBlur }: Props) => {
  const location = useLocation();

  //Mutation
  const [uploadProjectFile] = useUploadProjectFileMutation();
  const [uploadPostFile] = useUploadPostFileMutation();

  useEffect(() => {
    if (!initailState) return;
    editor?.commands.setContent(initailState);
  }, [initailState]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      ListItem,
      TiptapImage.configure({ inline: true, allowBase64: true }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'language-js',
        },
      }),
    ],
    content: '',
  const editorProps = {
    attributes: {
      class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl w-full h-full focus:outline-none',
    },
  };

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent
        className='w-full px-4 pb-4'
        editor={editor}
        onBlur={() => onContentBlur(editor?.getHTML() || '')}
      />
    </>
  );
};
export default Editor;
