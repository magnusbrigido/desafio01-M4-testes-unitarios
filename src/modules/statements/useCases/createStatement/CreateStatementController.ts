import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id: user_id } = request.user;
    let { receiver_id } = request.params;
    const { amount, description } = request.body;
    
    let type;
    
    if (!receiver_id) {
      const splittedPath = request.originalUrl.split('/');
      type = splittedPath[splittedPath.length - 1] as OperationType;

      receiver_id = user_id;
    } else {
      type = OperationType.TRANSFER;
    }
    
    const createStatement = container.resolve(CreateStatementUseCase);

    const statement = await createStatement.execute({
      user_id,
      receiver_id,
      type,
      amount,
      description
    });

    return response.status(201).json(statement);
  }
}
