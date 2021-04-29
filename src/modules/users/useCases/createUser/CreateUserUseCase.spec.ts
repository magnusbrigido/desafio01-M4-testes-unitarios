import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Creates an user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('Should create an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Magnus',
      email: 'magnus@email.com',
      password: '1234'
    });

    expect(user).toHaveProperty('id');
  });
});