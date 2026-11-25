import { MotionConfig } from 'motion/react';
import Background from './components/layout/Background.jsx';
import Footer from './components/layout/Footer.jsx';
import Navbar from './components/layout/Navbar.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import About from './components/sections/About.jsx';
import Contact from './components/sections/Contact.jsx';
import Experience from './components/sections/Experience.jsx';
import Hero from './components/sections/Hero.jsx';
import Projects from './components/sections/Projects.jsx';
import TechMarquee from './components/sections/TechMarquee.jsx';

export default function App() {
    return (
        // reducedMotion="user": respeita quem pediu menos animação no sistema
        <MotionConfig reducedMotion="user">
            <ScrollProgress />
            <Background />
            <Navbar />
            <main>
                <Hero />
                <TechMarquee />
                <About />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </MotionConfig>
    );
}
