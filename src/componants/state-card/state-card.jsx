const StateCard = ({ title, number, icon }) => {
  return (
    <div
      className={`card-item bg-white rounded-md p-3 hover:bg-teal-600 duration-300 transition-colors hover:text-white`}
    >
      <div className={`bg-teal-600  p-6 rounded-lg w-fit group/item`}>{icon}</div>
      <p className='my-5 text-2xl font-semiBold '>{number}</p>
      <p className='text-2xl font-semiBold '>{title}</p>
    </div>
  );
};

export default StateCard;
