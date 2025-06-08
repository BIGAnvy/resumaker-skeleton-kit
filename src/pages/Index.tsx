
import LandingPage from '../components/landing/LandingPage';
import { LocalizationProvider } from '../contexts/LocalizationContext';

const Index = () => {
  return (
    <LocalizationProvider>
      <LandingPage />
    </LocalizationProvider>
  );
};

export default Index;
