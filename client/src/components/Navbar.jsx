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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const isHome = location.pathname === '/';
  const isMeetings = location.pathname === '/meetings' || location.pathname.startsWith('/meetings/');

  return (
    <header className={`header-area ${sticky ? 'background-header' : ''} header-sticky`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* Logo */}
              <Link to="/" className="logo">Edu Meeting</Link>

              {/* Menu */}
              <ul className={`nav ${menuOpen ? 'nav--open' : ''}`}>
                <li className="scroll-to-section">
                  <Link to="/" className={isHome && !isMeetings ? 'active' : ''}>Home</Link>
                </li>
                <li>
                  <Link to="/meetings" className={isMeetings ? 'active' : ''}>Meetings</Link>
                </li>
                {isHome && (
                  <li className="scroll-to-section">
                    <a href="#apply" onClick={(e) => { e.preventDefault(); scrollToSection('apply'); }}>Apply Now</a>
                  </li>
                )}
                <li className="has-sub">
                  <a href="javascript:void(0)">Pages</a>
                  <ul className="sub-menu">
                    <li><Link to="/meetings">Upcoming Meetings</Link></li>
                    <li><Link to="/meetings">Meeting Details</Link></li>
                  </ul>
                </li>
                {isHome && (
                  <li className="scroll-to-section">
                    <a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection('courses'); }}>Courses</a>
                  </li>
                )}
                {isHome && (
                  <li className="scroll-to-section">
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact Us</a>
                  </li>
                )}
              </ul>

              <a
                className="menu-trigger"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ cursor: 'pointer' }}
              >
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
