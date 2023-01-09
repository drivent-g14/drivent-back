import { cannotEnrollBeforeStartDateError } from '@/errors';
import userRepository from '@/repositories/user-repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import eventsService from '../events-service';
import { duplicatedEmailError } from './errors';

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  //await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}
// TODO: Verificar se esta função é necessária neste momento,
// aparentemente ela valida se o evento já está iniciado ou não e
// com base nisso tira um erro

// async function canEnrollOrFail() {
//   const canEnroll = await eventsService.isCurrentEventActive();
//   if (!canEnroll) {
//     throw cannotEnrollBeforeStartDateError();
//   }
// }

export type CreateUserParams = Pick<User, 'email' | 'password'>;

const userService = {
  createUser,
};

export * from './errors';
export default userService;
