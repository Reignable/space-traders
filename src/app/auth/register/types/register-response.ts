import { Agent, DataResponse } from '@shared/types';

export type RegisterResponse = DataResponse<{
  agent: Agent;
  token: string;
}>;
