import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Skill = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(titleRef);
  useFadeAnimation(skillRef);
  return (
    <article className='mb-30 w-full'>
      <div ref={titleRef} className='flex justify-center text-4xl'>
        <div>Skill</div>
      </div>
      <div ref={skillRef} className='bg-main-black-100 mt-10 grid grid-cols-1 gap-5 p-3'>
        <div className='relative'>
          <div className='bg-main-black-100 mb-3 grid items-center justify-items-center text-xl'>Friendly</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] gap-3 px-10 duration-500 sm:place-content-center'>
            <img className='h-12 w-12' alt='html icon' src='src/assets/icons/brand/HTML.svg' />
            <img className='h-12 w-12' alt='css icon' src='src/assets/icons/brand/CSS.svg' />
            <img className='h-12 w-12' alt='javascript icon' src='src/assets/icons/brand/JavaScript.svg' />
            <img className='h-12 w-12' alt='typescript icon' src='src/assets/icons/brand/TypeScript.svg' />
            <img className='h-12 w-12' alt='java icon' src='src/assets/icons/brand/Java-Light.svg' />
            <img className='h-12 w-12' alt='react icon' src='src/assets/icons/brand/React-Dark.svg' />
            <img className='h-12 w-12' alt='redux icon' src='src/assets/icons/brand/Redux.svg' />
            <img className='h-12 w-12' alt='tailwind icon' src='src/assets/icons/brand/TailwindCSS-Light.svg' />
            <img className='h-12 w-12' alt='d3 icon' src='src/assets/icons/brand/D3-Light.svg' />
          </div>
        </div>
        <div className='relative'>
          <div className='bg-main-black-100 mt-5 mb-3 grid items-center justify-items-center text-xl'>Used</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] gap-3 px-10 duration-500 sm:place-content-center'>
            <img className='h-12 w-12' alt='vue icon' src='src/assets/icons/brand/VueJS-Light.svg' />
            <img className='h-12 w-12' alt='spring icon' src='src/assets/icons/brand/Spring-Light.svg' />
            <img className='h-12 w-12' alt='mysql icon' src='src/assets/icons/brand/MySQL-Light.svg' />
            <img className='h-12 w-12' alt='supabase icon' src='src/assets/icons/brand/Supabase-Light.svg' />
          </div>
        </div>
        <div className='relative'>
          <div className='bg-main-black-100 mt-5 mb-3 grid items-center justify-items-center text-xl'>Tools</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] gap-3 px-10 sm:place-content-center'>
            <img className='h-12 w-12' alt='git icon' src='src/assets/icons/brand/Git.svg' />
            <img className='h-12 w-12' alt='github icon' src='src/assets/icons/brand/Github-Light.svg' />
            <img className='h-12 w-12' alt='vscode icon' src='src/assets/icons/brand/VSCode-Light.svg' />
            <img className='h-12 w-12' alt='figma icon' src='src/assets/icons/brand/Figma-Light.svg' />
            <img className='h-12 w-12' alt='Idea icon' src='src/assets/icons/brand/Idea-Light.svg' />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Skill;
