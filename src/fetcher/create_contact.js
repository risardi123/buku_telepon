import {fetch_link} from '../Constant/Constant';

export const create_contact = ({body}) => {
  return new Promise(resolve => {
    fetch(`${fetch_link}contact`,{
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
      .then((value)=> {
      resolve(value)
    }).catch((e)=>{resolve(e)})
  })
}
