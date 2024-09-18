import React, { useState } from 'react';
import PropertyDetails from './PropertyDetails';
import PricingAndFinancialInformation from './PricingAndFinancialInformation';
import Location from './Location';
import AmenitiesAndFeatures from './AmenitiesAndFeatures';
import MediaAndDocuments from './MediaAndDocuments';
import DescriptionAndTags from './DescriptionAndTags';
import ContactInformation from './ContactInformation';
import Nearby from './Nearby';
import { Box, Button } from '@chakra-ui/react';

const MainAddProperites = () => {
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    descriotion_en: '',
    descriotion_ar: '',
    area_max: '',
    area_min: '',
    address_ar: '',
    address_en: '',
    price_min: '',
    price_max: '',
    zone_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log('changed');
  };
  const handleSubmit = () => {};

  return (
    <div className=' bg-white h-full space-y-6 py-5'>
      <PropertyDetails
        handleChange={handleChange}
        formData={formData}
      />
      <PricingAndFinancialInformation />
      <Location />
      <AmenitiesAndFeatures />
      <Nearby />
      <MediaAndDocuments />
      <DescriptionAndTags />
      <ContactInformation />
      <Box px={5}>
        <Button
          mt={5}
          colorScheme='teal'
          width='100%'
          display='block'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default MainAddProperites;
