import Editor from '../blog/Editor';
import Tag from '../blog/Tag';
import { useEffect, useState } from 'react';
import { useUploadThumbnailMutation } from '@/redux/api/storageApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectByIdQuery } from '@/redux/api/projectApi';
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/redux/api/projectApi';

const AdminProjectEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [projectId, setProjectId] = useState<number>(-1);
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [techstack, setTechstack] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [content, setContent] = useState<string>('');

  //초기값 query
  const { data: intialState, error: queryError } = useGetProjectByIdQuery(projectId, {
    skip: projectId === -1,
  });
  //썸네일, 프로젝트 생성, 프로젝트 수정 Mutation
  const [uploadThumbnail, { isLoading: isUploadingThumbnail }] = useUploadThumbnailMutation();
  const [createProject, { isLoading: isCreatingProject }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdatingProject }] = useUpdateProjectMutation();

  //create 와 update를 구분하기위한 Param
  useEffect(() => {
    if (id) {
      setProjectId(parseInt(id));
    }
  }, [id]);

  //잘못된 id로 접근할 경우 리다이렉트
  useEffect(() => {
    if (queryError) {
      navigate('/admin');
    }
  }, [queryError]);

  //게시글을 update 하는경우 초기값 초기화
  useEffect(() => {
    if (intialState) {
      console.log(intialState.title);
      setTitle(intialState.title);
      setSummary(intialState.summary);
      setRoles([...intialState.roles]);
      setTechstack([...intialState.techstack]);
      setStartDate(intialState.startDate);
      setEndDate(intialState.endDate);
      setThumbnail(intialState.thumbnail);
      setContent(intialState.content);
      console.log(intialState.content);
    }
  }, [intialState]);

  const handleRolesBlur = (data: string[]) => {
    console.log(data);
    setRoles([...data]);
  };
  const handleTechstackBlur = (data: string[]) => {
    console.log(data);
    setTechstack([...data]);
  };
  const handleContentBlur = (data: string) => {
    console.log(data);
    setContent(data);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const { data } = await uploadThumbnail(file);
      if (data) {
        setThumbnail(data.url);
      }
    }
  };

  const handleSubmitClick = () => {
    const projectData = {
      title,
      content,
      roles,
      techstack,
      summary,
      thumbnail,
      startDate,
      endDate,
    };
    if (projectId === -1) {
      //create
      createProject(projectData);
    } else {
      //update
      updateProject({ projectId, ...projectData });
    }
    navigate('/admin');
  };

  return (
    <div className='relative flex h-svh w-full flex-col gap-7 p-4'>
      <div className='my-2 ml-2 text-3xl font-bold text-blue-400'>Project Info</div>
      <div className='input-border'>
        <span className='bg-main-gray-100'>PROJECT</span>
        <input
          className='h-12 w-full px-3 py-2 focus:outline-none'
          defaultValue={title}
          placeholder='프로젝트명을 입력하세요.'
          onBlur={(e) => {
            console.log(e.target.value);
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className='input-border'>
        <span className='bg-main-gray-100'>SUMMARY</span>
        <textarea
          className='h-20 w-full px-3 py-2 focus:outline-none'
          defaultValue={summary}
          placeholder='프로젝트 소개를 작성하세요.'
          onBlur={(e) => {
            console.log(e.target.value);
            setSummary(e.target.value);
          }}
        />
      </div>
      <div className='input-border px-3'>
        <span className='bg-main-gray-100'>STACK</span>
        <Tag intialState={techstack} onTagBlur={handleTechstackBlur} placeholder='주요 기술스택' />
      </div>
      <div className='input-border px-3'>
        <span className='bg-main-gray-100'>ROLE</span>
        <Tag intialState={roles} onTagBlur={handleRolesBlur} placeholder='맡은 역할' />
      </div>
      <div className='flex gap-5'>
        <div className='input-border px-3'>
          <span className='bg-main-gray-100'>START DATE</span>
          <input
            className='h-9 w-38 px-3 py-2 focus:outline-none'
            defaultValue={startDate}
            placeholder='YYYY / MM'
            onBlur={(e) => {
              console.log(e.target.value);
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className='input-border px-3'>
          <span className='bg-main-gray-100'>END DATE</span>
          <input
            className='h-9 w-38 px-3 py-2 focus:outline-none'
            defaultValue={endDate}
            placeholder='YYYY / MM'
            onBlur={(e) => {
              console.log(e.target.value);
              setEndDate(e.target.value);
            }}
          />
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <div className='input-border w-60 px-3'>
          <span className='bg-main-gray-100'>THUMB NAIL</span>
          <div className='flex h-9 items-center truncate px-2'>{thumbnail ? thumbnail : file?.name}</div>
          <input
            id='file-upload'
            disabled={isUploadingThumbnail}
            className='hidden'
            type='file'
            onChange={handleFileChange}
            accept='image/*'
          />
        </div>
        <label
          htmlFor='file-upload'
          className='flex h-9 cursor-pointer items-center rounded-md bg-blue-400 px-3 text-sm text-white hover:bg-blue-400 sm:bg-blue-200'
        >
          {isUploadingThumbnail ? <span> ..Loading </span> : <span>파일 선택</span>}
        </label>
      </div>
      <div className='mt-2 ml-2 text-3xl font-bold text-blue-400'>Content</div>
      <Editor initailState={content} onContentBlur={handleContentBlur} />
      <button
        className='fixed right-5 bottom-5 cursor-pointer rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-400 sm:bg-blue-200'
        onClick={handleSubmitClick}
        disabled={isCreatingProject || isUpdatingProject}
      >
        {isCreatingProject || isUpdatingProject ? '..Loading' : '작성하기'}
      </button>
    </div>
  );
};
export default AdminProjectEdit;
