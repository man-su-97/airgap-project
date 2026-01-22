import { Controller, Get } from '@nestjs/common';

@Controller('analytics')
export class AppController {
  @Get()
  getAnalytics() {
    return {
      source: 'local-nest-backend',
      generatedAt: new Date().toISOString(),
      metrics: [
        { name: 'activeUsers', value: 134 },
        { name: 'sessions', value: 421 },
        { name: 'errorRate', value: 0.01 },
      ],
    };
  }
}
