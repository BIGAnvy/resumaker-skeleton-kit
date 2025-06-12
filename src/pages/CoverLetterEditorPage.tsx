
import CoverLetterEditor from '../components/coverLetter/CoverLetterEditor';
import { useParams } from 'react-router-dom';

const CoverLetterEditorPage = () => {
  const { id } = useParams();
  
  return <CoverLetterEditor />;
};

export default CoverLetterEditorPage;
