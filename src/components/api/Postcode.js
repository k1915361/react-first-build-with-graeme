
// export const apiRequest = async (apiURL, endpoint, key, method = "GET", body = null) => {
  export const apiRequest = () => {

  var myHeaders = new Headers();
  myHeaders.append("Cache-Control", "no-cache");
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Accept-Encoding", "gzip, deflate");
  myHeaders.append("Connection", "keep-alive");

  var raw = "{\r\n    \"ModuleID\": 1,\r\n    \"ModuleName\": \"Games Programming\",\r\n    \"ModuleCode\": \"CI2271\",\r\n    \"ModuleLevel\": 4,\r\n    \"ModuleLeaderID\": 1\r\n}";

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("localhost:5000/api/Modules/1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

export default apiRequest;