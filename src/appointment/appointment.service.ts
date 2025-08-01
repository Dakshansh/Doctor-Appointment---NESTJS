import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private apptRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) { }

  async bookAppointment(dto: CreateAppointmentDto) {
    const doctor = await this.doctorRepo.findOne({ where: { id: dto.doctorId }, relations: ['appointments'] });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const overlap = doctor.appointments.some(appt =>
      new Date(dto.startTime) < appt.endTime && new Date(dto.endTime) > appt.startTime
    );

    if (overlap) throw new BadRequestException('Time slot already booked');

    const appointment = this.apptRepo.create(dto);
    appointment.doctor = doctor;
    return this.apptRepo.save(appointment);
  }

  findAll(filter?: string) {
    if (filter) {
      return this.apptRepo.find({ where: { patientName: Like(`%${filter}%`) } }); //TODO: In future here more options can be given
    }
    return this.apptRepo.find();
  }
}