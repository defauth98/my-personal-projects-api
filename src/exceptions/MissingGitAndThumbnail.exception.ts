import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingGitAndThumbnailException extends HttpException {
  constructor() {
    super('You not provided an thumbnaiil and gif', HttpStatus.BAD_REQUEST);
  }
}
