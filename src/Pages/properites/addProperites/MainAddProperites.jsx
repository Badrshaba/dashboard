import React from 'react'
import PropertyDetails from './PropertyDetails'
import PricingAndFinancialInformation from './PricingAndFinancialInformation'
import Location from './Location'
import AmenitiesAndFeatures from './AmenitiesAndFeatures'
import MediaAndDocuments from './MediaAndDocuments'
import DescriptionAndTags from './DescriptionAndTags'
import ContactInformation from './ContactInformation'

const MainAddProperites = () => {
  return (
    <div className=' bg-white h-full space-y-10' >
        <PropertyDetails/>
        <PricingAndFinancialInformation/>
        <Location/>
        <AmenitiesAndFeatures/>
        <MediaAndDocuments/>
        <DescriptionAndTags/>
        <ContactInformation/>
    </div>
  )
}

export default MainAddProperites