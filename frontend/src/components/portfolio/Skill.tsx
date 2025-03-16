import HTML from '@icons/brand/HTML.svg';
import CSS from '@icons/brand/CSS.svg';
import JavaScript from '@icons/brand/JavaScript.svg';
import TypeScript from '@icons/brand/TypeScript.svg';
import JavaLight from '@icons/brand/Java-Light.svg';
import ReactDark from '@icons/brand/React-Dark.svg';
import Redux from '@icons/brand/Redux.svg';
import TailwindCSS from '@icons/brand/TailwindCSS-Light.svg';
import D3 from '@icons/brand/D3-Light.svg';
import VueJS from '@icons/brand/VueJS-Light.svg';
import Spring from '@icons/brand/Spring-Light.svg';
import MySQL from '@icons/brand/MySQL-Light.svg';
import Supabase from '@icons/brand/Supabase-Light.svg';
import Git from '@icons/brand/Git.svg';
import Github from '@icons/brand/Github-Light.svg';
import VSCode from '@icons/brand/VSCode-Light.svg';
import Figma from '@icons/brand/Figma-Light.svg';
import Idea from '@icons/brand/Idea-Light.svg';

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
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] place-content-center gap-3 px-10 duration-500'>
            <img className='h-12 w-12' alt='html icon' src={HTML} />
            <img className='h-12 w-12' alt='css icon' src={CSS} />
            <img className='h-12 w-12' alt='javascript icon' src={JavaScript} />
            <img className='h-12 w-12' alt='typescript icon' src={TypeScript} />
            <img className='h-12 w-12' alt='java icon' src={JavaLight} />
            <img className='h-12 w-12' alt='react icon' src={ReactDark} />
            <img className='h-12 w-12' alt='redux icon' src={Redux} />
            <img className='h-12 w-12' alt='tailwind icon' src={TailwindCSS} />
            <img className='h-12 w-12' alt='d3 icon' src={D3} />
          </div>
        </div>
        <div className='relative'>
          <div className='bg-main-black-100 mt-5 mb-3 grid items-center justify-items-center text-xl'>Used</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] place-content-center gap-3 px-10 duration-500'>
            <img className='h-12 w-12' alt='vue icon' src={VueJS} />
            <img className='h-12 w-12' alt='spring icon' src={Spring} />
            <img className='h-12 w-12' alt='mysql icon' src={MySQL} />
            <img className='h-12 w-12' alt='supabase icon' src={Supabase} />
          </div>
        </div>
        <div className='relative'>
          <div className='bg-main-black-100 mt-5 mb-3 grid items-center justify-items-center text-xl'>Tools</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] place-content-center gap-3 px-10'>
            <img className='h-12 w-12' alt='git icon' src={Git} />
            <img className='h-12 w-12' alt='github icon' src={Github} />
            <img className='h-12 w-12' alt='vscode icon' src={VSCode} />
            <img className='h-12 w-12' alt='figma icon' src={Figma} />
            <img className='h-12 w-12' alt='Idea icon' src={Idea} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Skill;
