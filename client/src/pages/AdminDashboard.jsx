import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API}/dashboard/admin`).then((r) => setData(r.data)).catch(console.error);
  }, []);

  return (
    <>
      <Navbar />

      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Enterprise Control</h6>
              <h2>School ERP & Admin Dashboard</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="meetings-page" id="meetings">
        <div className="container">
          {!data ? (
            <div style={{ color: '#fff', textAlign: 'center', padding: '60px' }}>Loading Admin Dashboard...</div>
          ) : (
            <div className="row">
              <div className="col-lg-3 col-md-6" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #a12c2f', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Total Enrolled Students</h6>
                  <h2 style={{ color: '#f5a425' }}>{data.totalStudents}</h2>
                </div>
              </div>

              <div className="col-lg-3 col-md-6" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #f5a425', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Faculty & Teachers</h6>
                  <h2 style={{ color: '#f5a425' }}>{data.totalTeachers}</h2>
                </div>
              </div>

              <div className="col-lg-3 col-md-6" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #28a745', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Monthly Revenue</h6>
                  <h2 style={{ color: '#f5a425' }}>{data.monthlyRevenue}</h2>
                </div>
              </div>

              <div className="col-lg-3 col-md-6" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #17a2b8', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Attendance Avg</h6>
                  <h2 style={{ color: '#f5a425' }}>{data.attendanceAverage}</h2>
                </div>
              </div>

              <div className="col-lg-12" style={{ marginTop: '20px' }}>
                <div className="meeting-single-item" style={{ background: '#1f272b', padding: '30px', borderRadius: '20px', color: '#fff' }}>
                  <h4 style={{ color: '#f5a425', marginBottom: '20px' }}>Active Enterprise ERP Modules</h4>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {data.erpModulesActive.map((mod, i) => (
                      <div key={i} style={{ background: '#13191c', padding: '15px 25px', borderRadius: '10px', border: '1px solid #333' }}>
                        <i className="fa fa-cogs" style={{ color: '#f5a425', marginRight: '8px' }}></i>
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>{mod}</span>
                      </div>
                    ))}
                  </div>
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

export default AdminDashboard;
