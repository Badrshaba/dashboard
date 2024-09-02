import { useParams } from "react-router-dom"


const ProperitePage = () => {
    const {properiteId} = useParams()

  return (
    <div>ProperitePage: {properiteId}</div>
  )
}

export default ProperitePage