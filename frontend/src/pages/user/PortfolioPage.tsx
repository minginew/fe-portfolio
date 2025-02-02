import About from '../../components/portfolio/About';
import Award from '../../components/portfolio/Award';
import Certificate from '../../components/portfolio/Certificate';
import Education from '../../components/portfolio/Education';
import Project from '../../components/portfolio/Project';
import Skill from '../../components/portfolio/Skill';

const PortfolioPage = () => {
  return (
    <main className='h-auto w-full px-5 py-10'>
      <div className='flex h-svh w-full items-center justify-center bg-gray-600'>
        <span className='h-20 text-5xl'>MainPage</span>
      </div>
      <section className='bg-red-300'>
        <About />
      </section>
      <section className='bg-orange-300'>
        <Skill />
      </section>
      <section className='bg-yellow-300'>
        <Education />
      </section>
      <section className='bg-green-300'>
        <Award />
      </section>
      <section className='bg-blue-300'>
        <Certificate />
      </section>
      <section className='bg-purple-300'>
        <Project />
      </section>
    </main>
  );
};
export default PortfolioPage;
