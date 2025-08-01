import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService implements OnModuleInit {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) { }

  async onModuleInit() {
    const count = await this.doctorRepo.count();
    if (count === 0) {
      await this.doctorRepo.save([
        { name: 'Dr. Daksh', specialization: 'Cardiologist' },
        { name: 'Dr. Gorasia', specialization: 'Dermatologist' },
        { name: 'Dr. Nitin', specialization: 'Neurologist' },
      ]);
    }
  }

  findAll(filter?: string) {
    if (filter) {
      return this.doctorRepo.find({ where: { specialization: Like(`%${filter}%`) } });
    }
    return this.doctorRepo.find();
  }

  async getAvailableSlots(id: number) {
    const doctor = await this.doctorRepo.findOne({ where: { id }, relations: ['appointments'] });
    if (!doctor) throw new Error('Doctor not found');
    let slotNumber = 1;
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    for (let hour = startHour; hour < endHour; hour++) {

      const slotStart = new Date();
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(slotStart);
      slotEnd.setHours(hour + 1);

      const isBooked = doctor.appointments.some(appt =>
        slotStart < appt.endTime && slotEnd > appt.startTime
      );
      if (!isBooked) {
        slots.push({ startTime: slotStart, endTime: slotEnd, slotNumber: slotNumber })
        slotNumber = slotNumber + 1;
      }

    }
    return { slots, totalSlots: slots.length };
  }
}