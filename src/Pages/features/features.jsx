const Features = () => {
  return (
    <>
      <h1>Features</h1>
      {/* <Pagination
        current={1}
        defaultCurrent={1}
        pageSize={10}
        total={users?.total}
        align='center'
        disabled={pageNumber == users?.last_page}
        showTotal={() => (
          <Text
            fontWeight={500}
            color='teal'
            fontSize='1rem'
          >
            Total Users: {users?.total}
          </Text>
        )}
        onChange={() => {
          setPageNumber((prev) => (pageNumber === users?.last_page ? pageNumber : prev + 1));
          dispatch(getUsersAsync(pageNumber));
        }}
      /> */}
    </>
  );
};

export default Features;
