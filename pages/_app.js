import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AuthState from '@/context/auth/authState'
import ExpenseState from '@/context/expense/expenseState'
import NoteState from '@/context/notes/noteState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
    <AuthState>
      <NoteState>
        <ExpenseState>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ExpenseState>
      </NoteState>
    </AuthState>
  </>
}
