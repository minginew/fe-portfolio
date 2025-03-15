import About from '../../components/portfolio/About';
import Hero from '../../components/portfolio/Hero';
import Project from '../../components/portfolio/Project';

const PortfolioPage = () => {
  return (
    <div className='font-museo bg-main-gray-100 w-full'>
      <section className='sticky top-0 z-0 h-svh p-3'>
        <Hero />
      </section>
      <section className='bg-main-black-100 relative z-1 flex w-full justify-center rounded-t-3xl'>
        <About />
      </section>
      <section className='bg-main-black-100 relative z-1 rounded-b-3xl'>
        <Project />
      </section>
    </div>
  );
};
export default PortfolioPage;
