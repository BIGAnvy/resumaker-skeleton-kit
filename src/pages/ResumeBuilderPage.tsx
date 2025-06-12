
import { useParams } from 'react-router-dom';
import ResumeBuilder from '../components/builder/ResumeBuilder';

const ResumeBuilderPage = () => {
  const { id } = useParams();
  
  return (
    <div className="h-full">
      <ResumeBuilder />
    </div>
  );
};

export default ResumeBuilderPage;
