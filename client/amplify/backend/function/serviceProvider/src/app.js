/* Amplify Params - DO NOT EDIT
	AUTH_APPOINTMENT9712A810_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware.js";
import { sequelize } from "/opt/utils/db.mjs";
import { Sequelize, Op } from "sequelize";
import serviceProviderModel from "/opt/models/service_providers.mjs";
import userModel from "/opt/models/users.mjs";
import getAuthenticatedUser from "/opt/utils/auth.mjs";
import spAppointmentSettings from "/opt/models/sp_appointment_settings.mjs";
import appointmentModel from "/opt/models/sp_appointments.mjs";
import appointmentStatusModel from "/opt/models/appointment_statuses.mjs";
import serviceProviderTypesModel from "/opt/models/service_provider_types.mjs";

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const convertISTtoUTC = (ISTDate, timeZoneOffset) => {
  const ISTOffset = timeZoneOffset * 60 * 60 * 1000;
  const utcDate = new Date(ISTDate.getTime() - ISTOffset);
  return utcDate;
};

app.get("/service-provider", async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const serviceProviders = await serviceProviderModel.findAll({
      include: [
        {
          model: serviceProviderTypesModel,
          where: {
            gurudwara_name: {
              [Op.like]: `%${searchQuery}%`, // Use Op.like for case-sensitive partial match
            },
          },
        },
      ],
      limit: pageSize,
      offset,
    });

    const total = await serviceProviderModel.count({
      include: [
        {
          model: serviceProviderTypesModel,
          where: {
            gurudwara_name: {
              [Op.like]: `%${searchQuery}%`, // Use Op.like for case-sensitive partial match
            },
          },
        },
      ],
    });

    res.json({
      status: true,
      message: "Service Providers have been fetched successfully",
      serviceProviders,
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

app.get("/service-provider/appointment/today", async (req, res) => {
  try {
    let { time, timeZone } = req.query;
    const user = await getAuthenticatedUser(req);
    const [hours, minutes] = timeZone.split(":");
    const minuteToOffset = String(Number(minutes) / 60).split(".")[1];

    const dateInIST = new Date(parseInt(time));
    const dateInUTC = convertISTtoUTC(
      new Date(dateInIST),
      parseFloat(hours.substring(1) + "." + minuteToOffset)
    );

    const appointments = await appointmentModel.findAll({
      where: {
        account_manager_id: user.account_manager_id,
        appointment_status_id: 1,
        gurudwara_appointment_date: {
          [Op.and]: {
            [Op.gte]: dateInUTC,
            [Op.lt]: new Date(dateInUTC.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      },
      include: userModel,
    });

    res.json({
      status: true,
      message:
        "Service Provider's Today's Appointments have been fetched successfully",
      appointments,
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

app.get("/service-provider/appointment/past", async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const { searchQuery, status } = req.query;
    const offset = (page - 1) * pageSize;
    let condition = [];
    const currentTime = new Date().setHours(0, 0, 0, 0);
    if (status === "upcoming") {
      condition = [
        {
          gurudwara_appointment_date: {
            [Op.gt]: currentTime,
          },
          appointment_status_id: 1,
        },
      ];
    } else if (status === "past") {
      condition = [
        {
          gurudwara_appointment_date: {
            [Op.lte]: currentTime,
          },
        },
        {
          appointment_status_id: 2,
        },
      ];
    }

    const appointments = await appointmentModel.findAll({
      where: {
        account_manager_id: user.account_manager_id,
        [Op.or]: condition,
      },
      order: [["gurudwara_appointment_date", "DESC"]],
      include: [
        {
          model: userModel,
          where: searchQuery
            ? {
                [Op.or]: [
                  {
                    [Op.and]: [
                      {
                        first_name: {
                          [Op.like]: `%${searchQuery
                            .split(" ")[0]
                            .toLowerCase()}%`,
                        },
                      },
                      {
                        last_name: {
                          [Op.like]: `%${
                            searchQuery.includes(" ")
                              ? searchQuery.split(" ")[1].toLowerCase()
                              : ""
                          }%`,
                        },
                      },
                    ],
                  },
                  {
                    email: {
                      [Op.like]: `%${searchQuery.toLowerCase()}%`,
                    },
                  },
                ],
              }
            : {},
        },
        appointmentStatusModel,
      ],
      limit: pageSize,
      offset: offset,
    });

    const appointmentsCount = await appointmentModel.count({
      where: {
        account_manager_id: user.account_manager_id,
        gurudwara_appointment_date: {
          [Op.lte]: new Date(),
        },
      },
      include: [
        {
          model: userModel,
          where: searchQuery
            ? {
                [Op.or]: [
                  {
                    [Op.and]: [
                      {
                        first_name: {
                          [Op.like]: `%${searchQuery
                            .split(" ")[0]
                            .toLowerCase()}%`,
                        },
                      },
                      {
                        last_name: {
                          [Op.like]: `%${
                            searchQuery.includes(" ")
                              ? searchQuery.split(" ")[1].toLowerCase()
                              : ""
                          }%`,
                        },
                      },
                    ],
                  },
                  {
                    email: {
                      [Op.like]: `%${searchQuery.toLowerCase()}%`,
                    },
                  },
                ],
              }
            : {},
        },
      ],
    });

    const totalPages = Math.ceil(appointmentsCount / pageSize);

    res.json({
      status: true,
      message:
        "Service Provider's Past Appointments have been fetched successfully",
      appointments,
      totalPages,
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

app.get("/service-provider/appointment/stats", async (req, res) => {
  try {
    let { time, timeZone } = req.query;
    const user = await getAuthenticatedUser(req);
    const [hours, minutes] = timeZone.split(":");
    const minuteToOffset = String(Number(minutes) / 60).split(".")[1];

    const dateInIST = new Date(parseInt(time));
    const dateInUTC = convertISTtoUTC(
      new Date(dateInIST),
      parseFloat(hours.substring(1) + "." + minuteToOffset)
    );

    const schedule = await spAppointmentSettings.findOne({
      where: {
        account_manager_id: user.account_manager_id,
      },
    });

    const totalBooking = await appointmentModel.count({
      where: {
        account_manager_id: user.account_manager_id,
        appointment_status_id: 1,
      },
    });

    const todayBooking = await appointmentModel.count({
      where: {
        account_manager_id: user.account_manager_id,
        appointment_status_id: 1,
        gurudwara_appointment_date: {
          [Op.and]: {
            [Op.gte]: dateInUTC,
            [Op.lt]: new Date(dateInUTC.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      },
    });

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    res.json({
      status: true,
      message: "Service Provider's Stats have been fetched successfully",
      schedule: schedule
        ? JSON.parse(schedule.gurudwara_setting)[days[new Date().getDay()]]
        : "",
      totalBooking,
      todayBooking,
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

app.get("/service-provider/schedule", async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req);
    const schedule = await spAppointmentSettings.findOne({
      where: { account_manager_id: user.account_manager_id },
    });

    if (!schedule) {
      return res.status(404).json({
        status: true,
        message: "Service Provider's Schedule is not found",
      });
    }

    res.json({
      status: true,
      message: "Service Provider's Schedule has been fetched successfully",
      schedule: JSON.parse(schedule.gurudwara_setting),
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

app.get("/service-provider/current", async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req);
    const provider = await serviceProviderModel.findOne({
      where: {
        account_manager_email: user.account_manager_email,
      },
      include: serviceProviderTypesModel,
    });

    res.json({
      status: true,
      message: "Service Provider has been fetched successfully",
      provider,
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

app.get("/service-provider/*", (req, res) => {
  res.json({ success: "get call succeed!", url: req.url });
});

app.post("/service-provider/schedule", async (req, res) => {
  const { scheduleJSON } = req.body;
  try {
    const user = await getAuthenticatedUser(req);
    const schedule = await spAppointmentSettings.create({
      gurudwara_setting: scheduleJSON,
      account_manager_id: user.account_manager_id,
    });

    res.json({
      status: true,
      message: "Schedule has been saved successfully",
      schedule,
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

app.post("/service-provider/*", (req, res) => {
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/service-provider", (req, res) => {
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.patch("/service-provider/schedule", async (req, res) => {
  const { scheduleJSON } = req.body;
  try {
    const user = await getAuthenticatedUser(req);
    let schedule = await spAppointmentSettings.findOne({
      where: {
        account_manager_id: user.account_manager_id,
      },
    });

    schedule = await schedule.update({
      gurudwara_setting: scheduleJSON,
    });

    res.json({
      status: true,
      message: "Schedule has been saved successfully",
      schedule,
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

app.patch("/service-provider/edit", async (req, res) => {
  const {
    account_manager_name,
    account_manager_phone,
    account_manager_address,
  } = req.body;
  try {
    const user = await getAuthenticatedUser(req);
    let serviceProvider = await serviceProviderModel.findOne({
      where: {
        account_manager_email: user.account_manager_email,
      },
    });

    serviceProvider = await serviceProvider.update({
      account_manager_name,
      account_manager_phone,
      account_manager_address,
    });

    res.json({
      status: true,
      message: "Service Provider has been updated successfully",
      serviceProvider,
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

app.put("/service-provider/*", (req, res) => {
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/service-provider", (req, res) => {
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/service-provider/*", (req, res) => {
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, () => {
  console.log("App started");
});

export default app;
