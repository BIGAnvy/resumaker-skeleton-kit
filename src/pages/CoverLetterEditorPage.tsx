
import AppLayout from '../components/layout/AppLayout';
import CoverLetterEditor from '../components/coverLetter/CoverLetterEditor';
import { useParams } from 'react-router-dom';

const CoverLetterEditorPage = () => {
  const { id } = useParams();
  
  return (
    <AppLayout>
      <CoverLetterEditor />
    </AppLayout>
  );
};

export default CoverLetterEditorPage;
