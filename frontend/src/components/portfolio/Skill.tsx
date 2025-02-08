import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Skill = () => {
  const skillRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(skillRef);
  useFadeAnimation(skillsRef);
  return (
    <div className='relative h-[1000px] w-full'>
      <div ref={skillRef} className='absolute left-[50%] -translate-x-[50%] text-4xl'>
        <div>SKILL</div>
      </div>
      <div ref={skillsRef} className='bg-main-black-100 mt-15 grid grid-cols-1 gap-5 p-5'>
        <div className='relative'>
          <div className='bg-main-black-100 mb-3 grid items-center justify-items-center text-xl'>Friendly</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] gap-3 px-10'>
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/HTML.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/CSS.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/JavaScript.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/TypeScript.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/Java-Light.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/React-Dark.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/Redux.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/TailwindCSS-Light.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/D3-Light.svg' />
          </div>
        </div>
        <div className='relative'>
          <div className='bg-main-black-100 mt-5 mb-3 grid items-center justify-items-center text-xl'>Used</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] gap-3 px-10'>
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/VueJS-Light.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/Spring-Light.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/MySQL-Light.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/Supabase-Light.svg' />
          </div>
        </div>
        <div className='relative'>
          <div className='bg-main-black-100 mt-5 mb-3 grid items-center justify-items-center text-xl'>Tools</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] gap-3 px-10'>
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/Git.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/Github-Light.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/VSCode-Light.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/Figma-Light.svg' />
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/Idea-Light.svg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;
