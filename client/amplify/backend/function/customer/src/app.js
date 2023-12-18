/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	AUTH_APPOINTMENT9712A810_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware.js";
import userModel from "/opt/models/users.mjs";
import getAuthenticatedUser from "/opt/utils/auth.mjs";

// Declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/customer/current", async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req);
    const Customer = await userModel.findOne({
      where: {
        email: user.email,
      },
    });
    res.json({
      status: true,
      message: "Customer has been fetched successfully",
      Customer,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
});

app.get("/customer/*", (req, res) => {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/customer", (req, res) => {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/customer/*", (req, res) => {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/customer", (req, res) => {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/customer/*", (req, res) => {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example patch method *
 ****************************/

app.patch("/customer/edit", async (req, res) => {
  const { first_name, last_name, phone, address } = req.body;
  try {
    const user = await getAuthenticatedUser(req);
    let customer = await userModel.findOne({
      where: {
        email: user.email,
      },
    });
    customer = await customer.update({
      first_name,
      last_name,
      phone,
      address,
    });
    res.json({
      status: true,
      message: "Customer has been updated successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/customer", (req, res) => {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/customer/*", (req, res) => {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, () => {
  console.log("App started");
});

// Export the app object. When executing the application locally, this does nothing. However, to port it to AWS Lambda, we will create a wrapper that will load the app from this file.
export default app;
