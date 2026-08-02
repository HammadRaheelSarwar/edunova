import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

function AiStudyAssistant() {
  const [activeTab, setActiveTab] = useState('tutor');
  const [question, setQuestion] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState([
    { sender: 'ai', text: 'Hello! I am your EduNova 24/7 AI Tutor. Ask me any question, paste lesson notes, or request practice quizzes!' },
  ]);

  // Flashcards state
  const [flashcards, setFlashcards] = useState([
    { id: 1, front: 'What is an Array?', back: 'A contiguous memory data structure with O(1) index lookup.' },
    { id: 2, front: 'Define Photosynthesis', back: 'Process by which plants use sunlight to synthesize glucose from CO2 and H2O.' },
  ]);
  const [flipped, setFlipped] = useState({});

  const handleSendQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userText = question;
    setQuestion('');
    setChatLog((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API}/ai/tutor`, {
        question: userText,
        contextText: pdfText,
        mode: activeTab,
      });
      setChatLog((prev) => [...prev, { sender: 'ai', text: res.data.answer }]);
    } catch {
      setChatLog((prev) => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error connecting to AI Tutor.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Page Heading */}
      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>Flagship Feature</h6>
              <h2>AI Study Assistant & 24/7 AI Tutor</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="meetings-page" id="meetings">
        <div className="container">
          <div className="row">

            {/* Navigation Tabs */}
            <div className="col-lg-12">
              <div className="filters" style={{ marginBottom: '30px' }}>
                <ul>
                  <li className={activeTab === 'tutor' ? 'active' : ''} onClick={() => setActiveTab('tutor')} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-user-md" style={{ marginRight: '8px' }}></i> 24/7 AI Tutor
                  </li>
                  <li className={activeTab === 'pdf' ? 'active' : ''} onClick={() => setActiveTab('pdf')} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-file-pdf-o" style={{ marginRight: '8px' }}></i> PDF & Document Chat
                  </li>
                  <li className={activeTab === 'flashcards' ? 'active' : ''} onClick={() => setActiveTab('flashcards')} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-clone" style={{ marginRight: '8px' }}></i> AI Flashcards
                  </li>
                </ul>
              </div>
            </div>

            {/* AI Tutor Chat & Document Q&A */}
            {(activeTab === 'tutor' || activeTab === 'pdf') && (
              <div className="col-lg-12">
                <div className="meeting-single-item" style={{ background: '#1f272b', padding: '30px', borderRadius: '20px', color: '#fff' }}>
                  
                  {activeTab === 'pdf' && (
                    <div style={{ marginBottom: '20px', padding: '15px', background: '#13191c', borderRadius: '10px' }}>
                      <h5 style={{ color: '#f5a425', marginBottom: '10px' }}>Paste PDF Text / Lesson Notes for AI Context</h5>
                      <textarea
                        rows="3"
                        className="form-control"
                        placeholder="Paste lecture notes or text extracted from your PDF..."
                        value={pdfText}
                        onChange={(e) => setPdfText(e.target.value)}
                        style={{ background: '#1f272b', color: '#fff', border: '1px solid #333' }}
                      />
                    </div>
                  )}

                  {/* Chat Messages */}
                  <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
                    {chatLog.map((msg, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                          marginBottom: '15px',
                        }}
                      >
                        <div
                          style={{
                            maxWidth: '75%',
                            padding: '15px 20px',
                            borderRadius: '15px',
                            background: msg.sender === 'user' ? '#a12c2f' : '#2a363b',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                          }}
                        >
                          <small style={{ color: '#f5a425', display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            {msg.sender === 'user' ? 'You' : 'EduNova AI Tutor'}
                          </small>
                          <p style={{ margin: 0, color: '#fff', whiteSpace: 'pre-line' }}>{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div style={{ color: '#f5a425', fontStyle: 'italic' }}>
                        <i className="fa fa-spinner fa-spin"></i> AI Tutor is thinking...
                      </div>
                    )}
                  </div>

                  {/* Question Input Form */}
                  <form onSubmit={handleSendQuestion}>
                    <div className="row">
                      <div className="col-lg-10 col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ask a question, request concept explanations, or ask for quiz generation..."
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          style={{
                            padding: '15px',
                            borderRadius: '25px',
                            background: '#13191c',
                            color: '#fff',
                            border: '1px solid #333',
                          }}
                        />
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <div className="main-button-red">
                          <button
                            type="submit"
                            style={{
                              border: 'none',
                              width: '100%',
                              padding: '14px',
                              borderRadius: '25px',
                              background: '#a12c2f',
                              color: '#fff',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            SEND
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            )}

            {/* Flashcards View */}
            {activeTab === 'flashcards' && (
              <div className="col-lg-12">
                <div className="row">
                  {flashcards.map((card) => (
                    <div className="col-lg-6" key={card.id} style={{ marginBottom: '25px' }}>
                      <div
                        onClick={() => setFlipped({ ...flipped, [card.id]: !flipped[card.id] })}
                        style={{
                          background: flipped[card.id] ? '#a12c2f' : '#1f272b',
                          color: '#fff',
                          padding: '40px 30px',
                          borderRadius: '20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          minHeight: '180px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          border: '2px solid #f5a425',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <h6 style={{ color: '#f5a425', marginBottom: '10px' }}>
                          {flipped[card.id] ? 'ANSWER' : 'QUESTION (Click to Flip)'}
                        </h6>
                        <h4 style={{ color: '#fff', margin: 0 }}>
                          {flipped[card.id] ? card.back : card.front}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default AiStudyAssistant;
