import Editor from '../../components/blog/Editor';
import Tag from '../../components/blog/Tag';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreatePostMutation, useUpdatePostMutation, useGetPostByIdQuery } from '@/redux/api/postApi';

const AdminPostEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [postId, setPostId] = useState<number>(-1);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  //초기값 query
  const { data: intialState, error: queryError } = useGetPostByIdQuery(postId, {
    skip: postId === -1,
  });
  //포스트 생성, 포스트 수정 Mutation
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdatingPost }] = useUpdatePostMutation();

  //create 와 update를 구분하기위한 Param
  useEffect(() => {
    if (id) {
      setPostId(parseInt(id));
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
      setTitle(intialState.title);
      setContent(intialState.content);
      setTags(intialState.tags);
    }
  }, [intialState]);

  const handleTagsBlur = (data: string[]) => {
    setTags([...data]);
  };
  const handleContentBlur = (data: string) => {
    setContent(data);
  };

  const handleSubmitClick = () => {
    const postData = {
      title,
      content,
      tags,
    };
    if (postId === -1) {
      //create
      createPost(postData);
    } else {
      //update
      updatePost({ postId, ...postData });
    }
    navigate('/admin/post');
  };

  return (
    <div className='relative flex h-svh w-full flex-col gap-7 px-4 py-8'>
      <div className='my-2 ml-2 text-3xl font-bold text-blue-400'>Post Info</div>
      <div className='input-border'>
        <span className='bg-main-gray-100'>POST</span>
        <input
          className='h-12 w-full px-3 py-2 focus:outline-none'
          defaultValue={title}
          placeholder='프로젝트명을 입력하세요.'
          onBlur={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className='input-border px-3'>
        <span className='bg-main-gray-100'>STACK</span>
        <Tag intialState={tags} onTagBlur={handleTagsBlur} placeholder='포스팅 태그' />
      </div>
      <div className='mt-2 ml-2 text-3xl font-bold text-blue-400'>Content</div>
      <Editor initailState={content} onContentBlur={handleContentBlur} />
      <button
        className='fixed right-5 bottom-5 cursor-pointer rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-400 sm:bg-blue-200'
        onClick={handleSubmitClick}
        disabled={isCreatingPost || isUpdatingPost}
      >
        {isCreatingPost || isUpdatingPost ? '..Loading' : '작성하기'}
      </button>
    </div>
  );
};

export default AdminPostEdit;
