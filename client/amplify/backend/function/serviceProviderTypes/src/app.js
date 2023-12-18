// Import necessary modules
import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware.js";
import serviceProviderModel from "/opt/models/service_provider_types.mjs";

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

// Example GET method
app.get("/service-provider-types", async (req, res) => {
  try {
    const serviceProviders = await serviceProviderModel.findAll({
      attributes: ["gurudwara_id", "gurudwara_name"], // Specify the field(s) you want to retrieve
    });

    res.json({
      status: true,
      message: "Service Provider Types have been fetched successfully",
      serviceProviders,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Something went wrong", error });
  }
});

// Other HTTP methods (POST, PUT, DELETE) can be similarly modified.

// Start the Express.js app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

// Export the app object
export default app;
