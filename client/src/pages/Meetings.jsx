import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SubHeader from '../components/SubHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

const FILTERS = [
  { label: 'All Meetings', value: 'all' },
  { label: 'Soon',         value: 'soon' },
  { label: 'Important',    value: 'imp' },
  { label: 'Attractive',   value: 'att' },
];

const DEFAULT_MEETINGS = [
  {
    _id: '1',
    title: 'New Lecturers Meeting',
    date: '12',
    month: 'Nov',
    price: '$14.00',
    image: '/assets/images/meeting-01.jpg',
    description: 'Interactive orientation session for new university lecturers and AI integration.',
    categories: ['all', 'soon'],
  },
  {
    _id: '2',
    title: 'Online Teaching Techniques',
    date: '14',
    month: 'Nov',
    price: '$22.00',
    image: '/assets/images/meeting-02.jpg',
    description: 'Modern pedagogical strategies for remote and hybrid classroom management.',
    categories: ['all', 'imp'],
  },
  {
    _id: '3',
    title: 'Network Teaching Concept',
    date: '16',
    month: 'Nov',
    price: '$24.00',
    image: '/assets/images/meeting-03.jpg',
    description: 'Building collaborative academic networks across international institutions.',
    categories: ['all', 'soon'],
  },
  {
    _id: '4',
    title: 'Online Teaching Tools',
    date: '18',
    month: 'Nov',
    price: '$32.00',
    image: '/assets/images/meeting-04.jpg',
    description: 'Deep dive into virtual whiteboards, automated grading, and AI tutors.',
    categories: ['all', 'att'],
  },
  {
    _id: '5',
    title: 'Higher Education Summit',
    date: '22',
    month: 'Nov',
    price: '$48.00',
    image: '/assets/images/meeting-01.jpg',
    description: 'Keynote discussions on global university accreditation and digital diplomas.',
    categories: ['all', 'imp'],
  },
  {
    _id: '6',
    title: 'Student Success Workshops',
    date: '24',
    month: 'Nov',
    price: '$18.00',
    image: '/assets/images/meeting-02.jpg',
    description: 'Empowering students with effective study habits and AI study assistance.',
    categories: ['all', 'soon', 'att'],
  },
];

function Meetings() {
  const [meetings, setMeetings] = useState(DEFAULT_MEETINGS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = activeFilter === 'all'
      ? `${API}/meetings`
      : `${API}/meetings?filter=${activeFilter}`;

    axios.get(url)
      .then((r) => {
        if (r.data && r.data.length > 0) setMeetings(r.data);
        else filterDefaultMeetings(activeFilter);
        setPage(1);
      })
      .catch(() => {
        filterDefaultMeetings(activeFilter);
        setPage(1);
      })
      .finally(() => setLoading(false));
  }, [activeFilter]);

  function filterDefaultMeetings(filter) {
    if (filter === 'all') {
      setMeetings(DEFAULT_MEETINGS);
    } else {
      setMeetings(DEFAULT_MEETINGS.filter((m) => m.categories.includes(filter)));
    }
  }

  const totalPages = Math.ceil(meetings.length / ITEMS_PER_PAGE);
  const paginated = meetings.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <SubHeader />
      <Navbar />

      {/* Page Heading */}
      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Here are our upcoming meetings</h6>
              <h2>Upcoming Meetings</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Meetings Grid */}
      <section className="meetings-page" id="meetings">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {/* Filter Tabs */}
                <div className="col-lg-12">
                  <div className="filters">
                    <ul>
                      {FILTERS.map((f) => (
                        <li
                          key={f.value}
                          className={activeFilter === f.value ? 'active' : ''}
                          onClick={() => setActiveFilter(f.value)}
                          style={{ cursor: 'pointer' }}
                        >
                          {f.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Meeting Cards */}
                <div className="col-lg-12">
                  {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <p>Loading meetings...</p>
                    </div>
                  ) : paginated.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <p>No meetings found for this category.</p>
                    </div>
                  ) : (
                    <div className="row grid">
                      {paginated.map((m) => (
                        <div className="col-lg-4 templatemo-item-col" key={m._id}>
                          <div className="meeting-item">
                            <div className="thumb">
                              <div className="price"><span>{m.price}</span></div>
                              <Link to={`/meetings/${m._id}`}>
                                <img src={m.image} alt={m.title} />
                              </Link>
                            </div>
                            <div className="down-content">
                              <div className="date">
                                <h6>{m.month} <span>{m.date}</span></h6>
                              </div>
                              <Link to={`/meetings/${m._id}`}><h4>{m.title}</h4></Link>
                              <p>{m.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="col-lg-12">
                    <div className="pagination">
                      <ul>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <li key={p} className={page === p ? 'active' : ''}>
                            <a
                              href="#"
                              onClick={(e) => { e.preventDefault(); setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            >
                              {p}
                            </a>
                          </li>
                        ))}
                        {page < totalPages && (
                          <li>
                            <a
                              href="#"
                              onClick={(e) => { e.preventDefault(); setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            >
                              <i className="fa fa-angle-right"></i>
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Meetings;
