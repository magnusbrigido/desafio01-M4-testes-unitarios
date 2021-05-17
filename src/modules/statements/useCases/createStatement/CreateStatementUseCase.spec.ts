import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

describe('Create statement', () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('Should create a statement if it has sufficient fund', async () => {
    const { id: user_id } = await createUserUseCase.execute({
      name: 'Magnus',
      email: 'magnus@email.com',
      password: '1234'
    }); 

    const statement = await createStatementUseCase.execute({
      user_id: user_id as string,
      receiver_id: user_id as string,
      type: 'deposit' as OperationType,
      amount: 100,
      description: 'withdraw of 100'
    });

    const { id: transferId } = await createUserUseCase.execute({
      name: 'Magnu',
      email: 'magnu@email.com',
      password: '1234'
    });

    const transferStatement = await createStatementUseCase.execute({
      user_id: user_id as string,
      receiver_id: transferId as string,
      type: 'transfer' as OperationType,
      amount: 100,
      description: 'transfer of 100'
    });  

    expect(statement).toHaveProperty('id');
    expect(transferStatement).toHaveProperty('id');
  });
});