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
import { useFadeAnimation } from '@hooks/useAnimation';

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
      <div ref={skillRef} className='bg-main-black-100 mt-10 grid grid-cols-1 gap-5 p-3 font-sans'>
        <div className='relative'>
          <div className='bg-main-black-100 mb-3 grid items-center justify-items-center text-xl'>Friendly</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] place-content-center gap-3 px-10'>
            {[
              { icon: HTML, text: 'HTML' },
              { icon: CSS, text: 'CSS' },
              { icon: JavaScript, text: 'JavaScript' },
              { icon: TypeScript, text: 'TypeScript' },
              { icon: JavaLight, text: 'Java' },
              { icon: ReactDark, text: 'React' },
              { icon: Redux, text: 'Redux' },
              { icon: TailwindCSS, text: 'TailwindCSS' },
              { icon: D3, text: 'D3.js' },
            ].map((item, idx) => (
              <div key={idx} className='group relative'>
                <img className='h-12 w-12' alt={`${item.text} icon`} src={item.icon} />
                <span className='absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='relative'>
          <div className='bg-main-black-100 mt-5 mb-3 grid items-center justify-items-center text-xl'>Used</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] place-content-center gap-3 px-10'>
            {[
              { icon: VueJS, text: 'VueJS' },
              { icon: Spring, text: 'Spring' },
              { icon: MySQL, text: 'MySQL' },
              { icon: Supabase, text: 'Supabase' },
            ].map((item, idx) => (
              <div key={idx} className='group relative'>
                <img className='h-12 w-12' alt={`${item.text} icon`} src={item.icon} />
                <span className='absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-gray-800 px-2 py-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='relative'>
          <div className='bg-main-black-100 mt-5 mb-3 grid items-center justify-items-center text-xl'>Tools</div>
          <div className='box-b-border grid grid-cols-[repeat(auto-fit,_max(48px))] place-content-center gap-3 px-10'>
            {[
              { icon: Git, text: 'Git' },
              { icon: Github, text: 'GitHub' },
              { icon: VSCode, text: 'VSCode' },
              { icon: Figma, text: 'Figma' },
              { icon: Idea, text: 'IntelliJ' },
            ].map((item, idx) => (
              <div key={idx} className='group relative'>
                <img className='h-12 w-12' alt={`${item.text} icon`} src={item.icon} />
                <span className='absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Skill;
