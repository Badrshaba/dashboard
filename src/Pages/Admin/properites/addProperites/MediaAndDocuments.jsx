import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import FileInput from '../../../../componants/file-input/FileInput';

const MediaAndDocuments = () => {
  const [files, setFiles] = useState([]);
  const [filesList, setFilesList] = useState([]);
  return (
    <Box px={5}>
      <h3 className='mb-3 text-xl fw-semibold text-[#4D5454]'>6.Media & Documents</h3>
      <Flex gap={5}>
        <FileInput
          lable='Cover Image'
          title='Upload'
          filesHandler={setFiles}
          files={files}
          multi={false}
          // isLoading={isLoading}
          withUploadButton={false}
        />
        <FileInput
          lable='Images List'
          title='Upload'
          filesHandler={setFilesList}
          files={filesList}
          // isLoading={isLoading}
          withUploadButton={false}
        />
      </Flex>
    </Box>
  );
};

export default MediaAndDocuments;
