import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Authenticates an user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('Should authenticates an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Magnus',
      email: 'magnus@email.com',
      password: '1234'
    });

    const authenticatedUSer = await authenticateUserUseCase.execute({
      email: 'magnus@email.com',
      password: '1234'
    });

    expect(authenticatedUSer).toHaveProperty('token');
  });
});