import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Languages from './pages/Languages';
import Course from './pages/Course';
import KnowledgeBase from './pages/KnowledgeBase';
import TopicDetail from './pages/TopicDetail';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/course/:langId" element={<Course />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/knowledge/:topicName" element={<TopicDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

