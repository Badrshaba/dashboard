import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Carousel, Collapse, Typography } from 'antd';
import { NumericFormat } from 'react-number-format';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { getProperityById } from '../../../../redux/thunck/crudProperites';
import { getUsersApi } from '../../../../utils/api';
import Tools from './Tools';
import { getCompoundById } from '../../../../redux/thunck/crudCompounds';
import jsPDF from 'jspdf';
import { ArrowBigDownDash, Eye } from 'lucide-react';

const CompoundPage = () => {
  const { compoundId } = useParams();
 const {compound} = useSelector((state) => state.compounds)
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getCompoundById(compoundId))
  },[])

    /**
     * Generates a PDF file and saves it to the user's computer
     */
    const generatePDF = (pdfData) => {
      // Create a new PDF document
      // const doc = new jsPDF();
      
      // // Add some text to the PDF
      // doc.addImage(pdfData, 'png', 10, 10, 190, 100);
      
      // // Save the PDF with a filename
      // doc.save('Script.png');
    };
    console.log(compound?.script);
  return (
    <Box pb={10}>
      <Carousel
        arrows
        infinite={true}
        autoplay={true}
        draggable={true}
      >
        <div>
          <img
            src={compound?.image}
            alt=''
            style={{ height: '450px', width: '100%' }}
          />
        </div>
      </Carousel>
      
      <Box
        px={8}
        mt={5}
      >
        <Flex justifyContent='space-between'>
          <Box>
            <Typography.Title>{compound?.name_en}</Typography.Title>
            <Typography.Text >
            Description:{' '}
            <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }}>
              {compound?.description}
            </Typography.Paragraph>
            </Typography.Text>
          </Box>

          <Stack>
            <Typography.Text
              style={{
                backgroundColor: '#6b6b6b',
                padding: '7px 12px',
                borderRadius: '1rem',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '12px',
                display: 'block',
              }}
            >
              <NumericFormat
                 value={compound?.price_from}
                displayType='text'
                thousandSeparator=','
              />{' '}
              To{' '}
              <NumericFormat
                 value={compound?.price_to}
                displayType='text'
                thousandSeparator=','
              />
            </Typography.Text>
              <Typography.Text style={{ fontWeight: 'bold' }}>
                Units:{' '}
                <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                  {compound?.number_of_units}
                </Typography.Text>
              </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Zone:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {compound?.zone?.name}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Address:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {compound?.address_en}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Area:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {compound?.area}
              </Typography.Text>
            </Typography.Text>
          
          </Stack>
        </Flex>
      </Box>
      {/* <div className='flex justify-end gap-5 my-3 mr-3' >
      <a href={compound?.script} target='_blank'> <Button colorScheme='blue' >view</Button></a>
     <Button colorScheme='red' onClick={generatePDF} >download</Button>
      </div> */}
      <form method='get' action={compound?.script} className='my-3 ml-7'>
      <Typography.Text style={{ display: 'flex',gap: '5px',alignItems: 'center', fontWeight: 'bold' }}>
              Script:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal',display: 'flex', gap: '5px' }}>
              <a href={compound?.script} target='_blank'> <Button size={'sm'} className='border border-black'   >
              <div className='flex items-center gap-2 px-2 py-1'>
              <Eye color='teal'  />
              <p style={{marginBottom:'0'}} className='text-teal-700 mb-0 '>Show Script</p>
                </div>
                </Button> 
                </a>
              <Button size={"sm"} type='submit' className='border border-black'  >
              <ArrowBigDownDash color='red' />
                </Button>           
              </Typography.Text>
            </Typography.Text>
      </form>
     <Tools floorplancompound={compound?.floorplancompound} masterplancompound={compound?.masterplancompound}  modelcompound={compound?.modelcompound} imagecompound={compound?.imagecompound} paymentplancompound={compound?.paymentplancompound}/>
    </Box>
  );
};

export default CompoundPage;
