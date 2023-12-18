export enum RootPath {
  AppointmentApi = "appointmentApi",
}

export enum Endpoints {
  GetAppointments = "/appointment",
  GetServiceProviderTypes = "/service-provider-types",
  GetServiceProviderSlots = "/appointment/slots/",
  CancelAppointment = "/appointment/cancel",
  EditProfile = "/customer/edit",
  GetCustomerProfile = "/customer/current",
  EditServiceProviderProfile = "/service-provider/edit",
  GetServiceProviderProfile = "/service-provider/current",
  GetSchedule = "/service-provider/schedule",
  BookAppointment = "/appointment/book",
  ServiceProviders = "/service-provider",
  PastAppointments = "/service-provider/appointment/past",
  AppointmentStats = "/service-provider/appointment/stats",
  AppointmentStatsToday = "/service-provider/appointment/today",
}
