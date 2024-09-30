import {
Button,
ButtonGroup,
} from '@chakra-ui/react';
import { Table } from 'antd';
import { CircleEllipsis, Edit, Trash } from 'lucide-react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSearchInTable from '../../../hooks/useSearchInTable';



const TableRequest = ({ ebrooker }) => {
    const { isLoading, error } = useSelector((state) => state.RequestEbrooker);
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
        title: 'Phone',
        dataIndex: 'mobile',
        key: 'mobile',
        ...getColumnSearchProps('mobile'),
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
              onClick={() => navigate(`${rec.id}`)}
            >
              <CircleEllipsis size={20} />
            </Button>
          
          </ButtonGroup>
        ),
      },
    ];
  return (
    <>
      <Table
        loading={isLoading}
        dataSource={ebrooker}
        columns={columns}
        bordered={true}
        rowKey={(properite) => properite.id}
        className=' pt-8'
        pagination={{
          position: ['bottomCenter'],
          total: ebrooker?.length,
          pageSize: 15,
        }}
      />
    </>
  );
};


export default TableRequest