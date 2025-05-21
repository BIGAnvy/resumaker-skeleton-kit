
import { useParams } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import ResumeBuilder from '../components/builder/ResumeBuilder';

const ResumeBuilderPage = () => {
  const { id } = useParams();
  
  return (
    <AppLayout>
      <ResumeBuilder />
    </AppLayout>
  );
};

export default ResumeBuilderPage;
