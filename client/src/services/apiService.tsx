import { API, Storage } from "aws-amplify";
import { RootPath, Endpoints } from "./apipaths";
import dayjs from "dayjs";

interface AppointmentResponse {
  appointments: any[];
  total: number;
}
const apiName = RootPath.AppointmentApi;

export async function getAppointmentsByStatus({
  page,
  pageSize,
  status,
}: {
  page: number;
  pageSize: number;
  status: string;
}): Promise<AppointmentResponse> {
  try {
    const path = Endpoints.GetAppointments;
    const response: AppointmentResponse = await API.get(apiName, path, {
      queryStringParameters: {
        status,
        page,
        pageSize,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching past appointments:", error);
    throw error;
  }
}

export async function getServiceProviderTypes(): Promise<any> {
  const path = Endpoints.GetServiceProviderTypes;

  try {
    const response = await API.get(apiName, path, {});
    return response.serviceProviders;
  } catch (error) {
    console.error("Error fetching service providers:", error);
    throw error;
  }
}

export async function getServiceProviderSlots(id: any, date: string) {
  const path = Endpoints.GetServiceProviderSlots + id;

  const timeZoneOffsetInMinutes = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(timeZoneOffsetInMinutes) / 60);
  const minutes = Math.abs(timeZoneOffsetInMinutes % 60);
  const formattedOffset =
    (timeZoneOffsetInMinutes > 0 ? "-" : "+") +
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes;

  try {
    const response = await API.get(apiName, path, {
      queryStringParameters: {
        date: new Date(date).getTime(),
        timezone: formattedOffset,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}

export async function cancelAppointment(
  appointmentId: string,
  cancellationReason: string,
  cancelledBy: string
) {
  const path = Endpoints.CancelAppointment;
  try {
    await API.patch(apiName, path, {
      body: {
        appointmentId,
        cancellationReason,
        cancelledBy,
      },
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
}

export const fetchUserProfile = async (path: string) => {
  try {
    return API.get(apiName, path, {});
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const getProfileData = async () => {
  try {
    const response = await API.get(apiName, Endpoints.GetCustomerProfile, {});
    return response?.Customer || {};
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

export const updateProfileData = async (data: any) => {
  try {
    await API.patch(apiName, Endpoints.EditProfile, {
      body: data,
    });
  } catch (error) {
    console.error("Error updating profile data:", error);
    throw error;
  }
};

export const uploadProfileImage = async (email: string, file: any) => {
  try {
    await Storage.put(email, file, {
      level: "protected",
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};

export const editServiceProvider = async (formData: any) => {
  try {
    return await API.patch(apiName, Endpoints.EditServiceProviderProfile, {
      body: {
        account_manager_name: formData.name,
        account_manager_phone: formData.phone,
        account_manager_address: formData.address,
      },
    });
  } catch (error) {
    console.error("Error editing profile image:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await API.get(apiName, Endpoints.GetServiceProviderProfile, {});
  } catch (error) {
    throw error;
  }
};

export const getSchedule = async () => {
  try {
    return await API.get(apiName, Endpoints.GetSchedule, {});
  } catch (error) {
    throw error;
  }
};

export const saveSchedule = async (
  schedule: any,
  perDay: number,
  scheduleAvailable: boolean
) => {
  try {
    const body = {
      scheduleJSON: JSON.stringify({ ...schedule, perDay }),
    };

    if (scheduleAvailable) {
      await API.patch(apiName, Endpoints.GetSchedule, { body });
    } else {
      await API.post(apiName, Endpoints.GetSchedule, { body });
    }
  } catch (error) {
    throw error;
  }
};

export const bookAppointment = async (
  date: any,
  bookingReason: any,
  id: string
): Promise<void> => {
  try {
    await API.post(apiName, Endpoints.BookAppointment, {
      body: {
        startTime: dayjs(date).valueOf(),
        notes: bookingReason,
        providerId: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export async function getServiceProviders({
  pageSize,
  page,
  // type_id,
  searchQuery,
}: {
  pageSize: number;
  page: number;
  // type_id: number | null;
  searchQuery: string | null;
}) {
  try {
    const response = await API.get(apiName, Endpoints.ServiceProviders, {
      queryStringParameters: {
        pageSize,
        page: page,
        // service_type_id: type_id,
        searchQuery: searchQuery,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAppointmentsHistory({
  page,
  pageSize,
  searchQuery,
  isSelected,
}: {
  page: number;
  pageSize: number;
  searchQuery: string;
  isSelected: string;
}): Promise<any> {
  try {
    const path = Endpoints.PastAppointments;
    const response = await API.get(apiName, path, {
      queryStringParameters: {
        searchQuery,
        pageSize,
        page,
        status: isSelected,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching past appointments:", error);
    throw error;
  }
}

export async function getAppointmentsStats({
  time,
  timeZone,
}: {
  time: number;
  timeZone: string;
}): Promise<any> {
  try {
    const path = Endpoints.AppointmentStats;
    const response = await API.get(apiName, path, {
      queryStringParameters: {
        time,
        timeZone,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching appointments stats:", error);
    throw error;
  }
}

export async function getAppointmentsStatsToday({
  time,
  timeZone,
}: {
  time: number;
  timeZone: string;
}): Promise<any> {
  try {
    const path = Endpoints.AppointmentStatsToday;
    const response = await API.get(apiName, path, {
      queryStringParameters: {
        time,
        timeZone,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching appointments stats:", error);
    throw error;
  }
}
