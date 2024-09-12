import { UploadIcon } from 'lucide-react';
import FileInput from '../../../../componants/file-input/FileInput';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';

const MediaAndDocuments = () => {
  // const {isLoading,error}=useSelector(state=>state.pro)
  const [files, setFiles] = useState([]);
  const [filesList, setFilesList] = useState([]);
  return (
    <div>
      <h3 className=' text-xl fw-semibold text-[#4D5454] ml-3 mt-5 mb-3'>5.Media & Documents</h3>
      <div className=' flex space-x-2 ml-3'>
        {/* <label htmlFor="img1" className=' p-10  flex-col items-center justify-center border-dotted hover:cursor-pointer border-2 rounded-lg' >
      <UploadIcon color='#53ADAE' className=' ml-6' size={20} />
     <span className=' text-[#53ADAE]' > Browse Files</span>
      <input type="file" name="img1" id="img1" />
      </label> */}
        <Flex>
          <FileInput
            lable='Cover Image'
            title='Upload'
            uploadFN={() =>
              dispatch(createNewBunnerFromDashboard({ image: files[0], onClose, setFiles }))
            }
            filesHandler={setFiles}
            files={files}
            multi={false}
            // isLoading={isLoading}
            withUploadButton={false}
          />
          <FileInput
            lable='Images'
            title='Upload'
            uploadFN={() =>
              dispatch(createNewBunnerFromDashboard({ image: files[0], onClose, setFilesList }))
            }
            filesHandler={setFilesList}
            files={filesList}
            multi={true}
            // isLoading={isLoading}
            withUploadButton={false}
          />
        </Flex>

        {/* <label
          htmlFor='img2'
          className=' h-[63px] px-10 pt-2 hover:cursor-pointer  flex-col items-center justify-center border-dotted border-2 rounded-lg'
        >
          <UploadIcon
            color='#53ADAE'
            className=' ml-6'
            size={20}
          />
          <span className=' text-[#53ADAE]'> Browse Files</span>
          <input
            type='file'
            name='img2'
            id='img2'
          />
        </label> */}
      </div>
    </div>
  );
};

export default MediaAndDocuments;
