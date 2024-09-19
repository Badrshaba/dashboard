import { useState } from 'react';
import {
  useDisclosure,
  Modal,
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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
import { Edit, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersApi } from '../../../utils/api';
import { DeleteAlert } from '../../../componants';
import { deleteFeatures } from '../../../redux/thunck/crudFeatures';
const TableFeature = ({ features }) => {
  const { isLoading } = useSelector((state) => state.features);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();
 
const deleteFeature = ({id,onClose})=>{
  dispatch(deleteFeatures(id))
  onClose()
}

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Compound id',
      dataIndex: 'compound_id',
      key: 'compound_id',
    },
    {
      title: 'User id',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, feature) => (
        <ButtonGroup
          variant='outline'
          size='sm'
          spacing={4}
        >
          <Button
            colorScheme='red'
            onClick={() => {
              setUserInfo(feature);
              onOpenDialog()
            }}
          >
            <Trash size={20} />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={features}
        columns={columns}
        rowKey={(feature) => feature.id}
        className=' pt-8'
        pagination={{
          position: ['bottomCenter'],
          total: features?.length,
          pageSize: 15,
        }}
      />
      <DeleteAlert
        body={'Do you want delete features'}
        head={'Delete features'}
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        info={userInfo}
        deleteFun={deleteFeature}
      />
    </>
  );
};

export default TableFeature;
