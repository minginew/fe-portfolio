import { useNavigate } from 'react-router-dom';
import { useGetProjectsQuery } from '../../redux/api/projectApi';
const AdminProjectList = () => {
  const { data } = useGetProjectsQuery();
  const navigator = useNavigate();
  const handleCreateProject = () => {
    navigator('edit');
  };

  return (
    <div className='flex w-full flex-col items-center px-2'>
      <div className='border-main-blue text-main-blue mb-5 flex h-28 w-full items-center justify-between border-b-1 px-2'>
        <div className='font-museo px-2 py-4 text-4xl font-bold'>PROJECT</div>
        <button
          className='hover:bg-main-blue h-10 cursor-pointer rounded-lg bg-blue-400 px-3 text-white'
          onClick={handleCreateProject}
        >
          <span>작성하기</span>
        </button>
      </div>
      <div className='my-5 flex w-full flex-col gap-4 px-2'>
        {data?.map((project) => (
          <div
            key={project.projectId}
            className='flex w-full cursor-pointer flex-col rounded-lg bg-white p-5 drop-shadow-md'
            onClick={() => {
              navigator(`${project.projectId}`);
            }}
          >
            <div className='mb-4 text-xl font-bold'>{project.title}</div>
            <div className='mb-4 flex h-48 w-full items-center justify-center rounded-t-3xl bg-blue-200'>
              <img alt='logo' className='h-full w-full rounded-t-3xl object-cover' src={project.thumbnail} />
            </div>
            <div className='text-main-gray-200 mb-4 flex gap-1'>
              <span>{project.startDate}</span>
              <span>~</span>
              <span>{project.endDate}</span>
            </div>
            <div className='mb-4'>{project.summary}</div>
            <div className='mb-3 flex gap-3'>
              {project.techstack?.map((stack, index) => (
                <div key={index} className='rounded-2xl bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600'>
                  {stack}
                </div>
              ))}
            </div>
            <div className='flex gap-3'>
              {project.roles?.map((role, index) => (
                <div key={index} className='rounded-2xl bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600'>
                  {role}
                </div>
              ))}
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminProjectList;
