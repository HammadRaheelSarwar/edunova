import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SubHeader from '../components/SubHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

function MeetingDetails() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/meetings/${id}`)
      .then((r) => setMeeting(r.data))
      .catch(() => setError('Meeting not found.'))
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
