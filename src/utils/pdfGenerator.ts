import { jsPDF } from 'jspdf';
import { Product, UserSubscription } from '../types';

export function generateCatalogPDF(products: Product[], user: UserSubscription) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const dateStr = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });

  // Header Banner
  doc.setFillColor(15, 18, 22); // Dark Carbon #0F1216
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Accent Bar
  doc.setFillColor(0, 82, 204); // Cobalt Blue #0052CC
  doc.rect(0, 38, pageWidth, 2, 'F');

  // Title & Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('AUTOREPUESTOS PRO', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(138, 148, 166); // Steel #8A94A6
  doc.text('CATÁLOGO OFICIAL DE REPUESTOS AUTOMOTRICES DE ALTA DURABILIDAD', 14, 25);
  doc.text(`Generado para: ${user.name} (${user.email}) | WhatsApp: ${user.whatsapp}`, 14, 32);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`Fecha: ${dateStr}`, pageWidth - 14, 18, { align: 'right' });
  doc.text('Moneda: Soles Peruanos (S/)', pageWidth - 14, 25, { align: 'right' });

  let yPosition = 50;

  // Table Header
  const drawTableHeader = (y: number) => {
    doc.setFillColor(11, 31, 58); // Navy #0B1F3A
    doc.rect(14, y, pageWidth - 28, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);

    doc.text('SKU / CÓDIGO', 18, y + 5.5);
    doc.text('REPUESTO & ESPECIFICACIONES', 55, y + 5.5);
    doc.text('MARCA & MODELOS', 125, y + 5.5);
    doc.text('PRECIO SOLES', pageWidth - 18, y + 5.5, { align: 'right' });
  };

  drawTableHeader(yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'normal');

  products.forEach((prod, idx) => {
    if (yPosition > pageHeight - 25) {
      doc.addPage();
      
      // Top header small on new page
      doc.setFillColor(15, 18, 22);
      doc.rect(0, 0, pageWidth, 15, 'F');
      doc.setFillColor(0, 82, 204);
      doc.rect(0, 14, pageWidth, 1, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('AUTOREPUESTOS PRO - Catálogo de Productos', 14, 10);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Página ${doc.getNumberOfPages()}`, pageWidth - 14, 10, { align: 'right' });

      yPosition = 22;
      drawTableHeader(yPosition);
      yPosition += 10;
    }

    // Row zebra background
    if (idx % 2 === 0) {
      doc.setFillColor(244, 245, 247);
      doc.rect(14, yPosition - 3, pageWidth - 28, 12, 'F');
    }

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8);
    doc.setFont('courier', 'bold');
    doc.text(prod.sku, 18, yPosition + 3);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    const nameText = prod.name.length > 38 ? prod.name.substring(0, 36) + '...' : prod.name;
    doc.text(nameText, 55, yPosition + 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Motor: ${prod.engine} | Años: ${prod.yearStart}-${prod.yearEnd}`, 55, yPosition + 6);

    const compatText = prod.compatibleModels.slice(0, 2).join(', ');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${prod.brand}: ${compatText}`, 125, yPosition + 3);

    // Price
    doc.setFont('courier', 'bold');
    doc.setFontSize(9);
    if (prod.isOffer && prod.discountPrice) {
      doc.setTextColor(0, 82, 204);
      doc.text(`S/ ${prod.discountPrice.toFixed(2)}`, pageWidth - 18, yPosition + 3, { align: 'right' });
      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184);
      doc.text(`(Antes S/ ${prod.price.toFixed(2)})`, pageWidth - 18, yPosition + 7, { align: 'right' });
    } else {
      doc.setTextColor(15, 23, 42);
      doc.text(`S/ ${prod.price.toFixed(2)}`, pageWidth - 18, yPosition + 3, { align: 'right' });
    }

    yPosition += 13;
  });

  // Footer on final page
  if (yPosition > pageHeight - 30) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(14, yPosition + 5, pageWidth - 14, yPosition + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('AUTOREPUESTOS PRO - Distribución Nacional en Perú. Pedidos y Consultas vía WhatsApp.', 14, yPosition + 12);
  doc.text('Contacto: ventas@autorepuestospro.pe | WhatsApp: +51 987 654 321', pageWidth - 14, yPosition + 12, { align: 'right' });

  // Save PDF
  doc.save(`Catálogo_AUTOREPUESTOS_PRO_${user.name.replace(/\s+/g, '_')}.pdf`);
}
