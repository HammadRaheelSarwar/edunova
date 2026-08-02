const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const Meeting = require('../models/Meeting');
const Course = require('../models/Course');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/edunova';

const meetings = [
  {
    title: 'New Lecturers Meeting',
    date: '12',
    month: 'Nov',
    price: '$14.00',
    image: '/assets/images/meeting-01.jpg',
    description: 'Morbi in libero blandit lectus cursus ullamcorper.',
    fullDescription: `This is an edu meeting HTML CSS template. You are allowed to use this template for your school or university or business.\n\nYou can feel free to modify or edit this layout. You are not allowed to redistribute the template ZIP file on any other template website.`,
    categories: ['all', 'soon'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
  {
    title: 'Online Teaching Techniques',
    date: '14',
    month: 'Nov',
    price: '$22.00',
    image: '/assets/images/meeting-02.jpg',
    description: 'Morbi in libero blandit lectus cursus ullamcorper.',
    fullDescription: `A comprehensive session on online teaching techniques for educators and trainers.\n\nLearn the best digital tools and strategies to engage students in a virtual environment.`,
    categories: ['all', 'imp'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
  {
    title: 'Network Teaching Concept',
    date: '16',
    month: 'Nov',
    price: '$24.00',
    image: '/assets/images/meeting-03.jpg',
    description: 'Morbi in libero blandit lectus cursus ullamcorper.',
    fullDescription: `Explore the concept of network-based teaching and collaborative learning environments.\n\nThis session covers best practices for building teaching networks.`,
    categories: ['all', 'soon'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
  {
    title: 'Online Teaching Tools',
    date: '18',
    month: 'Nov',
    price: '$32.00',
    image: '/assets/images/meeting-04.jpg',
    description: 'Morbi in libero blandit lectus cursus ullamcorper.',
    fullDescription: `Discover the most effective online teaching tools available today.\n\nFrom LMS platforms to interactive whiteboards, we cover everything you need.`,
    categories: ['all', 'att'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
  {
    title: 'New Teaching Techniques',
    date: '22',
    month: 'Nov',
    price: '$34.00',
    image: '/assets/images/meeting-02.jpg',
    description: 'Morbi in libero blandit lectus cursus ullamcorper.',
    fullDescription: `Learn about the latest and most innovative teaching techniques being adopted worldwide.\n\nIdeal for educators looking to refresh their approach to learning.`,
    categories: ['all', 'att'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
  {
    title: 'Technology Conference',
    date: '24',
    month: 'Nov',
    price: '$45.00',
    image: '/assets/images/meeting-03.jpg',
    description: 'TemplateMo is the best website when it comes to Free CSS.',
    fullDescription: `A major technology conference bringing together educators and tech innovators.\n\nDiscover the future of education technology and digital learning.`,
    categories: ['all', 'imp'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
  {
    title: 'Online Teaching Techniques',
    date: '27',
    month: 'Nov',
    price: '$52.00',
    image: '/assets/images/meeting-01.jpg',
    description: 'Morbi in libero blandit lectus cursus ullamcorper.',
    fullDescription: `Advanced session on online teaching techniques for senior educators.\n\nFocus on hybrid learning environments and adaptive teaching methods.`,
    categories: ['all', 'imp', 'att'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
  {
    title: 'Instant Lecture Design',
    date: '28',
    month: 'Nov',
    price: '$64.00',
    image: '/assets/images/meeting-02.jpg',
    description: 'Morbi in libero blandit lectus cursus ullamcorper.',
    fullDescription: `Master the art of designing effective lectures quickly and efficiently.\n\nPerfect for busy educators who need to create impactful content fast.`,
    categories: ['all', 'soon', 'imp'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
  {
    title: 'Online Social Networking',
    date: '30',
    month: 'Nov',
    price: '$74.00',
    image: '/assets/images/meeting-03.jpg',
    description: 'Morbi in libero blandit lectus cursus ullamcorper.',
    fullDescription: `Explore how social networking platforms are transforming education.\n\nLearn to leverage social media tools for collaborative learning and community building.`,
    categories: ['all', 'att', 'soon'],
    location: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil',
    hours: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM',
    phone: '010-020-0340\n090-080-0760',
  },
];

const courses = [
  { title: 'Morbi tincidunt elit vitae justo rhoncus', price: '$160', image: '/assets/images/course-01.jpg', rating: 5 },
  { title: 'Curabitur molestie dignissim purus vel', price: '$180', image: '/assets/images/course-02.jpg', rating: 3 },
  { title: 'Nulla at ipsum a mauris egestas tempor', price: '$140', image: '/assets/images/course-03.jpg', rating: 4 },
  { title: 'Aenean molestie quis libero gravida', price: '$120', image: '/assets/images/course-04.jpg', rating: 5 },
  { title: 'Lorem ipsum dolor sit amet adipiscing elit', price: '$250', image: '/assets/images/course-01.jpg', rating: 5 },
  { title: 'TemplateMo is the best website for Free CSS', price: '$270', image: '/assets/images/course-02.jpg', rating: 5 },
  { title: 'Web Design Templates at your finger tips', price: '$340', image: '/assets/images/course-03.jpg', rating: 5 },
  { title: 'Please visit our website again', price: '$360', image: '/assets/images/course-04.jpg', rating: 5 },
  { title: 'Responsive HTML Templates for you', price: '$400', image: '/assets/images/course-01.jpg', rating: 5 },
  { title: 'Download Free CSS Layouts for your business', price: '$430', image: '/assets/images/course-02.jpg', rating: 5 },
  { title: 'Morbi in libero blandit lectus cursus', price: '$480', image: '/assets/images/course-03.jpg', rating: 5 },
  { title: 'Curabitur molestie dignissim purus', price: '$560', image: '/assets/images/course-04.jpg', rating: 5 },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Meeting.deleteMany({});
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    await Meeting.insertMany(meetings);
    console.log(`✅ Seeded ${meetings.length} meetings`);

    await Course.insertMany(courses);
    console.log(`✅ Seeded ${courses.length} courses`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seedDatabase();
