import Navbar from './Navbar';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ padding: '0 20px' }}>{children}</main>
  </>
);

export default Layout;
