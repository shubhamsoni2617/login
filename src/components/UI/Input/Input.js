import React from 'react';
import classes from './Input.module.css';


const input=(props)=>{

     let inputElement=null;
     let inputStyle=[classes.InputElement]

if(props.invalid && props.shouldUpdate && props.touched){
inputStyle.push(classes.Invalid)
}


     switch(props.elemType){
         case 'input': 
         inputElement=
         <input className={inputStyle.join(' ')} 
          {...props.elemConfig} value={props.value} onChange={props.changed}/>;
         break;
         case 'textarea': 
         inputElement=
         <textarea className={inputStyle.join(' ')}
          {...props.elemConfiginputStyle} onChange={props.changed}/>;
          
         break;
         case 'select': 
         inputElement=
         <select className={inputStyle.join(' ')}
         value={props.value} onChange={props.changed}>
               {props.elemConfig.options.map(elem=>
                <option key={elem.value} value={elem.value}>{elem.displayValue}</option>)}
         </select>
         break;
         default:
         inputElement=
         <input className={inputStyle.join(' ')}
          {...props.elemConfig} onChange={props.changed}/>;
     }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;