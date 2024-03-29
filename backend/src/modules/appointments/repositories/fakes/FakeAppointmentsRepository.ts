import { uuid } from 'uuidv4';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date) && appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]> {
    const { month, year, provider_id } = data;

    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]> {
    const { day, month, year, provider_id } = data;

    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}
export default FakeAppointmentsRepository;
