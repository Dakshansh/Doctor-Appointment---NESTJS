import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    private readonly validUsername = process.env.BASIC_AUTH_USER || 'admin';
    private readonly validPassword = process.env.BASIC_AUTH_PASS || 'secret123';

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new UnauthorizedException('Missing or invalid Authorization header');
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        if (username === this.validUsername && password === this.validPassword) {
            return true;
        }

        throw new UnauthorizedException('Invalid credentials');
    }
}
