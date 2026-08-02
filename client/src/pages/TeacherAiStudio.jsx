import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

function TeacherAiStudio() {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('High School');
  const [loading, setLoading] = useState(false);
  const [lessonDraft, setLessonDraft] = useState(null);
  const [draftId, setDraftId] = useState(null);
  const [approved, setApproved] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic || !subject) return;

    setLoading(true); setApproved(false);
    try {
      const res = await axios.post(`${API}/ai/teacher-assistant`, {
        subject,
        topic,
        gradeLevel,
      });
      setLessonDraft(res.data.lessonDraft);
      setDraftId(res.data.draftId);
    } catch {
      alert('Error generating lesson draft');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      await axios.post(`${API}/ai/approve-draft`, { draftId });
      setApproved(true);
    } catch {
      alert('Approval failed');
    }
  };

  return (
    <>
      <Navbar />

      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Teacher Workflows</h6>
              <h2>AI Teacher Assistant & Lesson Generator</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="meetings-page" id="meetings">
        <div className="container">
          <div className="row">
            
            {/* Input Form */}
            <div className="col-lg-5">
              <div className="meeting-single-item" style={{ background: '#1f272b', padding: '30px', borderRadius: '20px', color: '#fff' }}>
                <h4 style={{ color: '#f5a425', marginBottom: '20px' }}>Create Lesson & Slide Plan</h4>
                <form onSubmit={handleGenerate}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ color: '#ccc' }}>Subject Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Computer Science, Physics"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      style={{ background: '#13191c', color: '#fff', border: '1px solid #333' }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ color: '#ccc' }}>Lesson Topic</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Binary Search Trees"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                      style={{ background: '#13191c', color: '#fff', border: '1px solid #333' }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#ccc' }}>Grade / Level</label>
                    <select
                      className="form-control"
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      style={{ background: '#13191c', color: '#fff', border: '1px solid #333' }}
                    >
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '25px',
                      background: '#a12c2f',
                      color: '#fff',
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {loading ? 'GENERATING AI DRAFT...' : 'GENERATE LESSON DRAFT'}
                  </button>
                </form>
              </div>
            </div>

            {/* Generated Output Preview with Human Approval */}
            <div className="col-lg-7">
              <div className="meeting-single-item" style={{ background: '#1f272b', padding: '30px', borderRadius: '20px', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 style={{ color: '#f5a425', margin: 0 }}>Generated Draft Preview</h4>
                  {lessonDraft && (
                    <span
                      style={{
                        background: approved ? '#28a745' : '#ffc107',
                        color: '#000',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                      }}
                    >
                      {approved ? 'APPROVED & PUBLISHED' : 'TEACHER DRAFT STATUS'}
                    </span>
                  )}
                </div>

                {!lessonDraft ? (
                  <p style={{ color: '#888' }}>Fill out the topic form on the left to generate an AI lesson plan and slide outline.</p>
                ) : (
                  <div>
                    <h5>Topic: {lessonDraft.topic}</h5>
                    <p style={{ color: '#ccc' }}><strong>Grade:</strong> {lessonDraft.gradeLevel} | <strong>Duration:</strong> {lessonDraft.durationMinutes} mins</p>
                    
                    <h6 style={{ color: '#f5a425', marginTop: '15px' }}>Learning Objectives:</h6>
                    <ul>
                      {lessonDraft.objectives.map((obj, i) => (
                        <li key={i} style={{ color: '#fff' }}>• {obj}</li>
                      ))}
                    </ul>

                    <h6 style={{ color: '#f5a425', marginTop: '15px' }}>PowerPoint Slide Outline:</h6>
                    {lessonDraft.slideOutline.map((slide, i) => (
                      <div key={i} style={{ background: '#13191c', padding: '12px', borderRadius: '8px', marginBottom: '10px' }}>
                        <strong style={{ color: '#fff' }}>Slide {slide.slide}: {slide.title}</strong>
                        <ul style={{ margin: '5px 0 0 15px' }}>
                          {slide.bullets.map((b, idx) => (
                            <li key={idx} style={{ color: '#aaa', fontSize: '13px' }}>- {b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Human Approval Action */}
                    {!approved ? (
                      <button
                        onClick={handleApprove}
                        style={{
                          marginTop: '20px',
                          padding: '12px 25px',
                          borderRadius: '20px',
                          background: '#28a745',
                          color: '#fff',
                          fontWeight: 'bold',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <i className="fa fa-check" style={{ marginRight: '8px' }}></i> APPROVE & PUBLISH TO STUDENTS
                      </button>
                    ) : (
                      <div style={{ marginTop: '20px', color: '#28a745', fontWeight: 'bold' }}>
                        <i className="fa fa-check-circle"></i> Published to Student Course Feed!
                      </div>
                    )}
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

export default TeacherAiStudio;
