import './styles/global.css';
import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import QuoteSection from './components/QuoteSection';
import ProblemSection from './components/ProblemSection';
import GoalSection from './components/GoalSection';
import ToolSection from './components/ToolSection';
import HowItWorksSection from './components/HowItWorksSection';
import PersonaTiersSection from './components/PersonaTiersSection';
import DepartmentUseSection from './components/DepartmentUseSection';
import ValidationSection from './components/ValidationSection';
import OrgAdoptionSection from './components/OrgAdoptionSection';
import OutcomesSection from './components/OutcomesSection';
import NextStepsSection from './components/NextStepsSection';
import TechStackFooter from './components/TechStackFooter';

export default function App() {
  return (
    <>
      <TopNav />
      <main style={{ paddingTop: 56 }}>
        <HeroSection />
        <QuoteSection />
        <ProblemSection />
        <GoalSection />
        <ToolSection />
        <HowItWorksSection />
        <PersonaTiersSection />
        <DepartmentUseSection />
        <ValidationSection />
        <OrgAdoptionSection />
        <OutcomesSection />
        <NextStepsSection />
      </main>
      <TechStackFooter />
    </>
  );
}
