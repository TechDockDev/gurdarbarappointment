import AWS from "aws-sdk";
AWS.config.update({ region: process.env.region });
import userModel from "../models/users.mjs";
import ProviderModel from "../models/service_providers.mjs";

async function getAuthenticatedUser(req) {
  try {
    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider();
    let userSub =
      req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider.split(
        ":CognitoSignIn:"
      )[1];
    let request = {
      UserPoolId: process.env.AUTH_APPOINTMENT9712A810_USERPOOLID, // Set your cognito user pool id
      Filter: `sub = "${userSub}"`,
      Limit: 1,
    };
    let { Users } = await cognitoidentityserviceprovider
      .listUsers(request)
      .promise();

    console.log(Users[0].Attributes);
    if (Users[0].Attributes[4].Value === "Gurudwara Sahib") {
      return await ProviderModel.findOne({
        where: { account_manager_email: Users[0].Attributes[5].Value },
      });
    }
    return await userModel.findOne({
      where: { email: Users[0].Attributes[4].Value },
    });
  } catch (error) {
    console.log(error);
  }
}

export default getAuthenticatedUser;
