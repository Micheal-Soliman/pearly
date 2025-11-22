import nodemailer from "nodemailer";

// Validate SMTP configuration
const smtpConfig = {
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// Check if required SMTP variables are set
const isSmtpConfigured = () => {
  return smtpConfig.host && smtpConfig.auth.user && smtpConfig.auth.pass;
};

let transporter = null;

if (isSmtpConfigured()) {
  transporter = nodemailer.createTransport(smtpConfig);

  // console.log("Email service configured with host:", smtpConfig.host);
} else {
  console.warn("SMTP configuration is incomplete. Missing variables:", {
    host: !!smtpConfig.host,
    user: !!smtpConfig.auth.user,
    pass: !!smtpConfig.auth.pass,
  });
}

export const emailService = {
  async sendEmail(to, subject, html, text = "") {
    if (!transporter) {
      throw new Error(
        "Email service is not configured. Please check SMTP settings: SMTP_HOST, SMTP_USER, SMTP_PASS"
      );
    }

    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        html,
        text,
      };

      const info = await transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  },

  /**
   * إرسال إيميل تأكيد طلب Pearly للعميل
   */
  async sendPearlyOrderConfirmation(orderData) {
    if (!orderData || !orderData.email) {
      throw new Error("Invalid order data or email");
    }

    const subject = `Your Pearly Order Confirmation 💖`;
    
    // إنشاء جدول المنتجات
    const itemsHtml = orderData.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: left;">
          ${item.name || item.nameAr}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          ${item.price} EGP
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">
          ${item.price * item.quantity} EGP
        </td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html dir="ltr" lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style>
          /* Reset styles */
          body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          
          /* Responsive styles */
          @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .mobile-padding { padding: 15px !important; }
            .mobile-font-large { font-size: 24px !important; }
            .mobile-font-medium { font-size: 16px !important; }
            .mobile-font-small { font-size: 13px !important; }
            .mobile-hide { display: none !important; }
            .mobile-center { text-align: center !important; }
            .mobile-full-width { width: 100% !important; display: block !important; }
            
            /* Table responsive */
            .responsive-table { width: 100% !important; }
            .responsive-table th,
            .responsive-table td { 
              padding: 8px 4px !important;
              font-size: 12px !important;
            }
            
            /* Customer info table */
            .info-table td:first-child {
              width: 100px !important;
              font-size: 12px !important;
            }
            .info-table td {
              font-size: 12px !important;
              word-break: break-word;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div class="mobile-padding" style="background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 class="mobile-font-large" style="margin: 0; font-size: 28px; font-weight: bold;">💖 Pearly</h1>
            <p class="mobile-font-small" style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Thank you for your order! 💖</p>
          </div>

          <!-- Success Message -->
          <div class="mobile-padding" style="background-color: #f0f9ff; border-left: 4px solid #0369a1; padding: 20px; margin: 20px;">
            <div style="display: flex; align-items: center;">
              <div style="font-size: 40px; margin-right: 15px;">✓</div>
              <div>
                <h2 style="margin: 0; color: #0369a1; font-size: 20px;">Your order has been received successfully!</h2>
              </div>
            </div>
          </div>

          <!-- Customer Info -->
          <div class="mobile-padding" style="padding: 0 20px;">
            <div class="mobile-padding" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 class="mobile-font-medium" style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #ec4899; padding-bottom: 8px;">
                👤 Customer Information
              </h3>
              <table class="info-table" style="width: 100%; font-size: 14px; color: #4b5563;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px 0;">${orderData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;">${orderData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0;">${orderData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Address:</td>
                  <td style="padding: 8px 0;">${orderData.address}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">City:</td>
                  <td style="padding: 8px 0;">${orderData.city}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Delivery Area:</td>
                  <td style="padding: 8px 0;">${orderData.deliveryArea}</td>
                </tr>
                ${orderData.notes ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Notes:</td>
                  <td style="padding: 8px 0;">${orderData.notes}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <!-- Products -->
            <div class="mobile-padding" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 class="mobile-font-medium" style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #E03C31; padding-bottom: 8px;">
                🛍️ Ordered Products
              </h3>
              <table class="responsive-table" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                  <tr style="background-color: #f3f4f6;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #d1d5db;">Product</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #d1d5db;">Quantity</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #d1d5db;">Price</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #d1d5db;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <!-- Order Summary -->
            <div class="mobile-padding" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 class="mobile-font-medium" style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #E03C31; padding-bottom: 8px;">
                💰 Order Summary
              </h3>
              <table class="info-table" style="width: 100%; font-size: 14px; color: #4b5563;">
                <tr>
                  <td style="padding: 8px 0;">Subtotal:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${orderData.subtotal} EGP</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">Delivery Fee:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${orderData.deliveryFee} EGP</td>
                </tr>
                ${orderData.discount > 0 ? `
                <tr style="color: #22c55e;">
                  <td style="padding: 8px 0;">Discount:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">-${orderData.discount} EGP</td>
                </tr>
                ` : ''}
                ${orderData.promoCode ? `
                <tr>
                  <td style="padding: 8px 0;">Promo Code:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${orderData.promoCode}</td>
                </tr>
                ` : ''}
                <tr style="border-top: 2px solid #E03C31;">
                  <td style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #E03C31;">Total:</td>
                  <td style="padding: 12px 0; text-align: right; font-size: 20px; font-weight: bold; color: #E03C31;">${orderData.total} EGP</td>
                </tr>
              </table>
            </div>

            <!-- Payment Method -->
            <div class="mobile-padding" style="background-color: #fff3cd; border-radius: 8px; padding: 15px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
              <p class="mobile-font-small" style="margin: 0; font-size: 14px; color: #856404;">
                <strong>💳 Payment Method:</strong> Cash on Delivery
              </p>
            </div>

            <!-- Contact Info -->
            <div class="mobile-padding" style="background-color: #fce7f3; border-radius: 8px; padding: 20px; margin-bottom: 20px; text-align: center;">
              <h3 class="mobile-font-medium" style="margin: 0 0 10px 0; color: #ec4899; font-size: 16px;">Contact Us</h3>
              <p class="mobile-font-small" style="margin: 5px 0; font-size: 14px; color: #831843;">
                📱 Phone: <a href="tel:+201288144869" style="color: #ec4899; text-decoration: none; font-weight: bold;">01288144869</a>
              </p>
              <p class="mobile-font-small" style="margin: 5px 0; font-size: 14px; color: #831843;">
                📧 Email: <a href="mailto:ahmedmohamed010134@gmail.com" style="color: #ec4899; text-decoration: none; font-weight: bold;">ahmedmohamed010134@gmail.com</a>
              </p>
              <p class="mobile-font-small" style="margin: 5px 0; font-size: 14px; color: #831843;">
                If you have any questions, feel free to contact us 💖
              </p>
            </div>

            <!-- Thank You Message -->
            <div class="mobile-padding" style="text-align: center; padding: 20px 0;">
              <h2 class="mobile-font-large" style="color: #ec4899; font-size: 24px; margin: 0 0 10px 0;">Thank you for choosing Pearly! 💖✨</h2>
              <p class="mobile-font-small" style="color: #6b7280; font-size: 14px; margin: 0;">Discover your pearly glow with us</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #fce7f3; padding: 20px; text-align: center; border-top: 1px solid #f9a8d4;">
            <p style="margin: 0; font-size: 12px; color: #831843;">
              This email was sent automatically from Pearly 💖
            </p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #831843;">
              © 2024 Pearly - Your Luxury Beauty Destination - All Rights Reserved
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    // Plain text version
    const text = `
Your Pearly Order Confirmation 💖

Hello ${orderData.name},

Your order has been received successfully! Thank you for choosing Pearly.

Customer Information:
- Name: ${orderData.name}
- Email: ${orderData.email}
- Phone: ${orderData.phone}
- Address: ${orderData.address}
- City: ${orderData.city}

Products:
${orderData.items.map(item => `- ${item.name} (x${item.quantity}) - ${item.price * item.quantity} EGP`).join('\n')}

Order Summary:
- Subtotal: ${orderData.subtotal} EGP
- Delivery Fee: ${orderData.deliveryFee} EGP
${orderData.discount > 0 ? `- Discount: -${orderData.discount} EGP\n` : ''}
- Total: ${orderData.total} EGP

Payment Method: Cash on Delivery

We will contact you soon to confirm the order and arrange delivery.

Contact Us:
Phone: 01288144869
Email: ahmedmohamed010134@gmail.com

Thank you for choosing Pearly! Discover your pearly glow ✨
    `;

    return this.sendEmail(orderData.email, subject, html, text);
  },
};
