import { Controller, Post, Body, Headers, UnauthorizedException, Get, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiBasicAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
@ApiTags('Appointments')
@ApiBasicAuth('basic')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  book(@Body() dto: CreateAppointmentDto,) {
    // console.log("auth ===", auth)
    // if (auth !== 'Basic YWRtaW46c2VjcmV0MTIz') {
    //   throw new UnauthorizedException('Invalid token');
    // }
    return this.appointmentService.bookAppointment(dto);
  }

  @Get()
  @ApiQuery({ name: 'patientName', required: false })
  findAll(@Query('patientName') patientName: string) {
    return this.appointmentService.findAll(patientName);
  }
}