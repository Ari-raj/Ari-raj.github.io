
import React, { useContext } from 'react';
import { DesktopContext } from '../App';
import Window from '../components/SectionWrapper';
import ActivitiesView from './ActivitiesView';

import ListViewApp from './ProjectsListPage';
import TerminalApp from './AboutPage';
import AdminPanelApp from './CertificatesListPage';
import LoginScreen from './CertificateDetailPage';
import AboutApp from './SkillsPage';
import ContactFormApp from './EducationPage';
import SkillsApp from './ContactPage';
import DocumentViewerApp from './ProjectDetailPage';
import PhoneApp from '../components/AnimatedText';
import EducationApp from '../components/icons';


const appComponentMap = {
    projects: ListViewApp,
    certificates: ListViewApp,
    skills: SkillsApp,
    education: EducationApp,
    terminal: TerminalApp,
    admin: AdminPanelApp,
    login: LoginScreen,
    about: AboutApp,
    gmail: ContactFormApp,
    phone: PhoneApp,
    viewer: DocumentViewerApp,
    // External links don't have components
    linkedin: () => null, 
    github: () => null,
};

interface HomePageProps {
  onLoginSuccess: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoginSuccess }) => {
  const { windows } = useContext(DesktopContext);

  return (
    <div style={{
        position: 'relative',
        flexGrow: 1,
        height: 'calc(100vh - 40px)',
        overflow: 'hidden',
    }}>
      <ActivitiesView />
      {windows.map(win => {
        const AppComponent = appComponentMap[win.appId as keyof typeof appComponentMap];

        // Explicitly handle LoginScreen to ensure onLoginSuccess is passed correctly.
        if (win.appId === 'login') {
            return (
                <Window key={win.id} instance={win}>
                    <LoginScreen onLoginSuccess={onLoginSuccess} />
                </Window>
            );
        }
        
        return (
          <Window key={win.id} instance={win}>
            {AppComponent ? <AppComponent {...win.data} /> : <div>App not found</div>}
          </Window>
        );
      })}
    </div>
  );
};

export default HomePage;
