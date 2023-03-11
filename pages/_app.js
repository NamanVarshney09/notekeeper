import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import NoteState from '@/context/notes/noteState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
    <NoteState>
      <Navbar />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </NoteState>
  </>
}
