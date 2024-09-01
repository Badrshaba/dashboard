import { Box, Flex, Text } from '@chakra-ui/react';
import { Button, Card, Image, Space } from 'antd';
import { Dot, Edit, Trash } from 'lucide-react';
const SubCategoryCard = ({ subCate }) => {
  const arabicInfo = subCate?.translations[0];

  return (
    <Card
      hoverable
      title={subCate.name}
      extra={
        <img
          src={subCate.image}
          alt={subCate.name}
        />
      }
      actions={[
        <Button
          icon={<Trash />}
          danger
        ></Button>,
        <Button icon={<Edit />}></Button>,
      ]}
    >
      <Flex flexDirection='row-reverse'>
        <Box dir='rtl'>
          <Text textAlign='right'>{arabicInfo?.name}</Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default SubCategoryCard;
