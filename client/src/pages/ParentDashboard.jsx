import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

const DEFAULT_PARENT_DATA = {
  childName: 'Alex Johnson',
  attendance: '96%',
  gpa: '3.88',
  feesStatus: 'Paid in Full (Semester 1 & 2)',
  teacherComments: [
    { teacher: 'Dr. Sarah Smith (Computer Science)', comment: 'Alex is excelling in algorithmic problem solving and active in discussions.' },
    { teacher: 'Prof. Mark Davis (Web Dev)', comment: 'Outstanding project submissions on React single page applications.' },
  ],
};

function ParentDashboard() {
  const [data, setData] = useState(DEFAULT_PARENT_DATA);

  useEffect(() => {
    axios.get(`${API}/dashboard/parent`)
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => setData(DEFAULT_PARENT_DATA));
  }, []);

  return (
    <>
      <Navbar />

      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Family Portal</h6>
              <h2>Smart Parent Dashboard</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="meetings-page" id="meetings">
        <div className="container">
          {!data ? (
            <div style={{ color: '#fff', textAlign: 'center', padding: '60px' }}>Loading Parent Dashboard...</div>
          ) : (
            <div className="row">
              <div className="col-lg-4" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #a12c2f', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Child Name</h6>
                  <h3 style={{ color: '#f5a425' }}>{data.childName}</h3>
                </div>
              </div>
              <div className="col-lg-4" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #28a745', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Attendance Record</h6>
                  <h3 style={{ color: '#f5a425' }}>{data.attendance}</h3>
                </div>
              </div>
              <div className="col-lg-4" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #17a2b8', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Current GPA</h6>
                  <h3 style={{ color: '#f5a425' }}>{data.gpa}</h3>
                </div>
              </div>

              <div className="col-lg-12" style={{ marginTop: '20px' }}>
                <div className="meeting-single-item" style={{ background: '#1f272b', padding: '30px', borderRadius: '20px', color: '#fff' }}>
                  <h4 style={{ color: '#f5a425', marginBottom: '15px' }}>Fee Installment Status</h4>
                  <p style={{ color: '#fff' }}>{data.feesStatus}</p>

                  <h4 style={{ color: '#f5a425', marginTop: '25px', marginBottom: '15px' }}>Teacher Feedback</h4>
                  {data.teacherComments.map((c, i) => (
                    <div key={i} style={{ background: '#13191c', padding: '15px', borderRadius: '10px', marginBottom: '10px' }}>
                      <strong style={{ color: '#f5a425' }}>{c.teacher}:</strong>
                      <p style={{ color: '#ccc', margin: '5px 0 0 0' }}>{c.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
}

export default ParentDashboard;
