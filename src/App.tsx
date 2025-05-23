
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";
import ResumesPage from "./pages/ResumesPage";
import CoverLettersPage from "./pages/CoverLettersPage";
import ProfilePage from "./pages/ProfilePage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import SettingsPage from "./pages/SettingsPage";
import CoverLetterEditorPage from "./pages/CoverLetterEditorPage";
import TemplateGalleryPage from "./pages/TemplateGalleryPage";
import LocalizationSettingsPage from "./pages/LocalizationSettingsPage";
import AIChatWizardPage from "./pages/AIChatWizardPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/resumes" element={<ResumesPage />} />
          <Route path="/cover-letters" element={<CoverLettersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resume-builder/:id" element={<ResumeBuilderPage />} />
          <Route path="/resume-builder/new" element={<ResumeBuilderPage />} />
          <Route path="/cover-letter/:id" element={<CoverLetterEditorPage />} />
          <Route path="/cover-letter/new" element={<CoverLetterEditorPage />} />
          <Route path="/templates" element={<TemplateGalleryPage />} />
          <Route path="/settings/localization" element={<LocalizationSettingsPage />} />
          <Route path="/settings/profile" element={<ProfileSettingsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/ai-wizard" element={<AIChatWizardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
