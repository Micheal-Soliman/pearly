import { NextResponse } from 'next/server';
import { emailService } from '@/emailService';

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
    };

    // ✅ Run Google Sheets and Email in background (don't await)
    // This makes the response instant!
    
    // Background: Google Sheets
    if (GOOGLE_SHEETS_URL) {
      fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData),
      })
      .then(response => {
        if (response.ok) {
          console.log('✅ Order saved to Google Sheets');
        } else {
          console.error('❌ Failed to save to Google Sheets');
        }
      })
      .catch(error => console.error('Google Sheets error:', error));
    }

    // Background: Email
    if (orderData.email && orderData.email !== 'N/A') {
      console.log('📧 Sending email to:', orderData.email);
      emailService.sendPearlyOrderConfirmation({
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
      })
      .then(() => console.log('✅ Email sent successfully'))
      .catch(error => console.error('❌ Email error:', error));
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
