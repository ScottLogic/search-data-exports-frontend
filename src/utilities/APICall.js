export default async (request) => {    

  return fetch(`${process.env.REACT_APP_API_URL ||''}/search/`,{        
    method: 'POST',
    mode: 'cors'  ,
    body: JSON.stringify(request) ,       
     headers: {
      "Content-Type" : "application/json",
    } 
  }).then( response => response.json());
};
