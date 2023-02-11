import React from 'react';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';
import AwardWinning from './AwardWinning';
import ContactUs from './ContactUs';
import Counter from './Counter';
import WelcomeScreen from './WelcomeScreen';

const About = () => {
  useTitle('RedPanda - About Us');
  return (
    <PageHeader pageName="About Us ">
      <WelcomeScreen />
      <AwardWinning />
      <Counter />
      <ContactUs />
    </PageHeader>
  );
};

export default About;
