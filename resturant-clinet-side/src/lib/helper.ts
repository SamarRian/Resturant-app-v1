// types
interface OrderItem {
  name: string;
  variant?: string;
  qty: number;
  price: number;
  total: number;
}

interface PrintData {
  // Restaurant Info (API se aayega)
  restaurantName: string;
  address: string;
  phone: string;

  // Order Info
  customer: string;
  customerPhone: string;
  date: string;
  type: "Delivery" | "Dine-in" | "Takeaway";

  // Items
  items: OrderItem[];

  // Totals
  subtotal: number;
  total: number;
  paid: number;
  paymentMethod: string;
  paymentStatus: string;
}

export const PosPaymentPrint = (data: PrintData) => {
  const printWindow = window.open("", "_blank", "width=400,height=700");

  const itemsHTML = data.items
    .map(
      (item) => `
      <tr>
        <td class="item-name">
          <strong>${item.name}</strong>
          ${item.variant ? `<br/><span class="variant">${item.variant}</span>` : ""}
        </td>
        <td class="center">${item.qty}</td>
        <td class="right">${item.price}</td>
        <td class="right">${item.total}</td>
      </tr>
    `
    )
    .join("");

  printWindow?.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${data.restaurantName} - Invoice</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body {
            font-family: 'Courier New', monospace;
            font-size: 13px;
            width: 300px;
            margin: 0 auto;
            padding: 16px 8px;
            color: #000;
          }

          .center { text-align: center; font-weight: bold
           }
          .right   { text-align: right; font-weight: bold }
          .bold    { font-weight: bold;}

          .header { text-align: center; margin-bottom: 8px; }
          .header h1 { font-size: 18px; font-weight: bold; }
          .header p  { font-size: 12px; margin-top: 2px; }

          .divider {
            border-top: 1px dashed #000;
            margin: 8px 0;
          }

          .info-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 2px 8px;
            margin: 6px 0;
            font-size: 12px;
          }
          .info-grid .label { font-weight: bold; }

          .date-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin: 4px 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin: 4px 0;
            font-size: 12px;
          }
          thead tr th {
            font-weight: bold;
            padding: 3px 0;
            border-bottom: 1px dashed #000;
          }
          thead th:first-child { text-align: left; }
          thead th { text-align: center; }
          thead th:last-child { text-align: right; }

          tbody tr td { padding: 4px 0; }
          .item-name { text-align: left; }
          .variant { font-size: 11px; color: #444; }

          tbody tr + tr { border-top: 1px dotted #ccc; }

          .totals { margin-top: 4px; }
          .totals .row {
            display: flex;
            justify-content: space-between;
            padding: 3px 0;
            font-size: 13px;
          }
          .totals .row.total-row {
            font-weight: bold;
            font-size: 15px;
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 5px 0;
          }

          .payment-section { margin-top: 6px; font-size: 12px; }
          .payment-section .row {
            display: flex;
            justify-content: space-between;
            padding: 2px 0;
          }

          .footer {
            text-align: center;
            margin-top: 12px;
            font-size: 11px;
            color: #555;
          }

          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>

        <!-- Header -->
        <div class="header">
          <h1>${data.restaurantName}</h1>
          <p>${data.address}</p>
          <p>Tel: ${data.phone}</p>
        </div>

        <div class="divider"></div>
        <p class="center bold" style="font-size:15px;">SALES INVOICE</p>
        <div class="divider"></div>

        <!-- Customer Info -->
        <div class="info-grid">
          <span class="label">Customer:</span> <span>${data.customer}</span>
          <span class="label">Phone:</span>    <span>${data.customerPhone}</span>
          <span class="label">Address:</span>  <span></span>
        </div>

        <div class="divider"></div>

        <!-- Date & Type -->
        <div class="date-row">
          <div><strong>Date:</strong><br/>${data.date}</div>
          <div style="text-align:right"><strong>Type:</strong><br/>${data.type}</div>
        </div>

        <div class="divider"></div>

        <!-- Items Table -->
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="center">Qty</th>
              <th class="right">Price</th>
              <th class="right">Total</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <div class="divider"></div>

        <!-- Totals -->
        <div class="totals">
          <div class="row"><span>Subtotal:</span><span>${data.subtotal}</span></div>
          <div class="row total-row"><span>TOTAL:</span><span>${data.total}</span></div>
          <div class="row"><span>PAID:</span><span>${data.paid}</span></div>
        </div>

        <div class="divider"></div>

        <!-- Payment Info -->
        <div class="payment-section">
          <div class="row"><strong>Payment Method:</strong> <span>${data.paymentMethod}</span></div>
          <div class="row"><strong>Payment Status:</strong> <span>${data.paymentStatus}</span></div>
        </div>

        <div class="divider"></div>

        <!-- Footer -->
        <div class="footer">
          <p>Software Developed by: Devpeller - Software Solutions</p>
          <p>Mobile: 0336-6667686</p>
        </div>

      </body>
    </html>
  `);

  printWindow?.document.close();
  printWindow?.focus();
  printWindow?.print();
};

export interface KotItem {
  name: string;
  variant?: string;
  qty: number;
  notes?: string;
}

export interface KotPrintData {
  restaurantName: string;
  kotNumber: number;
  type: "Delivery" | "Dine-in" | "Takeaway";
  orderTime: string;
  covers: number;
  items: KotItem[];
  specialInstructions?: string;
  printedAt: string;
}

export const KotPrint = (data: KotPrintData) => {
  const printWindow = window.open("", "_blank", "width=400,height=600");

  const itemsHTML = data.items
    .map(
      (item) => `
      <tr>
        <td class="qty">${item.qty}</td>
        <td class="item-name">
          <strong>${item.name}</strong>
          ${item.variant ? `<br/><em>- ${item.variant}</em>` : ""}
          ${item.notes ? `<br/><span class="note">${item.notes}</span>` : ""}
        </td>
      </tr>
      <tr><td colspan="2"><div class="item-divider"></div></td></tr>
    `
    )
    .join("");

  printWindow?.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>KOT #${data.kotNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            width: 300px;
            margin: 0 auto;
            padding: 16px 8px;
            color: #000;
          }

          .center { text-align: center; }
          .right   { text-align: right; }
          .bold    { font-weight: bold; }

          .header { text-align: center; margin-bottom: 6px; }
          .header h1 {
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .header h2 {
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .dashed {
            border-top: 2px dashed #000;
            margin: 8px 0;
          }
          .dotted {
            border-top: 1px dotted #000;
            margin: 4px 0;
          }

          .kot-number {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin: 6px 0;
            letter-spacing: 1px;
          }

          .info-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 3px 8px;
            font-size: 12px;
            margin: 6px 0;
          }
          .info-grid .label { font-weight: normal; }
          .info-grid .value { text-align: right; }

          table {
            width: 100%;
            border-collapse: collapse;
            margin: 4px 0;
            font-size: 13px;
          }

          thead th {
            text-align: left;
            font-weight: bold;
            padding: 3px 0;
            border-bottom: 2px solid #000;
          }
          thead th.qty-head { width: 30px; }
          thead th.notes-head { text-align: right; }

          tbody td { padding: 5px 0; vertical-align: top; }
          .qty {
            width: 30px;
            font-weight: bold;
            font-size: 14px;
            vertical-align: top;
            padding-top: 5px;
          }
          .item-name strong { font-size: 14px; }
          .item-name em {
            font-style: italic;
            font-size: 12px;
            display: block;
            margin-left: 8px;
          }
          .note {
            font-size: 11px;
            color: #333;
            display: block;
            margin-left: 8px;
          }
          .item-divider {
            border-top: 1px dotted #999;
            margin: 2px 0;
          }

          .special-box {
            border: 1px dashed #000;
            padding: 8px;
            margin: 8px 0;
            min-height: 60px;
            font-size: 12px;
          }
          .special-box p { font-weight: bold; margin-bottom: 6px; }
          .special-line {
            border-top: 1px solid #555;
            margin: 8px 0;
          }

          .printed-at {
            text-align: center;
            font-size: 11px;
            margin: 6px 0;
          }

          .stars {
            text-align: center;
            font-size: 11px;
            letter-spacing: 2px;
            margin: 4px 0;
          }

          .kitchen-only {
            text-align: center;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 1px;
            border-bottom: 2px solid #000;
            padding-bottom: 4px;
            margin-top: 2px;
          }

          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>

        <!-- Header -->
        <div class="header">
          <h1>Kitchen Order Ticket</h1>
          <h2>${data.restaurantName}</h2>
        </div>

        <div class="dashed"></div>

        <!-- KOT Number -->
        <p class="kot-number">KOT #: ${data.kotNumber}</p>

        <div class="dashed"></div>

        <!-- Order Info -->
        <div class="info-grid">
          <span class="label">Type:</span>
          <span class="value">${data.type}</span>

          <span class="label">Order Time:</span>
          <span class="value">${data.orderTime}</span>

          <span class="label">Covers:</span>
          <span class="value">${data.covers}</span>
        </div>

        <div class="dashed"></div>

        <!-- Items Table -->
        <table>
          <thead>
            <tr>
              <th class="qty-head">Qty</th>
              <th>Item</th>
              <th class="notes-head">Notes</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <!-- Special Instructions Box -->
        <div class="special-box">
          <p>Special Instructions:</p>
          <div class="special-line"></div>
          <div class="special-line"></div>
          <div class="special-line"></div>
          ${data.specialInstructions ? `<p style="margin-top:4px; font-weight:normal;">${data.specialInstructions}</p>` : ""}
        </div>

        <div class="dashed"></div>

        <!-- Printed At -->
        <p class="printed-at">Printed: ${data.printedAt}</p>

        <!-- Stars -->
        <p class="stars">* * * * * * * * * * * * * * * * * * * *</p>

        <!-- Kitchen Only -->
        <p class="kitchen-only">*** FOR KITCHEN USE ONLY ***</p>

      </body>
    </html>
  `);

  printWindow?.document.close();
  printWindow?.focus();
  printWindow?.print();
};
export interface UnpaidBillData {
  restaurantName: string;
  address: string;
  phone: string;

