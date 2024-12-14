import React, { useState } from 'react'
import { speakerData } from '../data/speaker'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const SpeakerPage = () => {

    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler=(product)=>{
            if(selectedProduct.includes(product)){
                setSelectedProduct(selectedProduct.filter(item => item !== product))
            }else{
                setSelectedProduct([...selectedProduct, product]) 
            }
    }


    const filteredProduct = selectedProduct.length===0?
      speakerData : speakerData.filter((orange)=>selectedProduct.includes(orange.company))

return (
<>
<Navbar />
<div className="fullpage">
    
<div className="pro-selected">

{speakerData.map((speaker)=>{
    return(
        <div className='pro-input'>
            <label >
                <input type="checkbox" 
                checked = {selectedProduct.includes(speaker.company)}
                onChange={()=>companyHandler(speaker.company)}
                />
                {speaker.company}
            </label>
        </div>
    )
})}

</div>

<div className='pageSection'>
    {filteredProduct.map((item)=>{
        return(
            <div>

            <Link to={`/speaker/${item.id}`}>
                <div className="pageImg">
                    <img src={item.image} alt="" />
                </div>
            </Link>
                <div className="proModel">
                    {item.company} {item.model}
                </div>
            </div>
        )
    })}

 </div>
</div>
</>
  )
}

export default SpeakerPage