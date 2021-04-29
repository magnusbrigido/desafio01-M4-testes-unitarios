import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe('Get balance', () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  });

  it('Should get balance', async () => {
    const user = await createUserUseCase.execute({
      name: 'Magnus',
      email: 'magnus@email.com',
      password: '1234'
    });

    const user_id = user.id as string;

    const statement = await createStatementUseCase.execute({
      user_id,
      type: 'deposit' as OperationType,
      amount: 100,
      description: 'withdraw of 100'
    });

    const statement_id = statement.id as string;

    const statementOperation = await getStatementOperationUseCase.execute({
      user_id,
      statement_id
    })

    expect(statementOperation).toHaveProperty('id');
    expect(statementOperation).toHaveProperty('user_id');
  });
});