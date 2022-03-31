import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatsApp</title>
        <meta name="description" content="This is WhatsApp created by Shekhar" />
        <link rel="icon" href="/favicon.png" />
      </Head>
     <Sidebar />
    </div>
  )
}
