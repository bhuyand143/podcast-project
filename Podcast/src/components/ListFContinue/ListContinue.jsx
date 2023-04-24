import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import {React,useRef,useState} from 'react';
import ListItem from '../ListItemF/ListItem';

import './ListContinue.scss';
import ListItemContinue from '../ListItemFContinue/ListItemContinue';

const ListContinue = ({list}) => {

  const [slideNumber, setslideNumber] = useState(0);
  const listRef = useRef();
  const handleClick = (direction)=>{
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if(direction === "left" && slideNumber > 0)
    {
        setslideNumber(slideNumber-1);
        listRef.current.style.transform = `translateX(${230+distance}px)`
    }
    if(direction === "right" && slideNumber < 4)
    {
        setslideNumber(slideNumber+1);
        listRef.current.style.transform = `translateX(${-230+distance}px)`
    }
  }

  return (
    <div className='list2'>
      <span className="listTitle2">{list.title}</span>
      <div className="wrapper2">
        <ArrowBackIosOutlined style={{display:`${slideNumber ===0 ?`none`:''} `}} className='sliderArrow2 left2' onClick={()=>{handleClick("left")}}/>
        <div className="container2" ref={listRef}>
            {list.content.map((item,i)=> (
            <ListItemContinue index={i} item = {item} />
            ))}
            
        </div>
        <ArrowForwardIosOutlined style={{display: `${list.content.length < 5 ? `none`:''}`}} className='sliderArrow2 right2' onClick={()=>{handleClick("right")}}/>
      </div>
    </div>
  );
}

export default ListContinue;
