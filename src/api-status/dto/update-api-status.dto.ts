import { PartialType } from '@nestjs/swagger';
import { CreateApiStatusDto } from './create-api-status.dto';

export class UpdateApiStatusDto extends PartialType(CreateApiStatusDto) {}
