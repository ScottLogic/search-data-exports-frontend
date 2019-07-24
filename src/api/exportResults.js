const getDownloadRequest = (type, parameters, searchCriteria) => ({
    type,
    parameters,
    searchCriteria
  });
  
  // TODO: Placeholder for handling direct download export requests
  export const handleDirectDownloadRequest = async searchCriteria => {};
  
  export const handleEmailRequest = async (searchCriteria, emailAddress) => {
    const request = getDownloadRequest("email", { emailAddress }, searchCriteria);
    const response = await fetch(`${process.env.REACT_APP_API_URL || ""}/download-request/`,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" }
      }
    );
  
    if (!response.ok) throw Error(response.statusText);
  };
  
  // TODO: Placeholder for handling push notification export requests
  export const handlePushNotificationRequest = async searchCriteria => {};
  