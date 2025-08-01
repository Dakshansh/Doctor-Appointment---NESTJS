import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  patientName!: string;

  @IsInt()
  doctorId!: number;

  @IsDateString()
  startTime!: Date;

  @IsDateString()
  endTime!: Date;
}