/* Amplify Params - DO NOT EDIT
	AUTH_APPOINTMENT9712A810_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT 
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware.js";
import sequelize from "sequelize";
import appointmentModel from "/opt/models/sp_appointments.mjs";
import getAuthenticatedUser from "/opt/utils/auth.mjs";
import ProviderModel from "/opt/models/service_providers.mjs";
import serviceProviderTypesModel from "/opt/models/service_provider_types.mjs";
import spAppointmentSettings from "/opt/models/sp_appointment_settings.mjs";
import { Op } from "sequelize";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/appointment/book", async function (req, res) {
  try {
    const { startTime, slotTime, notes, providerId } = req.body;
    const user = await getAuthenticatedUser(req);

    const booking = await appointmentModel.create({
      gurudwara_appointment_date: startTime,
      appointment_notes: notes,
      appointment_status_id: 1,
      sangat_id: user.sangat_id,
      account_manager_id: providerId,
    });

    res.json({
      status: true,
      message: "appointment has been booked successfully",
      booking,
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

app.patch("/appointment/cancel", async function (req, res) {
  // Add your code here
  try {
    const { appointmentId, cancellationReason, cancelledBy } = req.body;
    let appointmentData = await appointmentModel.findByPk(appointmentId);
    appointmentData = await appointmentData.update({
      appointment_status_id: 2,
      cancellation_reason: cancellationReason,
      cancelled_by: cancelledBy,
    });
    res.json({
      status: true,
      message: "appointment has been cancelled successfully",
      appointmentData,
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
9;
app.get("/appointment", async function (req, res) {
  try {
    // Get the authenticated user
    const user = await getAuthenticatedUser(req);
    // Get the query parameter value
    const status = req.query.status;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    // Get the current time as a JavaScript Date object
    const currentTime = new Date().setHours(0, 0, 0, 0);

    let condition = {};
    let appointmentSortingOrder = "DESC";
    if (status === "upcoming") {
      condition = {
        gurudwara_appointment_date: {
          [Op.gt]: currentTime,
        },
        appointment_status_id: 1,
      };
      appointmentSortingOrder = "ASC";
    } else if (status === "past") {
      condition = {
        gurudwara_appointment_date: {
          [Op.lt]: currentTime,
        },
        appointment_status_id: 1,
      };
    } else if (status === "cancelled") {
      condition = { appointment_status_id: 2 };
    }

    const appointments = await appointmentModel.findAll({
      where: { ...condition, sangat_id: user.sangat_id },
      include: [
        {
          model: ProviderModel,
          include: [
            {
              model: serviceProviderTypesModel,
            },
          ],
        },
      ],
      order: [
        ["gurudwara_appointment_date", appointmentSortingOrder], // Sort in ascending order
      ],
      limit: pageSize,
      offset: offset,
    });
    const total = await appointmentModel.count({
      where: { ...condition, sangat_id: user.sangat_id },
    });
    res.json({
      status: true,
      message: "Appointments have been fetched",
      appointments,
      total,
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

app.get("/appointment/slots/:providerId", async function (req, res) {
  const { providerId } = req.params;
  let { date, timezone } = req.query;
  const [hours, minutes] = timezone.split(":");
  const minuteToOffset = String(Number(minutes) / 60).split(".")[1];

  function convertISTtoUTC(ISTDate, timeZoneOffset) {
    const ISTOffset = timeZoneOffset * 60 * 60 * 1000;
    const utcDate = new Date(ISTDate.getTime() - ISTOffset);
    return utcDate;
  }

  const dateInIST = new Date(parseInt(date));

  const dateInUTC = convertISTtoUTC(
    dateInIST,
    parseFloat(hours.substring(1) + "." + minuteToOffset)
  );

  try {
    let { gurudwara_setting } = await spAppointmentSettings.findOne({
      where: {
        account_manager_id: providerId,
      },
    });
    gurudwara_setting = JSON.parse(gurudwara_setting);
    let { perDay } = gurudwara_setting;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date(parseInt(date)).getDay();
    if (!gurudwara_setting[days[day]].open) {
      return res.json({
        status: true,
        message: "Service Provider is not available on this day",
      });
    }
    const startTime = gurudwara_setting[days[day]].startTime;
    const endTime = gurudwara_setting[days[day]].endTime;

    let appointmentsCount = await appointmentModel.count({
      where: {
        appointment_status_id: 1,
        account_manager_id: providerId,
        gurudwara_appointment_start: {
          [Op.and]: {
            [Op.gte]: dateInUTC,
            [Op.lt]: new Date(dateInUTC.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      },
    });
    if (parseInt(perDay) - appointmentsCount < 1) {
      res.json({
        status: true,
        message: "All Schedules are booked",
      });
    }

    res.json({
      status: true,
      message: "Available Schedule is fetched successfully",
      perDay,
      startTime,
      endTime,
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

app.get("/appointment/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.post("/appointment/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/appointment", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/appointment/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/appointment", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/appointment/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application locally, this does nothing.
// However, to port it to AWS Lambda, we will create a wrapper that will load the app from this file.
export default app;
