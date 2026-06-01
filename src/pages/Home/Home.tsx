import { FC } from 'react';

import HeroSection from './components/HeroSection';
import SpecialtiesSection from './components/SpecialtiesSection';
import StatsSection from './components/StatsSection';
import HowItWorksSection from './components/HowItWorksSection';
import DoctorsSection from './components/DoctorsSection';

const Home: FC = () => {
  return (
    <>
      <HeroSection />
      <SpecialtiesSection />
      <StatsSection />
      <HowItWorksSection />
      <DoctorsSection />
    </>
  );
};

export default Home;
