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

//Project API
import { useGetPostByIdQuery } from '../../redux/api/postApi';

//react
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getKST } from '@/hooks/useDate';

const lowlight = createLowlight(all);
const PostViewer = () => {
  const { id } = useParams();
  const [postId, setPostId] = useState<number>(-1);
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [createAt, setCreateAt] = useState<string>('');

  //초기값 query
  const { data: initailState } = useGetPostByIdQuery(postId, {
    skip: postId === -1,
  });

  //url param 가져오기
  useEffect(() => {
    if (id) {
      setPostId(parseInt(id));
    }
  }, [id]);

  //Project viewer 초기값
  useEffect(() => {
    if (initailState) {
      console.log(initailState.title);
      setTitle(initailState.title);
      setTags([...initailState.tags]);
      setCreateAt(initailState.createAt);
      editor?.commands.setContent(initailState.content);
      console.log(initailState.content);
    }
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
    editable: false, // 편집 불가
  });
  // project의 id를 받아온다
  // query를 이용해 데이터를 받는다.
  // 뿌린다.

  return (
    <div className='flex h-full w-full flex-col gap-3'>
      <div className='my-3 text-4xl font-bold text-gray-800'> {title}</div>
      <div className='flex items-center px-1 font-medium text-gray-400'>
        <span>{getKST(createAt)?.data}</span>
      </div>
      <div className='flex items-center font-medium'>
        <div className='flex w-full flex-wrap gap-4'>
          {tags.map((tag, index) => {
            return (
              <span className='rounded-2xl bg-blue-100 px-3 py-1 text-xs text-blue-600' key={index}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className='mt-1 border-t-1 border-gray-500 pt-5'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default PostViewer;
