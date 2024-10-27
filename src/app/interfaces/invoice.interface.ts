export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "draft" | "pending" | "paid";
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
