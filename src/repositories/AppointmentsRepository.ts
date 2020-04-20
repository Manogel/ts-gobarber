import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

//Data Transfer Protocol
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(data: CreateAppointmentDTO): Appointment {
    const { provider, date } = data;

    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);
    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(ap =>
      isEqual(ap.date, date),
    );

    return findAppointment || null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;
