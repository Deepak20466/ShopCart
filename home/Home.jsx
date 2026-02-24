import React from 'react'
import Banner from './Banner'
import HomeCategory from './HomeCategory'
import CategoryShowCase from './CategoryShowCase'
import Register from './Register'
// import Locationspread from './LoacationSpread'
import LocationSpread from './LoacationSpread'
import AboutUs from './AboutUs'
import AppSection from './AppSection'
import Sponsor from './Sponsor'

const Home = () => {
  return (
    <div>
      <Banner/>
      <HomeCategory/>
      <CategoryShowCase/>
      <Register/>
      {/* <Locationspread/> */}
      <LocationSpread/>
      <AboutUs/>
      <AppSection/>
      <Sponsor/>
      
    </div>
  )
}

export default Home