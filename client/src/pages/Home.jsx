import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SubHeader from '../components/SubHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loadAllPlugins } from '../utils/loadPlugins';

const API = 'http://localhost:5000/api';

// ─── Accordion ────────────────────────────────────────────────────────────
function Accordion({ title, body, last, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <article className={`accordion${last ? ' last-accordion' : ''}`}>
      <div className="accordion-head" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        <span>{title}</span>
        <span className="icon">
          <i className={`icon fa fa-chevron-${open ? 'down' : 'right'}`}></i>
        </span>
      </div>
      <div className="accordion-body" style={{ display: open ? 'block' : 'none' }}>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </article>
  );
}

const accordionData = [
  {
    title: 'About EduNova Learning Ecosystem',
    body: 'EduNova provides a comprehensive digital environment combining live video meetings, course management, smart AI tutoring, and real-time performance analytics for modern schools and universities.',
    defaultOpen: true,
  },
  {
    title: 'AI Tutor & Automated Grading',
    body: 'Students get 24/7 interactive assistance from our AI Study Assistant, while teachers benefit from automated assignment creation, quiz generation, and quick rubric evaluation.',
  },
  {
    title: 'Multi-Portal Management',
    body: 'Dedicated dashboards allow Students to submit work, Teachers to track progress, Parents to monitor grades, and Administrators to oversee ERP operations seamlessly.',
  },
  {
    title: 'Interactive Live Meetings & Classes',
    body: 'Schedule and attend HD virtual classrooms with screen sharing, chat, file distribution, and recorded lecture archives.',
    last: true,
  },
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
  },
  {
    _id: '2',
    title: 'Online Teaching Techniques',
    date: '14',
    month: 'Nov',
    price: '$22.00',
    image: '/assets/images/meeting-02.jpg',
    description: 'Modern pedagogical strategies for remote and hybrid classroom management.',
  },
  {
    _id: '3',
    title: 'Network Teaching Concept',
    date: '16',
    month: 'Nov',
    price: '$24.00',
    image: '/assets/images/meeting-03.jpg',
    description: 'Building collaborative academic networks across international institutions.',
  },
  {
    _id: '4',
    title: 'Online Teaching Tools',
    date: '18',
    month: 'Nov',
    price: '$32.00',
    image: '/assets/images/meeting-04.jpg',
    description: 'Deep dive into virtual whiteboards, automated grading, and AI tutors.',
  },
];

const DEFAULT_COURSES = [
  {
    _id: 'c1',
    title: 'Advanced AI & Machine Learning in Education',
    price: '$160',
    rating: 5,
    image: '/assets/images/course-01.jpg',
  },
  {
    _id: 'c2',
    title: 'Full-Stack Modern Web Development',
    price: '$180',
    rating: 5,
    image: '/assets/images/course-02.jpg',
  },
  {
    _id: 'c3',
    title: 'Digital Pedagogy & E-Learning Design',
    price: '$140',
    rating: 5,
    image: '/assets/images/course-03.jpg',
  },
  {
    _id: 'c4',
    title: 'Data Science & Educational Analytics',
    price: '$200',
    rating: 5,
    image: '/assets/images/course-04.jpg',
  },
];

