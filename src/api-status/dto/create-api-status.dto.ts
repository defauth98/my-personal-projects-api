import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { ApiStatus } from '../entities/api-status.entity';

export class CreateApiStatusDto implements ApiStatus {
  id?: number;

  @ApiProperty()
  @IsUrl()
  link: string;
}
