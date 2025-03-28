import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';


@Module({
  imports: [UserModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 