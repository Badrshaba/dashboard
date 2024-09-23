import {
  useDisclosure,
  Modal,
  Alert,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { Table } from 'antd';
import { CircleEllipsis, Edit, Trash } from 'lucide-react';
import { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getUsersApi } from '../../../utils/api';
import DeleteAlert from '../../../componants/deleteAlert/DeleteAlert';
import { useNavigate } from 'react-router-dom';
import useSearchInTable from '../../../hooks/useSearchInTable';
import paths from '../../../route/paths';
import { deleteProperityById } from '../../../redux/thunck/crudProperites';
const TableProperites = ({ properites }) => {
  const { isLoading, error } = useSelector((state) => state.properites);
  const dispatch = useDispatch();
  const [appartment, setAppartment] = useState({});
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const usernameRef = useRef();
  const roleRef = useRef();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const getColumnSearchProps = useSearchInTable();


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Compound',
      dataIndex: 'compound_id',
      key: 'compound_id',
      ...getColumnSearchProps('compound_id'),
    },
    {
      title: 'Model',
      dataIndex: 'model_id',
      key: 'model_id',
      ...getColumnSearchProps('model_id'),
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      ...getColumnSearchProps('availability'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, rec) => (
        <ButtonGroup
          variant='outline'
          spacing={4}
          size='sm'
        >
          <Button
            colorScheme='teal'
            onClick={() => navigate(`/properites/${rec.id}`)}
          >
            <CircleEllipsis size={20} />
          </Button>
          <Button
            colorScheme='red'
            onClick={() => {
              setAppartment(rec);
              onOpenDialog();
            }}
          >
            <Trash size={20} />
          </Button>
          <Button
            colorScheme='yellow'
            onClick={() => {
              navigate(`/properites/updateproperity/${rec.id}`);
            }}
          >
            <Edit size={20} />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={properites}
        columns={columns}
        bordered={true}
        rowKey={(properite) => properite.id}
        className=' pt-8'
        pagination={{
          position: ['bottomCenter'],
          total: properites?.length,
          pageSize: 15,
        }}
      />
      <DeleteAlert
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        head='Caution Please.'
        body='Be Aware this action can not be Backwords.'
        info={appartment}
        deleteFun={deleteProperityById}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        on
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Appartment</ModalHeader>
          <ModalCloseButton />
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error?.message}</AlertTitle>
            </Alert>
          )}
          <form className='px-5 py-2'>
            <VStack spacing={2}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  ref={usernameRef}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select ref={roleRef}>
                  <option value='user'>User</option>
                  <option value='developer'>Developer</option>
                  <option value='brookers'>Brookers</option>
                </Select>
              </FormControl>
            </VStack>
            <Button
              colorScheme='teal'
              className='w-full mt-4'
              isLoading={isLoading}
              type='submit'
            >
              Submit
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableProperites;
