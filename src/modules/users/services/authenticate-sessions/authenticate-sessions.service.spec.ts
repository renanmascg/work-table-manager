import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateSessionsService } from './authenticate-sessions.service';

describe('AuthenticateSessionsService', () => {
  let service: AuthenticateSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticateSessionsService],
    }).compile();

    service = module.get<AuthenticateSessionsService>(AuthenticateSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
