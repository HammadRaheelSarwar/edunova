import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

const DEFAULT_TEACHER_DATA = {
  totalStudents: 142,
  pendingGrades: 5,
  aiDraftsCount: 3,
  myClasses: [
    { id: '1', name: 'Computer Science 101', studentsCount: 45, schedule: 'Mon, Wed, Fri - 10:00 AM' },
    { id: '2', name: 'Advanced Web Development', studentsCount: 38, schedule: 'Tue, Thu - 02:00 PM' },
    { id: '3', name: 'AI & Data Science Fundamentals', studentsCount: 59, schedule: 'Mon, Wed - 04:00 PM' },
  ],
};

function TeacherDashboard() {
  const [data, setData] = useState(DEFAULT_TEACHER_DATA);

  useEffect(() => {
    axios.get(`${API}/dashboard/teacher`)
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => setData(DEFAULT_TEACHER_DATA));
  }, []);

  return (
    <>
      <Navbar />

      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Instructor Hub</h6>
              <h2>Teacher Management Dashboard</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="meetings-page" id="meetings">
        <div className="container">
          {!data ? (
            <div style={{ color: '#fff', textAlign: 'center', padding: '60px' }}>Loading Teacher Dashboard...</div>
          ) : (
            <div className="row">
              <div className="col-lg-4" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #a12c2f', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Total Students Taught</h6>
                  <h2 style={{ color: '#f5a425' }}>{data.totalStudents}</h2>
                </div>
              </div>
              <div className="col-lg-4" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #f5a425', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>Pending Assignments to Grade</h6>
                  <h2 style={{ color: '#f5a425' }}>{data.pendingGrades}</h2>
                </div>
              </div>
              <div className="col-lg-4" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #28a745', color: '#fff' }}>
                  <h6 style={{ color: '#ccc' }}>AI Drafts Awaiting Review</h6>
                  <h2 style={{ color: '#f5a425' }}>{data.aiDraftsCount}</h2>
                </div>
              </div>

              <div className="col-lg-12" style={{ marginTop: '20px' }}>
                <div className="meeting-single-item" style={{ background: '#1f272b', padding: '30px', borderRadius: '20px', color: '#fff' }}>
                  <h4 style={{ color: '#f5a425', marginBottom: '20px' }}>My Active Classes & Courses</h4>
                  <table className="table" style={{ color: '#fff' }}>
                    <thead>
                      <tr>
                        <th>Class Name</th>
                        <th>Students Enrolled</th>
                        <th>Schedule</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.myClasses.map((cls) => (
                        <tr key={cls.id} style={{ borderColor: '#333' }}>
                          <td>{cls.name}</td>
                          <td>{cls.studentsCount}</td>
                          <td>{cls.schedule}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default TeacherDashboard;
