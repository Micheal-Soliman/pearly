import { NextResponse } from 'next/server';
import { emailService } from '@/emailService';
import { validateAndPriceOrder } from '@/lib/checkout';

export const runtime = 'nodejs';

type DeliveryStatus = {
  adminEmail: boolean;
  customerEmail: boolean;
  googleSheets: boolean;
};

export async function POST(request: Request) {
  let order;

  try {
    order = validateAndPriceOrder(await request.json());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid order data';
    return NextResponse.json({ success: false, code: 'INVALID_ORDER', message }, { status: 400 });
  }

  console.info('Order received', { orderNumber: order.orderNumber, itemCount: order.items.length });

  try {
    await emailService.sendPearlyOrderAdminNotification({
      orderNumber: order.orderNumber,
      name: order.customerName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      notes: order.notes,
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      discount: 0,
      total: order.total,
    });
  } catch (error) {
    console.error('Admin order notification failed', {
      orderNumber: order.orderNumber,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      {
        success: false,
        code: 'ADMIN_EMAIL_FAILED',
        message: 'We could not confirm your order right now. Your cart is safe—please try again shortly.',
      },
      { status: 503 },
    );
  }

  const deliveryStatus: DeliveryStatus = {
    adminEmail: true,
    customerEmail: false,
    googleSheets: false,
  };

  try {
    await emailService.sendPearlyOrderConfirmation({
      orderNumber: order.orderNumber,
      name: order.customerName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      deliveryArea: order.city,
      notes: order.notes,
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      discount: 0,
      total: order.total,
    });
    deliveryStatus.customerEmail = true;
  } catch (error) {
    console.error('Customer confirmation email failed', {
      orderNumber: order.orderNumber,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
  if (googleSheetsUrl) {
    try {
      const response = await fetch(googleSheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, date: new Date().toISOString() }),
      });

      if (!response.ok) throw new Error(`Google Sheets returned ${response.status}`);
      deliveryStatus.googleSheets = true;
    } catch (error) {
      console.error('Google Sheets order backup failed', {
        orderNumber: order.orderNumber,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  } else {
    console.warn('Google Sheets order backup is not configured');
  }

  console.info('Order accepted', { orderNumber: order.orderNumber, deliveryStatus });
  return NextResponse.json({
    success: true,
    order,
    deliveryStatus,
    message: 'Order received successfully',
  });
}
