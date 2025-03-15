import { Project } from '@/redux/redux';
import { useNavigate } from 'react-router-dom';

const Card = ({ data }: { data: Project }) => {
  const navigator = useNavigate();
  // id까지 받아서 하드코딩
  // 클릭시 project/:id로 라우팅
  // or project list는 미리 쿼리를 받아서, 캐싱해두기..?
  return (
    <div
      key={data.projectId}
      className='group bg-main-black-50 text-main-gray-100 flex h-[480px] w-96 cursor-pointer flex-col justify-center rounded-lg p-5 font-sans shadow-xl shadow-black/50 duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-black'
      onClick={() => {
        navigator(`/project/${data.projectId}`);
      }}
    >
      <div className='mb-4 text-xl font-bold'>{data.title}</div>
      <div className='bg-main-gray-100 mb-2 flex h-48 w-full items-center justify-center overflow-hidden rounded-t-3xl'>
        <img
          alt='logo'
          className='h-full w-full object-cover duration-500 group-hover:scale-125'
          src={data.thumbnail}
        />
      </div>
      <div className='mb-4 flex gap-1 text-gray-400'>
        <span>{data.startDate}</span>
        <span>~</span>
        <span>{data.endDate}</span>
      </div>
      <div className='mb-4 text-gray-200'>{data.summary}</div>
      <div className='mb-3 flex gap-3'>
        {data.techstack?.map((stack, index) => (
          <div key={index} className='rounded-2xl bg-[#3A86FF] px-4 py-2 text-xs font-bold text-white'>
            {stack}
          </div>
        ))}
      </div>
      <div className='flex gap-3'>
        {data.roles?.map((role, index) => (
          <div key={index} className='rounded-2xl bg-[#3A86FF] px-4 py-2 text-xs font-bold text-white'>
            {role}
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Card;
