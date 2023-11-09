import { useState } from 'react'
import Button from '../buttun/button'
import './card.css'
const Card = (props) => {
    const [count, setCount] = useState(0)
    const {course,onAddItem,onRemoveItem} = props


    const handlerInkrament = () =>{
        setCount(prev => prev +1);
        onAddItem(course)

    }

    const heandlerDekrament = () =>{
        setCount(prev => prev -1)
        onRemoveItem(course)
    }

  return (
    <div className='card'>
            <div className={`${
                count !== 0 ? 'card__badge' : 'card__badge__hidden'
            }`}>
                {count}
            
            </div>
            <div className="image__container">
                <img src={course.Image} alt={course.title} width={'100%'} height={'230px'}/>
            </div>

            <div className="card__body">
                <h2 className='card__title'>{course.title}</h2>
                <div className="card__price">
                    {course.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </div>
            </div>
            <div className="hr"></div>
            <div className="btn__container">
                <Button title={'+'} type={'add'} onClick={handlerInkrament}/>
                {count !== 0 && (
                <Button title={'-'} type={'remove'} onClick={heandlerDekrament} />
                )}  
            </div>
    </div>
  )
}

export default Card