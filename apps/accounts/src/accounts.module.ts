import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { PrismaService } from '@app/common/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Replace with environment variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService ],
})
export class AccountsModule {}
