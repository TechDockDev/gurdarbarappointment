import User from "/opt/models/users.mjs";
import ProviderModel from "/opt/models/service_providers.mjs";
import { connectDB } from "/opt/utils/db.mjs";
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, context, callback) => {
  try {
    // Set the user pool autoConfirmUser flag after validating the email domain
    await connectDB();
    if (event.request.userAttributes["custom:role"] === "Sangat") {
      await User.create({
        first_name: event.request.userAttributes.name.split(" ")[0],
        last_name: event.request.userAttributes.name.split(" ")[1],
        email: event.request.userAttributes.email,
      });
    } else {
      await ProviderModel.create({
        account_manager_name: event.request.userAttributes.name,
        account_manager_email: event.request.userAttributes.email,
        gurudwara_sahib: event.request.userAttributes.gurudwara_sahib,
        gurudwara_id: parseInt(
          event.request.userAttributes["custom:gurudwara_sahib"]
        ),
      });
    }
    console.log(event.request.userAttributes);
    return event;
  } catch (error) {
    console.log(error);
    return event;
  }
};
