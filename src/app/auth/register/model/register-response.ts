import { Agent, DataResponse } from '@shared/model';

export type RegisterResponse = DataResponse<{
  agent: Agent;
  token: string;
}>;
