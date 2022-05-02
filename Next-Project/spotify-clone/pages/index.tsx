import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'


const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h1>This is a DOPE spotify clone</h1>
     
     <main>
          {/* Sidebar */}
          <Sidebar/>
       {/* Center */}
     </main>
      
    </div>
  )
}

export default Home
