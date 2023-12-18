import providerModel from "/opt/models/service_providers.mjs";
import UserModel from "/opt/models/users.mjs";
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, context, callback) => {
  let user = await providerModel.findOne({
    where: {
      account_manager_email: decodeURIComponent(
        event.Records[0].s3.object.key.split("/")[2]
      ),
    },
  });
  if (!user) {
    user = await UserModel.findOne({
      where: {
        email: decodeURIComponent(event.Records[0].s3.object.key.split("/")[2]),
      },
    });
  }

  user = await user.update({
    profile_avatar: decodeURIComponent(
      event.Records[0].s3.object.key.split("/")[1]
    ),
  });

  return {
    statusCode: 200,
    // Uncomment below to enable CORS requests
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "*"
    // },
    body: user,
  };
};
