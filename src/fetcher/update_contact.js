import {fetch_link} from '../Constant/Constant';

export const update_contact = ({id,body}) =>{
  return new Promise(resolve => {
    fetch(`${fetch_link}contact/${id}`,{
      method: 'PUT',
      body: JSON.stringify(body),
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(resp => resp.json())
      .then((value)=> {
      resolve(value)
    }).catch((e)=>{resolve(e)})
  })
}
