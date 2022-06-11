import { HttpException, HttpStatus } from '@nestjs/common';

export class ProjectAlreadyExistsException extends HttpException {
  constructor() {
    super('Project not found', HttpStatus.BAD_REQUEST);
  }
}
