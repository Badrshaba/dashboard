import {
    Button,
    ButtonGroup,
    } from '@chakra-ui/react';
    import { Table } from 'antd';
    import { CircleEllipsis, Edit, Trash } from 'lucide-react';
    import {  useSelector } from 'react-redux';
    import { useNavigate } from 'react-router-dom';
    import useSearchInTable from '../../../hooks/useSearchInTable';
    
    
    
    const TableRequest = ({ sales }) => {
        const { isLoading, error } = useSelector((state) => state.RequestSales);
        const navigate = useNavigate();
        const getColumnSearchProps = useSearchInTable();
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name_sales',
            key: 'name_sales',
            ...getColumnSearchProps('name_sales'),
          },
          {
            title: 'Phone',
            dataIndex: 'mobile_sales',
            key: 'mobile_sales',
            ...getColumnSearchProps('mobile_sales'),
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
            dataSource={sales}
            columns={columns}
            bordered={true}
            rowKey={(properite) => properite.id}
            className=' pt-8'
            pagination={{
              position: ['bottomCenter'],
              total: sales?.length,
              pageSize: 15,
            }}
          />
        </>
      );
    };
    
    
    export default TableRequest