// ─── Home Page ────────────────────────────────────────────────────────────
function Home() {
  const [meetings, setMeetings]     = useState(DEFAULT_MEETINGS);
  const [courses, setCourses]       = useState(DEFAULT_COURSES);
  const [formData, setFormData]     = useState({ name: '', email: '', subject: '', message: '' });
  const [formMsg, setFormMsg]       = useState('');
  const [formError, setFormError]   = useState('');
  const [submitting, setSubmitting] = useState(false);
  const pluginsReady                = useRef(false);

  // ── Fetch API data with fallback ──────────────────────────────────────────
  useEffect(() => {
    axios.get(`${API}/meetings`)
      .then((r) => { if (r.data && r.data.length > 0) setMeetings(r.data.slice(0, 4)); })
      .catch(() => setMeetings(DEFAULT_MEETINGS));

    axios.get(`${API}/courses`)
      .then((r) => { if (r.data && r.data.length > 0) setCourses(r.data); })
      .catch(() => setCourses(DEFAULT_COURSES));
  }, []);

  // ── Load plugins + init carousels after data & DOM are ready ─────────────
  useEffect(() => {
    let timer;
    loadAllPlugins().then(() => {
      pluginsReady.current = true;
      // Defer carousel init to give React time to paint DOM changes
      timer = setTimeout(initCarousels, 150);
    }).catch(console.error);

    return () => clearTimeout(timer);
  }, [meetings, courses]);

  function initCarousels() {
    const $ = window.$;
    if (!$ || !$.fn.owlCarousel) return;

    // Destroy and reinit services carousel safely
    const $service = $('.owl-service-item');
    if ($service.length) {
      if ($service.hasClass('owl-loaded')) {
        $service.trigger('destroy.owl.carousel').removeClass('owl-loaded owl-drag');
      }
      $service.owlCarousel({
        items: 3,
        loop: true,
        dots: true,
        nav: true,
        autoplay: true,
        margin: 30,
        responsive: {
          0:    { items: 1 },
          600:  { items: 2 },
          1000: { items: 3 },
        },
      });
    }

    // Destroy and reinit courses carousel safely
    const $courses = $('.owl-courses-item');
    if ($courses.length) {
      if ($courses.hasClass('owl-loaded')) {
        $courses.trigger('destroy.owl.carousel').removeClass('owl-loaded owl-drag');
      }
      $courses.owlCarousel({
        items: 4,
        loop: true,
        dots: true,
        nav: true,
        autoplay: true,
        margin: 30,
        responsive: {
          0:    { items: 1 },
          600:  { items: 2 },
          1000: { items: 4 },
        },
      });
    }

    // Sticky header on scroll (from custom.js)
    $(window).off('scroll.header').on('scroll.header', function () {
      const scroll = $(window).scrollTop();
      const box = $('.header-text').height() || 500;
      const header = $('header').height() || 80;
      if (scroll >= box - header) {
        $('header').addClass('background-header');
      } else {
        $('header').removeClass('background-header');
      }
    });

    // Counter animation (from custom.js)
    function visible($el) {
      const $w = $(window);
      const viewTop = $w.scrollTop();
      const viewBottom = viewTop + $w.height();
      const _top = $el.offset().top;
      const _bottom = _top + $el.height();
      return _bottom <= viewBottom && _top >= viewTop && $el.is(':visible');
    }

    $(window).off('scroll.counter').on('scroll.counter', function () {
      if (visible($('.count-digit'))) {
        if ($('.count-digit').hasClass('counter-loaded')) return;
        $('.count-digit').addClass('counter-loaded');
        $('.count-digit').each(function () {
          const $this = $(this);
          const end = parseInt($this.text().replace('%', '')) || 0;
          const hasPct = $this.text().includes('%');
          $({ Counter: 0 }).animate({ Counter: end }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
              $this.text(Math.ceil(this.Counter) + (hasPct ? '%' : ''));
            },
          });
        });
      }
    });

    // Smooth scroll (from custom.js)
    $(document).off('click.smoothscroll').on('click.smoothscroll', '.scroll-to-section a[href^="#"]', function (e) {
      e.preventDefault();
      const target = $($(this).attr('href'));
      if (target.length) {
        $('html, body').animate({ scrollTop: target.offset().top - 79 }, 500);
      }
    });
  }

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setFormMsg(''); setFormError('');
    try {
      await axios.post(`${API}/contact`, formData);
      setFormMsg('Your message has been sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setFormError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SubHeader />
      <Navbar />

      {/* ── Main Banner ── */}
      <section className="section main-banner" id="top" data-section="section1">
        <video autoPlay muted loop id="bg-video">
          <source src="/assets/images/course-video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay header-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="caption">
                  <h6>Empowering Future Learners</h6>
                  <h2>WELCOME TO EDUNOVA PLATFORM</h2>
                  <p>
                    EduNova is an all-in-one AI-driven educational ecosystem featuring interactive virtual classrooms, smart study assistants, automated grading, and dedicated portals for students, teachers, parents, and administrators.
                  </p>
                  <div className="main-button-red">
                    <div className="scroll-to-section">
                      <a href="#contact" onClick={scrollTo('contact')}>Explore Portals & AI</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Carousel ── */}
      <section className="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="owl-service-item owl-carousel">

                <div className="item">
                  <div className="icon"><img src="/assets/images/service-icon-01.png" alt="" /></div>
                  <div className="down-content">
                    <h4>Best Education</h4>
                    <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                  </div>
                </div>

                <div className="item">
                  <div className="icon"><img src="/assets/images/service-icon-02.png" alt="" /></div>
                  <div className="down-content">
                    <h4>Best Teachers</h4>
                    <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                  </div>
                </div>

                <div className="item">
                  <div className="icon"><img src="/assets/images/service-icon-03.png" alt="" /></div>
                  <div className="down-content">
                    <h4>Best Students</h4>
                    <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                  </div>
                </div>

                <div className="item">
                  <div className="icon"><img src="/assets/images/service-icon-02.png" alt="" /></div>
                  <div className="down-content">
                    <h4>Online Meeting</h4>
                    <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                  </div>
                </div>

                <div className="item">
                  <div className="icon"><img src="/assets/images/service-icon-03.png" alt="" /></div>
                  <div className="down-content">
                    <h4>Best Networking</h4>
                    <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Meetings ── */}
      <section className="upcoming-meetings" id="meetings">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Upcoming Meetings</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="categories">
                <h4>Meeting Catgories</h4>
                <ul>
                  <li><a href="#">Sed tempus enim leo</a></li>
                  <li><a href="#">Aenean molestie quis</a></li>
                  <li><a href="#">Cras et metus vestibulum</a></li>
                  <li><a href="#">Nam et condimentum</a></li>
                  <li><a href="#">Phasellus nec sapien</a></li>
                </ul>
                <div className="main-button-red">
                  <Link to="/meetings">All Upcoming Meetings</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                {meetings.length === 0 ? (
                  <div className="col-12" style={{ padding: '40px 0' }}><p>Loading meetings...</p></div>
                ) : (
                  meetings.map((m) => (
                    <div className="col-lg-6" key={m._id}>
                      <div className="meeting-item">
                        <div className="thumb">
                          <div className="price"><span>{m.price}</span></div>
                          <Link to={`/meetings/${m._id}`}><img src={m.image} alt={m.title} /></Link>
                        </div>
                        <div className="down-content">
                          <div className="date"><h6>{m.month} <span>{m.date}</span></h6></div>
                          <Link to={`/meetings/${m._id}`}><h4>{m.title}</h4></Link>
                          <p>{m.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Apply Now ── */}
      <section className="apply-now" id="apply">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="row">
                <div className="col-lg-12">
                  <div className="item">
                    <h3>APPLY FOR BACHELOR DEGREE</h3>
                    <p>You are allowed to use this edu meeting CSS template for your school or university or business. You can feel free to modify or edit this layout.</p>
                    <div className="main-button-red">
                      <div className="scroll-to-section">
                        <a href="#contact" onClick={scrollTo('contact')}>Join Us Now!</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="item">
                    <h3>APPLY FOR BACHELOR DEGREE</h3>
                    <p>You are not allowed to redistribute the template ZIP file on any other template website. Please contact us for more information.</p>
                    <div className="main-button-yellow">
                      <div className="scroll-to-section">
                        <a href="#contact" onClick={scrollTo('contact')}>Join Us Now!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="accordions is-first-expanded">
                {accordionData.map((a, i) => (
                  <Accordion key={i} title={a.title} body={a.body} last={a.last} defaultOpen={a.defaultOpen} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Courses Carousel ── */}
      <section className="our-courses" id="courses">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Our Popular Courses</h2>
              </div>
            </div>
            <div className="col-lg-12">
              {courses.length === 0 ? (
                <p>Loading courses...</p>
              ) : (
                <div className="owl-courses-item owl-carousel">
                  {courses.map((c, i) => (
                    <div className="item" key={i}>
                      <img src={c.image} alt={c.title} />
                      <div className="down-content">
                        <h4>{c.title}</h4>
                        <div className="info">
                          <div className="row">
                            <div className="col-8">
                              <ul>
                                {[1, 2, 3, 4, 5].map((n) => (
                                  <li key={n}><i className={`fa fa-star${n <= c.rating ? '' : '-o'}`}></i></li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-4">
                              <span>{c.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Facts ── */}
      <section className="our-facts">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <h2>A Few Facts About Our University</h2>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="count-area-content percentage">
                        <div className="count-digit">94%</div>
                        <div className="count-title">Succeced Students</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="count-area-content">
                        <div className="count-digit">126</div>
                        <div className="count-title">Current Teachers</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="count-area-content new-students">
                        <div className="count-digit">2345</div>
                        <div className="count-title">New Students</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="count-area-content">
                        <div className="count-digit">32</div>
                        <div className="count-title">Awards</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="video">
                <a href="https://www.youtube.com/watch?v=HndV87XpkWg" target="_blank" rel="noreferrer">
                  <img src="/assets/images/play-icon.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Us ── */}
      <section className="contact-us" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 align-self-center">
              <div className="row">
                <div className="col-lg-12">
                  <form id="contact-form" action="" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <h2>Let&apos;s get in touch</h2>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input name="name" type="text" id="name"
                            placeholder="YOURNAME...*" required
                            value={formData.name} onChange={handleChange} />
                        </fieldset>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input name="email" type="text" id="email"
                            pattern="[^ @]*@[^ @]*" placeholder="YOUR EMAIL..."
                            required value={formData.email} onChange={handleChange} />
                        </fieldset>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input name="subject" type="text" id="subject"
                            placeholder="SUBJECT...*" required
                            value={formData.subject} onChange={handleChange} />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <textarea name="message" type="text" className="form-control" id="message"
                            placeholder="YOUR MESSAGE..." required
                            value={formData.message} onChange={handleChange}></textarea>
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <button type="submit" id="form-submit" className="button" disabled={submitting}>
                            {submitting ? 'SENDING...' : 'SEND MESSAGE NOW'}
                          </button>
                        </fieldset>
                      </div>
                      {formMsg && (
                        <div className="col-lg-12">
                          <p style={{ color: '#28a745', marginTop: '15px', fontWeight: '500' }}>{formMsg}</p>
                        </div>
                      )}
                      {formError && (
                        <div className="col-lg-12">
                          <p style={{ color: '#dc3545', marginTop: '15px', fontWeight: '500' }}>{formError}</p>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="right-info">
                <ul>
                  <li>
                    <h6>Phone Number</h6>
                    <span>010-020-0340</span>
                  </li>
                  <li>
                    <h6>Email Address</h6>
                    <span>info@meeting.edu</span>
                  </li>
                  <li>
                    <h6>Street Address</h6>
                    <span>Rio de Janeiro - RJ, 22795-008, Brazil</span>
                  </li>
                  <li>
                    <h6>Website URL</h6>
                    <span>www.meeting.edu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Home;
