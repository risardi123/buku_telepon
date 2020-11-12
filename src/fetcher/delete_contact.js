import {fetch_link} from '../Constant/Constant';

export const delete_contact = ({id}) => {
  return new Promise(resolve => {
    fetch(`${fetch_link}contact/${id}`,{
      method: 'DELETE',
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    }).then(resp => resp.json())
      .then((value)=> {
        resolve(value)
      }).catch((e)=>{resolve(e)})
  })
}
