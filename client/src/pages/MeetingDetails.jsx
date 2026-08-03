import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SubHeader from '../components/SubHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

const DEFAULT_DETAILS = {
  '1': {
    title: 'New Lecturers Meeting',
    date: '12',
    month: 'Nov',
    price: '$14.00',
    image: '/assets/images/meeting-01.jpg',
    description: 'Interactive orientation session for new university lecturers and AI integration.',
    fullDescription: 'This is an EduNova meeting session for new university lecturers to explore automated grading, digital course distribution, and modern pedagogical tools.',
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340 / 090-080-0760',
  },
  '2': {
    title: 'Online Teaching Techniques',
    date: '14',
    month: 'Nov',
    price: '$22.00',
    image: '/assets/images/meeting-02.jpg',
    description: 'Modern pedagogical strategies for remote and hybrid classroom management.',
    fullDescription: 'A comprehensive session on online teaching techniques for educators, covering active student participation and interactive tools.',
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340 / 090-080-0760',
  },
  '3': {
    title: 'Network Teaching Concept',
    date: '16',
    month: 'Nov',
    price: '$24.00',
    image: '/assets/images/meeting-03.jpg',
    description: 'Building collaborative academic networks across international institutions.',
    fullDescription: 'Explore network-based teaching and collaborative virtual exchange programs across global partner universities.',
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM',
    phone: '010-020-0340',
  },
  '4': {
    title: 'Online Teaching Tools',
    date: '18',
    month: 'Nov',
    price: '$32.00',
    image: '/assets/images/meeting-04.jpg',
    description: 'Deep dive into virtual whiteboards, automated grading, and AI tutors.',
    fullDescription: 'Discover the most effective online teaching tools available today, from automated assignment rubrics to real-time analytics.',
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM',
    phone: '010-020-0340',
  },
};

function MeetingDetails() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(DEFAULT_DETAILS[id] || DEFAULT_DETAILS['1']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/meetings/${id}`)
      .then((r) => { if (r.data) setMeeting(r.data); })
      .catch(() => {
        if (DEFAULT_DETAILS[id]) {
          setMeeting(DEFAULT_DETAILS[id]);
          setError('');
        } else {
          setMeeting(DEFAULT_DETAILS['1']);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <SubHeader />
      <Navbar />

      {/* Page Heading */}
      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Get all details</h6>
              <h2>{meeting ? meeting.title : 'Meeting Details'}</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Detail */}
      <section className="meetings-page" id="meetings">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  {loading && (
                    <div style={{ textAlign: 'center', padding: '60px' }}>
                      <p>Loading meeting details...</p>
                    </div>
                  )}

                  {error && (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'red' }}>
                      <p>{error}</p>
                      <div className="main-button-red" style={{ marginTop: '20px' }}>
                        <Link to="/meetings">Back To Meetings List</Link>
                      </div>
                    </div>
                  )}

                  {meeting && (
                    <div className="meeting-single-item">
                      <div className="thumb">
                        <div className="price"><span>{meeting.price}</span></div>
                        <div className="date"><h6>{meeting.month} <span>{meeting.date}</span></h6></div>
                        <img src={meeting.image} alt={meeting.title} style={{ width: '100%', borderRadius: '4px' }} />
                      </div>
                      <div className="down-content">
                        <h4>{meeting.title}</h4>
                        <p>{meeting.location}</p>
                        <p className="description">
                          {meeting.fullDescription || meeting.description}
                        </p>

                        <div className="row" style={{ marginTop: '30px' }}>
                          <div className="col-lg-4">
                            <div className="hours">
                              <h5>Hours</h5>
                              <p>{meeting.hours && meeting.hours.split('\n').map((line, i) => (
                                <span key={i}>{line}<br /></span>
                              ))}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="location">
                              <h5>Location</h5>
                              <p>{meeting.location}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="book">
                              <h5>Book Now</h5>
                              <p>{meeting.phone && meeting.phone.split('\n').map((line, i) => (
                                <span key={i}>{line}<br /></span>
                              ))}</p>
                            </div>
                          </div>
                          <div className="col-lg-12" style={{ marginTop: '20px' }}>
                            <div className="share">
                              <h5>Share:</h5>
                              <ul>
                                <li><a href="#">Facebook</a>,</li>
                                <li><a href="#">Twitter</a>,</li>
                                <li><a href="#">Linkedin</a>,</li>
                                <li><a href="#">Behance</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!loading && !error && (
                  <div className="col-lg-12" style={{ marginTop: '30px' }}>
                    <div className="main-button-red">
                      <Link to="/meetings">Back To Meetings List</Link>
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

export default MeetingDetails;
