import { toast } from 'react-toastify';

const getDownloadRequest = (type, parameters, searchCriteria) => ({
  type,
  parameters,
  searchCriteria
});
  
// TODO: Placeholder for handling direct download export requests
const handleDirectDownloadRequest = async searchCriteria => {};

const handleEmailRequest = async (searchCriteria, emailAddress) => {
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
const handlePushNotificationRequest = async searchCriteria => {};

export const handleModalSubmit = (modalData, lastRequest) => {
  switch (modalData.selectedType) {
    case "directDownload": 
      handleDirectDownloadRequest();  
      break;
    case "email":
      handleEmailRequest(lastRequest, modalData.emailAddress)
      .then(() =>
          toast.success("Success! You will shortly receive an email."))
      .catch(error => {
          toast.error("Something went wrong, please try again.");
          console.error(error);
        });
      break;
    case "pushNotification":
      handlePushNotificationRequest();
      break;
    default:
      break;
  };
};
