//editor
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ImageResize from 'tiptap-extension-resize-image';

//lowlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { grammars } from '@/util/grammars';

//Project API
import { useGetProjectByIdQuery } from '@redux/api/projectApi';

//react
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import GitHubIcon from '@icons/brand/Github-Dark.svg';

const lowlight = createLowlight(grammars);
const ProjectViewer = () => {
  const { id } = useParams();
  const [projectId, setProjectId] = useState<number>(-1);
  const [title, setTitle] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [techstack, setTechstack] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [gitHub, setGitHub] = useState<string>('');

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
      setGitHub(initailState.gitHub);
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
      ImageResize,
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
        <span className='w-32 text-gray-600'>프로젝트 기간</span>
        <div className='flex w-full gap-2 pl-4'>
          <div>{startDate}</div>
          <>~</>
          <div>{endDate}</div>
        </div>
      </div>
      <div className='flex items-center font-medium'>
        <span className='w-32 text-gray-600'>기술 스택</span>
        <div className='flex w-full gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
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
        <span className='w-32 text-gray-600'>담당 역할</span>
        <div className='flex w-full gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
          {roles.map((tag, index) => {
            return (
              <span className='rounded-2xl bg-blue-100 px-3 py-1 text-xs text-blue-600' key={index}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      <a href={gitHub} target='_blank' rel='noopener noreferrer' className='group mt-3 flex pl-1 font-medium'>
        <img
          src={GitHubIcon}
          alt='github icon'
          className='w-7 opacity-70 transition-opacity duration-300 group-hover:opacity-100'
        />
        <p className='mx-2 text-xl font-bold text-gray-500 transition-colors duration-300 group-hover:text-gray-800'>
          GitHub Repository
        </p>
      </a>

      <div className='mt-3 border-t-1 border-gray-500 pt-10'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
export default ProjectViewer;
