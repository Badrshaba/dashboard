import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Carousel, Collapse, Typography } from 'antd';
import { NumericFormat } from 'react-number-format';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { getProperityById } from '../../../redux/thunck/crudProperites';

const ProperitePage = () => {
  const { properiteId } = useParams();
  const { properites } = useSelector((state) => state.properites);
  const properity = properites.filter((pro) => pro.id == properiteId);
  const items = [
    {
      key: '1',
      label: 'Details',
      children: (
        <Stack spacing={4}>
          <Box>
            <Typography.Title level={4}>Rooms</Typography.Title>
            <Typography.Paragraph>{properity?.rooms}</Typography.Paragraph>
          </Box>
          <Box>
            <Typography.Title level={4}>Master Bed Rooms</Typography.Title>
            <Typography.Paragraph>{properity?.master_bedroom}</Typography.Paragraph>
          </Box>
          <Box>
            <Typography.Title level={4}>Bathrooms</Typography.Title>
            <Typography.Paragraph>{properity?.bathrooms}</Typography.Paragraph>
          </Box>
          <Box>
            <Typography.Title level={4}>BedRooms</Typography.Title>
            <Typography.Paragraph>{properity?.bedrooms}</Typography.Paragraph>
          </Box>
          <Box>
            <Typography.Title level={4}>Kitchens</Typography.Title>
            <Typography.Paragraph>{properity?.kitchens}</Typography.Paragraph>
          </Box>
          <Box>
            <Typography.Title level={4}>Balconies</Typography.Title>
            <Typography.Paragraph>{properity?.balconies}</Typography.Paragraph>
          </Box>
        </Stack>
      ),
    },
    {
      key: '2',
      label: 'Services',
      children: (
        <Flex gap={10}>
          <Stack>
            <Box>
              <Typography.Title level={4}>Parks & Garden</Typography.Title>
              <Typography.Paragraph>{properity?.parks_and_garden}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Schools</Typography.Title>
              <Typography.Paragraph>{properity?.schools}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Clubhouse</Typography.Title>
              <Typography.Paragraph>{properity?.clubhouse}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Commercial Strip</Typography.Title>
              <Typography.Paragraph>{properity?.commercial_strip}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Business Hub</Typography.Title>
              <Typography.Paragraph>{properity?.business_hub}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Mosque</Typography.Title>
              <Typography.Paragraph>{properity?.mosque}</Typography.Paragraph>
            </Box>
          </Stack>
          <Stack>
            <Box>
              <Typography.Title level={4}>Sports Clubs</Typography.Title>
              <Typography.Paragraph>{properity?.sports_clubs}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Bicycles Lanes</Typography.Title>
              <Typography.Paragraph>{properity?.bicycles_lanes}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Medical Center</Typography.Title>
              <Typography.Paragraph>{properity?.medical_center}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Disability Support</Typography.Title>
              <Typography.Paragraph>{properity?.disability_support}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Gym</Typography.Title>
              <Typography.Paragraph>{properity?.gym}</Typography.Paragraph>
            </Box>
            <Box>
              <Typography.Title level={4}>Swimming Pool</Typography.Title>
              <Typography.Paragraph>{properity?.swimming_pool}</Typography.Paragraph>
            </Box>
          </Stack>
        </Flex>
      ),
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProperityById(properiteId));
  }, []);
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
            src={properity.image}
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
            <Typography.Title>{properity?.name_en}</Typography.Title>
            <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }}>
              {properity?.description}
            </Typography.Paragraph>
            <Flex gap={5}>
              <Box>
                <Collapse
                  items={items}
                  style={{ width: '550px' }}
                />
              </Box>
            </Flex>
          </Box>

          <Stack>
            <Typography.Text
              style={{
                backgroundColor: '#13ab7d',
                padding: '7px 12px',
                borderRadius: '1rem',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '12px',
              }}
            >
              {properity?.type?.name}
            </Typography.Text>
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
                value={properity?.price_from}
                displayType='text'
                thousandSeparator=','
              />{' '}
              To{' '}
              <NumericFormat
                value={properity?.price_to}
                displayType='text'
                thousandSeparator=','
              />
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Address:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {properity?.address_ar}
              </Typography.Text>
            </Typography.Text>

            <Typography.Text style={{ fontWeight: 'bold' }}>
              Layout:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {properity?.model?.name}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Status:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {properity?.status?.name}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Compound:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {properity?.compound?.name}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Units:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {properity?.availability}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Delivery In:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {properity?.delivery_in}
              </Typography.Text>
            </Typography.Text>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProperitePage;
