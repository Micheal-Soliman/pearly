import { NextResponse } from 'next/server';
import { emailService } from '@/emailService';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    console.log('📦 Order received:', orderData.orderNumber);
    
    // Google Sheets Web App URL - هتحطها من Google Apps Script
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

    // إرسال البيانات لـ Google Sheets
    if (GOOGLE_SHEETS_URL) {
      try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sheetData),
        });

        if (!response.ok) {
          console.error('Failed to save order to Google Sheets');
        }
      } catch (error) {
        console.error('Google Sheets error:', error);
      }
    }

    // إرسال إيميل تأكيد للعميل
    if (orderData.email && orderData.email !== 'N/A') {
      try {
        console.log('📧 Attempting to send email to:', orderData.email);
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
        console.log('✅ Order confirmation email sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError);
        // لا نوقف العملية إذا فشل الإيميل
      }
    } else {
      console.log('⚠️ No email provided, skipping email notification');
    }

    console.log('✅ Order processed successfully:', orderData.orderNumber);
    return NextResponse.json({ success: true, orderNumber: orderData.orderNumber });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit order' },
      { status: 500 }
    );
  }
}
