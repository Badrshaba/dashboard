import { useParams } from "react-router-dom"


const CompoundPage = () => {
    const {compoundId} = useParams()
    
  return (
    <div>
<h2>CompoundPage : {compoundId}</h2>
    </div>
  )
}

export default CompoundPage