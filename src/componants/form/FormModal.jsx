import { Button, ModalBody, ModalFooter } from '@chakra-ui/react';

const FormModal = ({ onClose, formData, handleChange, handleSubmit, label_AR }) => {
  let ArabicItems = Object.keys(formData).filter((key) => key.includes('AR'));
  let EnglishItems = Object.keys(formData).filter((key) => key.includes('EN'));
  return (
    <form
      action=''
      onSubmit={handleSubmit}
    >
      <ModalBody
        pb={6}
        className='flex space-x-2 '
      >
        <div className=' flex flex-col w-full'>
          {EnglishItems.map((item, index) => (
            <label
              key={index}
              className={'capitalize flex flex-col items-start'}
            >
              {item.slice(0, -2)}:
              <input
                type='text'
                name={item}
                value={formData?.name}
                onChange={handleChange}
                className=' border rounded-lg py-1 px-2 w-full'
              />
            </label>
          ))}
        </div>
        {!!ArabicItems.length && (
          <div className=' flex flex-col w-full'>
            {ArabicItems.map((item, index) => (
              <label
                key={index}
                className={' flex flex-col items-end'}
              >
                :{label_AR[index]}
                <input
                  type='text'
                  name={item}
                  value={formData?.name}
                  onChange={handleChange}
                  className=' border rounded-lg py-1 px-2 w-full'
                  style={{ direction: 'rtl' }}
                />
              </label>
            ))}
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme='green'
          type='submit'
          mr={3}
        >
          Add
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </form>
  );
};

export default FormModal;
