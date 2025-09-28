import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ description: 'Permission name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Permission description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Permission status',
    enum: ['active', 'inactive'],
    required: false,
  })
  @IsString()
  @IsIn(['active', 'inactive'])
  @IsOptional()
  status?: string;
}
