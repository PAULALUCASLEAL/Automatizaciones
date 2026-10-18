import { Contact } from './components/Contact'
import { BeforeAfter, Demos } from './components/Demos'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About, Faq, Process, Recognition, Services, Value } from './components/Sections'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Recognition />
        <Services />
        <Demos />
        <BeforeAfter />
        <Value />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
