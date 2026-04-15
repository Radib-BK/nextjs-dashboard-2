import postgres from 'postgres';

import { sql } from '@/app/lib/db';

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  try {
    const result = await listInvoices();

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('QUERY ERROR:', error);

    return Response.json(
      {
        success: false,
        error: error?.message,
      },
      { status: 500 }
    );
  }
}