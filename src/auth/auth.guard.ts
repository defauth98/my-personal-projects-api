import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { validateToken } from 'src/utils/validateToken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    try {
      const payload = validateToken(token);

      if (!payload) return false;

      request.headers.user = payload;

      return true;
    } catch (error) {
      return false;
    }

    return false;
  }
}
