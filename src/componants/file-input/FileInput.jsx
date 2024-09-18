import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import { List, Typography } from 'antd';
import { UploadIcon } from 'lucide-react';

const FileInput = ({
  lable,
  title,
  uploadFN,
  filesHandler,
  files,
  multi,
  isLoading,
  withUploadButton,
}) => {
  const handleInputChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      filesHandler((prev) => [...prev, e.target.files[i]]);
    }
  };
  return (
    <FormControl>
      <FormLabel>{lable}</FormLabel>
      <label
        htmlFor='file-upload'
        className='custom-file-upload'
      >
        <UploadIcon size={20} />
        {title}
      </label>
      <input
        id='file-upload'
        type='file'
        onChange={(e) => handleInputChange(e)}
        
        multiple={multi}
      />

      {!!files.length && (
        <List
          className='mt-1'
          size='small'
          split={true}
          dataSource={files}
          renderItem={(file) => (
            <List.Item>
              <Typography.Text>{file.name}</Typography.Text>
            </List.Item>
          )}
          bordered
        />
      )}
      {withUploadButton && (
        <Button
          onClick={uploadFN}
          className='mt-4 block w-full'
          colorScheme='teal'
          isLoading={isLoading}
        >
          Upload
        </Button>
      )}
    </FormControl>
  );
};

export default FileInput;
