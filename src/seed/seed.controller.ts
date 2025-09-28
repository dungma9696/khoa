import { Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SeedDataService } from './seed-data';
import { JwtAuthGuard } from '../modules/auth/passport/jwt-auth.guard';

@ApiTags('Seed Data')
@Controller('seed')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SeedController {
  constructor(private readonly seedDataService: SeedDataService) {}

  @Post()
  @ApiOperation({ summary: 'Seed database with initial data' })
  @ApiResponse({ status: 201, description: 'Database seeded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async seedDatabase() {
    await this.seedDataService.seedAll();
    return {
      success: true,
      message: 'Database seeded successfully',
      data: null,
    };
  }
}
