import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

const DEFAULT_STUDENT_DATA = {
  studentName: 'Alex Johnson',
  grade: 'Grade 11 - Computer Science',
  gpa: '3.88',
  streak: 14,
  xp: 4250,
  level: 8,
  aiScore: 94,
  attendance: '96%',
  weeklyGoals: [
    { id: 1, title: 'Complete AI Study Assistant Practice Test', completed: true },
    { id: 2, title: 'Submit Web Development Lab #3', completed: true },
    { id: 3, title: 'Read Chapter 5: Data Structures', completed: false },
    { id: 4, title: 'Attend Math Virtual Lecture', completed: false },
  ],
  badges: [
    { name: 'AI Scholar', icon: 'fa-graduation-cap' },
    { name: '14-Day Streak', icon: 'fa-fire' },
    { name: 'Master Coder', icon: 'fa-code' },
    { name: 'Top Attendee', icon: 'fa-star' },
  ],
};

function StudentDashboard() {
  const [data, setData] = useState(DEFAULT_STUDENT_DATA);

  useEffect(() => {
    axios.get(`${API}/dashboard/student`)
      .then((r) => { if (r.data) setData(r.data); })
      .catch(() => setData(DEFAULT_STUDENT_DATA));
  }, []);

  return (
    <>
      <Navbar />

      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Smart Dashboard</h6>
              <h2>Student Learning Hub</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="meetings-page" id="meetings">
        <div className="container">
          {loading || !data ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#fff' }}>Loading Smart Student Dashboard...</div>
          ) : (
            <div className="row">
              
              {/* Top Stats Cards */}
              <div className="col-lg-3 col-md-6" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #a12c2f', color: '#fff' }}>
                  <h6 style={{ color: '#ccc', margin: 0 }}>GPA</h6>
                  <h2 style={{ color: '#f5a425', margin: '5px 0' }}>{data.gpa}</h2>
                  <small style={{ color: '#aaa' }}>Top 5% in class</small>
                </div>
              </div>

              <div className="col-lg-3 col-md-6" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #f5a425', color: '#fff' }}>
                  <h6 style={{ color: '#ccc', margin: 0 }}>Daily Streak</h6>
                  <h2 style={{ color: '#f5a425', margin: '5px 0' }}>🔥 {data.streak} Days</h2>
                  <small style={{ color: '#aaa' }}>Keep it up!</small>
                </div>
              </div>

              <div className="col-lg-3 col-md-6" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #28a745', color: '#fff' }}>
                  <h6 style={{ color: '#ccc', margin: 0 }}>Total XP Points</h6>
                  <h2 style={{ color: '#f5a425', margin: '5px 0' }}>{data.xp} XP</h2>
                  <small style={{ color: '#aaa' }}>Level 6 Learner</small>
                </div>
              </div>

              <div className="col-lg-3 col-md-6" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#1f272b', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #17a2b8', color: '#fff' }}>
                  <h6 style={{ color: '#ccc', margin: 0 }}>AI Proficiency Score</h6>
                  <h2 style={{ color: '#f5a425', margin: '5px 0' }}>{data.aiScore}%</h2>
                  <small style={{ color: '#aaa' }}>Grounded AI evaluations</small>
                </div>
              </div>

              {/* Weekly Goals & Badges */}
              <div className="col-lg-6" style={{ marginTop: '10px' }}>
                <div className="meeting-single-item" style={{ background: '#1f272b', padding: '30px', borderRadius: '20px', color: '#fff' }}>
                  <h4 style={{ color: '#f5a425', marginBottom: '20px' }}>Weekly Learning Goals</h4>
                  {data.weeklyGoals.map((goal) => (
                    <div key={goal.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', background: '#13191c', padding: '12px 15px', borderRadius: '10px' }}>
                      <i className={`fa ${goal.completed ? 'fa-check-circle' : 'fa-circle-o'}`} style={{ color: goal.completed ? '#28a745' : '#888', fontSize: '20px', marginRight: '15px' }}></i>
                      <span style={{ color: '#fff', textDecoration: goal.completed ? 'line-through' : 'none' }}>{goal.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges & Achievements */}
              <div className="col-lg-6" style={{ marginTop: '10px' }}>
                <div className="meeting-single-item" style={{ background: '#1f272b', padding: '30px', borderRadius: '20px', color: '#fff' }}>
                  <h4 style={{ color: '#f5a425', marginBottom: '20px' }}>Earned Badges</h4>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {data.badges.map((badge, i) => (
                      <div key={i} style={{ background: '#13191c', padding: '15px 20px', borderRadius: '12px', textAlign: 'center', minWidth: '120px' }}>
                        <i className={`fa ${badge.icon}`} style={{ fontSize: '30px', color: '#f5a425', marginBottom: '8px' }}></i>
                        <h6 style={{ color: '#fff', margin: 0, fontSize: '13px' }}>{badge.name}</h6>
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

export default StudentDashboard;
