import React, { useState } from 'react'
import { tvData } from '../data/tv'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import './pag.css'

const TvPage = () => {

    const [selectedbrand, setSelectedbrand] = useState([])

    const tvHandler=(brand)=>{
            if(selectedbrand.includes(brand)){
                setSelectedbrand(selectedbrand.filter(item => item !== brand))
            }else{
                setSelectedbrand([...selectedbrand, brand]) 
            }
    }


    const filteredbrand = selectedbrand.length===0?
      tvData : tvData.filter((item)=>selectedbrand.includes(item.company))

return (
<>
<Navbar />
<div className="fullpage">
    
<div className="pro-selected">

{tvData.map((tv)=>{
    return(
        <div className='pro-input'>
            <label >
                <input type="checkbox" 
                checked = {selectedbrand.includes(tv.company)}
                onChange={()=>tvHandler(tv.company)}
                />
                {tv.company}
            </label>
        </div>
    )
})}

</div>

<div className='pageSection'>
    {filteredbrand.map((item)=>{
        return(
            <div>

            <Link to={`/tv/${item.id}`}>
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

export default TvPage