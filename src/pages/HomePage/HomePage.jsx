import React from 'react'
import Creators from '../../components/Creators/Creators';
import Footer from '../../components/Footer/Footer';

const HomePage = () => {
  return (
     <main>
      {/* Інші секції, наприклад <Hero />, <PopularArticles /> */}
      
      <Creators />
      <Footer />

      {/* Інші секції */}
    </main>
  )
}

export default HomePage