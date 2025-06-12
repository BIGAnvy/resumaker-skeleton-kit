
import { useParams } from 'react-router-dom';
import ResumeBuilder from '../components/builder/ResumeBuilder';

const ResumeBuilderPage = () => {
  const { id } = useParams();
  
  return <ResumeBuilder />;
};

export default ResumeBuilderPage;
