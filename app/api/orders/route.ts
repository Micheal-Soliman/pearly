import { NextResponse } from 'next/server';
import { emailService } from '@/emailService';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    console.log('📦 Order received:', orderData.orderNumber);
    
    // Google Sheets Web App URL
    const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '';
    
    const sheetData = {
      orderNumber: orderData.orderNumber,
      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      items: orderData.items,
      total: orderData.total,
      date: new Date().toISOString(),
      notes: orderData.notes || '',
    };

    // ✅ Save to Google Sheets (await to avoid serverless background termination)
    if (!GOOGLE_SHEETS_URL) {
      console.error('❌ NEXT_PUBLIC_GOOGLE_SHEETS_URL is not set');
    } else {
      try {
        const resp = await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetData),
        });
        const respText = await resp.text();
        if (resp.ok) {
          console.log('✅ Order saved to Google Sheets:', respText);
        } else {
          console.error('❌ Failed to save to Google Sheets:', resp.status, respText);
        }
      } catch (error) {
        console.error('Google Sheets error:', error);
      }
    }

    // Background: Email
    if (orderData.email && orderData.email !== 'N/A') {
      console.log('📧 Sending email to:', orderData.email);
      try {
        await emailService.sendPearlyOrderConfirmation({
          name: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.address,
          city: orderData.city,
          deliveryArea: orderData.city,
          notes: orderData.notes,
          items: orderData.items,
          subtotal: orderData.subtotal || orderData.total,
          deliveryFee: orderData.deliveryFee || 0,
          discount: 0,
          total: orderData.total,
        });
        console.log('✅ Email sent successfully');
      } catch (error) {
        console.error('❌ Email error:', error);
      }
    }

    // Always notify brand owner/admin
    try {
      await emailService.sendPearlyOrderAdminNotification({
        orderNumber: orderData.orderNumber,
        name: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        notes: orderData.notes,
        items: orderData.items,
        subtotal: orderData.subtotal || orderData.total,
        deliveryFee: orderData.deliveryFee || 0,
        discount: 0,
        total: orderData.total,
      });
      console.log('✅ Admin notification sent');
    } catch (err) {
      console.error('❌ Admin email error:', err);
    }

    // ⚡ Return immediately - don't wait for email/sheets
    console.log('✅ Order accepted:', orderData.orderNumber);
    return NextResponse.json({ 
      success: true, 
      orderNumber: orderData.orderNumber,
      message: 'Order received and being processed'
    });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit order' },
      { status: 500 }
    );
  }
}
