
import AppLayout from '../components/layout/AppLayout';
import AIChatWizard from '../components/ai/AIChatWizard';

const AIResumeWizardPage = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50/30">
        <AIChatWizard />
      </div>
    </AppLayout>
  );
};

export default AIResumeWizardPage;
