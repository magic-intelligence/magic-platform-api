import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService{
    getHello(): string {
    return 'Welcome to the Educational Center API!';
  }

  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}