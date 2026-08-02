import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const isHome = location.pathname === '/';
  const isMeetings = location.pathname.startsWith('/meetings');
  const isAi = location.pathname === '/ai-assistant';
  const isTeacher = location.pathname === '/teacher-ai';

  return (
    <header className={`header-area ${sticky ? 'background-header' : ''} header-sticky`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo">Edu Meeting</Link>

              <ul className={`nav ${menuOpen ? 'nav--open' : ''}`}>
                <li>
                  <Link to="/" className={isHome ? 'active' : ''}>Home</Link>
                </li>
                <li>
                  <Link to="/meetings" className={isMeetings ? 'active' : ''}>Meetings</Link>
                </li>
                <li>
                  <Link to="/ai-assistant" className={isAi ? 'active' : ''}>AI Tutor</Link>
                </li>
                <li>
                  <Link to="/teacher-ai" className={isTeacher ? 'active' : ''}>Teacher AI</Link>
                </li>
                <li className="has-sub">
                  <a href="#" onClick={(e) => e.preventDefault()}>Dashboards</a>
                  <ul className="sub-menu">
                    <li><Link to="/dashboard/student">Student Hub</Link></li>
                    <li><Link to="/dashboard/teacher">Teacher Hub</Link></li>
                    <li><Link to="/dashboard/parent">Parent Portal</Link></li>
                    <li><Link to="/dashboard/admin">Admin & ERP</Link></li>
                  </ul>
                </li>
                {isHome && (
                  <li className="scroll-to-section">
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
                  </li>
                )}
              </ul>

              <a className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}>
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
