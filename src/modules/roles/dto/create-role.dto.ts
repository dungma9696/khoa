import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsMongoId,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'Role name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Role permissions', required: false })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  permissions?: string[];

  @ApiProperty({
    description: 'Role status',
    enum: ['active', 'inactive'],
    required: false,
  })
  @IsString()
  @IsIn(['active', 'inactive'])
  @IsOptional()
  status?: string;
}
