import { Container } from './Container/Container';
import { Sidebar } from './Sidebar/Sidebar';

import './Layout.scss';

export const Layout = () => {
  return (
    <div className="root-layout">
      <Sidebar />
      <Container />
    </div>
  );
};
