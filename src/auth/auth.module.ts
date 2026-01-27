import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthLiteGuard } from './auth-lite.guard';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: User.name, schema: UserSchema },
//     ]),
//   ],
  imports: [UsersModule],
  providers: [AuthLiteGuard],
  exports: [AuthLiteGuard],
})
export class AuthModule {}
