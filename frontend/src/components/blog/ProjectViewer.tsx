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
import { useGetProjectByIdQuery } from '../../redux/api/projectApi';

//react
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const lowlight = createLowlight(all);
const ProjectViewer = () => {
  const { id } = useParams();
  const [projectId, setProjectId] = useState<number>(-1);
  const [title, setTitle] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [techstack, setTechstack] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  //초기값 query
  const { data: initailState } = useGetProjectByIdQuery(projectId, {
    skip: projectId === -1,
  });

  //url param 가져오기
  useEffect(() => {
    if (id) {
      setProjectId(parseInt(id));
    }
  }, [id]);

  //Project viewer 초기값
  useEffect(() => {
    if (initailState) {
      setTitle(initailState.title);
      setRoles([...initailState.roles]);
      setTechstack([...initailState.techstack]);
      setStartDate(initailState.startDate);
      setEndDate(initailState.endDate);

      editor?.commands.setContent(initailState.content);
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
    <div className='flex h-full w-full flex-col gap-4'>
      <div className='my-3 text-4xl font-bold text-gray-800'> {title}</div>
      <div className='flex items-center font-medium'>
        <span className='w-30 text-gray-600'>프로젝트 기간</span>
        <div className='flex w-full gap-2 pl-4'>
          <div>{startDate}</div>
          <>~</>
          <div>{endDate}</div>
        </div>
      </div>
      <div className='flex items-center font-medium'>
        <span className='w-30 text-gray-600'>기술 스택</span>
        <div className='flex w-full flex-wrap gap-4'>
          {techstack.map((tag, index) => {
            return (
              <span className='rounded-2xl bg-blue-100 px-3 py-1 text-xs text-blue-600' key={index}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className='flex items-center font-medium'>
        <span className='w-30 text-gray-600'>담당 역할</span>
        <div className='flex w-full flex-wrap gap-4'>
          {roles.map((tag, index) => {
            return (
              <span className='rounded-2xl bg-blue-100 px-3 py-1 text-xs text-blue-600' key={index}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      <div className='mt-5 border-t-1 border-gray-500 pt-5'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
export default ProjectViewer;
