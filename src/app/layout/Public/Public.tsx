import { Outlet } from 'react-router-dom';
import { AppContextWrapper } from 'app/context';
import { TopBar } from 'app/components/TopBar';

export const PublicLayout: React.FC = () => {
  return (
    <AppContextWrapper>
      <TopBar />
      <Outlet />
    </AppContextWrapper>
  );
};
