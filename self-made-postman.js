var fs = require("fs");
const axios = require("axios");

module.exports = async function (context, req) {
  //The code below till line 22 is for the token
  console.log("start");
  var data1 = JSON.stringify({
    serviceAccountId: "xxx",
    accessKey: "xxx",
    secretKey: "xxx",
  });

  var response1;

  var config1 = {
    method: "post",
    url: "https://app.xxx.io/api/v2/service-account/authenticate",

    headers: {
      "Content-Type": "application/json",
    },

    data: data1,
  };
  console.log("reached axios");

  axios(config1)
    .then(function (response1) {
        console.log("inside axios");
      console.log(JSON.stringify(response1.data));
    })

    .catch(function (error) {
      console.log(error);
    });


  //The code below is for the usage retrieval

  context.log("JavaScript HTTP trigger function processed a request.");

  var data = JSON.stringify({
    authSystemInfo: {
      id: "xxx",
      type: "AZURE",
    },
    identityId: "xxx.onmicrosoft.com",
    identityType: "USER",
  });

  var response;

  var config = {
    method: "post",

    url: "https://app.xxx.io/api/v2/identity/tasks/usage",

    headers: {
      "Content-Type": "application/json",
      "X-CloudKnox-Access-Token": response1.data,
    },

    data: data,
  };

  axios(config)
    .then(function (response) {
      var json_res = JSON.stringify(response.data); //console.log(json_res);
      fs.writeFile("responseBody.json", json_res, "utf8", (err) => {
        console.log("start to write");

        if (err) {
          console.error(err);
          return;
        }

        console.log("File has been created");
      });
    })

    .catch(function (error) {
      console.log(error);
    });

  context.res = {
    // status: 200, /* Defaults to 200 */

    body: response,
  };

  context.done();
};
