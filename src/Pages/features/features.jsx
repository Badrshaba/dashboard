import { useDispatch, useSelector } from "react-redux";
import AddFeatures from "./AddFeatures";
import TableFeature from "./TableFeatures";
import { useEffect } from "react";
import { getFeatures } from "../../redux/thunck/crudFeatures";
import useSearch from "../../hooks/useSearch";
import { Button, Input } from "@chakra-ui/react";

const Features = () => {
  const { features, isLoading, error } = useSelector((state) => state.features);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeatures());
  }, []);
  const [searchHandel, search, setSearch] = useSearch('');

  return (
    <div className="bg-white p-3 rounded-md">
      <h3 className="text-3xl">Features</h3>
     <div className=" flex justify-between items-center">
     <AddFeatures />
      <form
        action=""
        className=" flex items-center space-x-2"
        onSubmit={searchHandel}
      >
        <Input
          type="text"
          name="area_en"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button> Search </Button>
      </form>
     </div>
      <TableFeature features={features} />
    </div>
  );
};

export default Features;
