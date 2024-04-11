import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import OrderInfo from "./_components/OrderInfo";
import React from "react";

interface OrderHistoryEmailProps {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
}
// type OrderHistoryEmailProps = {
//   orders: {
//     id: string;
//     pricePaidInCents: number;
//     createdAt: Date;
//     downloadVerificationId: string;
//     product: {
//       name: string;
//       imagePath: string;
//       description: string;
//     };
//   }[];
// };

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      pricePaidInCents: 10000,
      createdAt: new Date(),
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name",
        imagePath: "/products/a524bd68-6543-48fc-a632-813fd7253af3-stare.jpg",
        description: "Product description",
      },
    },
    {
      id: crypto.randomUUID(),
      pricePaidInCents: 20000,
      createdAt: new Date(),
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product name 2",
        imagePath: "/products/a288399a-2781-4ee4-86b5-dd52db42e525-p4.jpg",
        description: "Product description 2",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History and Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, idx) => (
              <React.Fragment key={order.id}>
                <OrderInfo
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {idx < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
