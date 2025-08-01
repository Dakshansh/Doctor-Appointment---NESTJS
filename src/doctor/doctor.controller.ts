import { Controller, Get, Param, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ApiTags, ApiQuery, ApiBasicAuth } from '@nestjs/swagger';

@ApiTags('Doctors')
@ApiBasicAuth('basic')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Get()
  @ApiQuery({ name: 'specialization', required: false })
  findAll(@Query('specialization') specialization: string) {
    return this.doctorService.findAll(specialization);
  }

  @Get(':id/slots')
  findAvailableSlots(@Param('id') id: number) {
    return this.doctorService.getAvailableSlots(id);
  }
}