import { OperationInput } from './lessons.input';

export class OrderInput {
  user: string;
  updated: object;
  num: number;
  client: string;
  type: string;
  name: string;
  count: number;
  price: number;
  workingTime: number;
  shippingDateClient: string;
  shippingDateSGI: string;
  pMaterialDate: string;
  open: string;
  shipmentDateClient: string;
  shipmentDateSGI: string;
  fMaterialDate: string;
  completion: number;
  defects: number;
  operations: Array<OperationInput>;
  createDate: Date;
}
