export default async (request,setMaxPages,setData) => {    

  fetch(`${ ((process.env.REACT_APP_API_URL) ? process.env.REACT_APP_API_URL : '')}/search/`,{        
    method: 'POST',
    mode: 'cors'  ,
    body: JSON.stringify(request) ,       
     headers: {
      "Content-Type" : "application/json",
    } 
  })
    .then( response => response.json())
    .then( (response) => { 
        setMaxPages(Math.ceil(response.hits.total.value / request.results));
        setData(response.hits.hits);

  }).catch( error => {      
      setMaxPages(0);
      setData([]);      
  })
};