  customer: string;
  customerPhone: string;
  date: string;
  type: "Delivery" | "Dine-in" | "Takeaway";

  items: {
    name: string;
    variant?: string;
    qty: number;
    price: number;
    total: number;
  }[];

  subtotal: number;
  totalDue: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: string;
  orderStatus: string;
}

export const UnpaidBillPrint = (data: UnpaidBillData) => {
  const printWindow = window.open("", "_blank", "width=400,height=650");

  const itemsHTML = data.items
    .map(
      (item) => `
      <tr>
        <td class="item-name">
          <strong>${item.name}</strong>
          ${item.variant ? `<br/><span class="variant">${item.variant}</span>` : ""}
        </td>
        <td class="center">${item.qty}</td>
        <td class="right">${item.price}</td>
        <td class="right">${item.total}</td>
      </tr>
      <tr><td colspan="4"><div class="item-divider"></div></td></tr>
    `
    )
    .join("");

  printWindow?.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Unpaid Bill</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            width: 300px;
            margin: 0 auto;
            padding: 16px 8px;
            color: #000;
          }

          .center { text-align: center; }
          .right   { text-align: right; }
          .bold    { font-weight: bold; }

          .header { text-align: center; margin-bottom: 8px; }
          .header h1 { font-size: 18px; font-weight: bold; letter-spacing: 1px; }
          .header p  { font-size: 12px; margin-top: 2px; }

          .dashed  { border-top: 1px dashed #000; margin: 8px 0; }
          .solid   { border-top: 1px solid #000;  margin: 4px 0; }

          .unpaid-badge {
            border: 1px dashed #000;
            text-align: center;
            padding: 6px;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 1px;
            margin: 8px 0;
          }

          .title {
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 4px;
          }

          .info-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 2px 8px;
            font-size: 12px;
            margin: 6px 0;
          }
          .info-grid .label { font-weight: bold; }

          .date-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin: 4px 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin: 4px 0;
          }

          thead th {
            font-weight: bold;
            padding: 3px 0;
            text-align: left;
            border-bottom: 1px dashed #000;
          }
          thead th.center { text-align: center; }
          thead th.right  { text-align: right; }

          tbody td { padding: 4px 0; vertical-align: top; }
          .item-name { text-align: left; }
          .variant   { font-size: 11px; color: #444; }
          .item-divider { border-top: 1px dotted #aaa; }

          .totals { margin-top: 4px; }
          .totals .row {
            display: flex;
            justify-content: space-between;
            padding: 3px 0;
            font-size: 13px;
          }
          .totals .row.total-due {
            font-weight: bold;
            font-size: 14px;
          }
          .totals .row.balance {
            font-weight: bold;
          }

          .footer {
            text-align: center;
            margin-top: 12px;
            font-size: 11px;
            color: #444;
          }

          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>

        <!-- Header -->
        <div class="header">
          <h1>${data.restaurantName}</h1>
          <p>${data.address}</p>
          <p>Tel: ${data.phone}</p>
        </div>

        <div class="dashed"></div>

        <!-- Title -->
        <p class="title">UNPAID BILL</p>

        <!-- Unpaid Badge -->
        <div class="unpaid-badge">UNPAID BILL - PAYMENT DUE</div>

        <!-- Customer Info -->
        <div class="info-grid">
          <span class="label">Customer:</span> <span>${data.customer}</span>
          <span class="label">Phone:</span>    <span>${data.customerPhone}</span>
          <span class="label">Address:</span>  <span></span>
        </div>

        <div class="dashed"></div>

        <!-- Date & Type -->
        <div class="date-row">
          <div><strong>Date:</strong><br/>${data.date}</div>
          <div style="text-align:right"><strong>Type:</strong><br/>${data.type}</div>
        </div>

        <!-- Items Table -->
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="center">Qty</th>
              <th class="right">Price</th>
              <th class="right">Total</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <!-- Totals -->
        <div class="totals">
          <div class="row">
            <span>Subtotal:</span>
            <span>${data.subtotal}</span>
          </div>

          <div class="dashed"></div>

          <div class="row total-due">
            <span>TOTAL DUE:</span>
            <span>${data.totalDue}</span>
          </div>

          <div class="dashed"></div>

          <div class="row">
            <span>Paid Amount:</span>
            <span>${data.paidAmount.toFixed(2)}</span>
          </div>

          <div class="dashed"></div>

          <div class="row balance">
            <span>Balance Due:</span>
            <span>${data.balanceDue}</span>
          </div>

          <div class="row">
            <span>Payment Status:</span>
            <span>${data.paymentStatus}</span>
          </div>

          <div class="row">
            <span>Order Status:</span>
            <span>${data.orderStatus}</span>
          </div>
        </div>

        <div class="dashed"></div>

        <!-- Footer -->
        <div class="footer">
          <p>Software Developed by: Devpeller - Software Solutions,</p>
          <p>Mobile: 0336-6667686</p>
        </div>

      </body>
    </html>
  `);

  printWindow?.document.close();
  printWindow?.focus();
  printWindow?.print();
};
