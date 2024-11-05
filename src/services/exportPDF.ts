import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Configuration options for PDF export
 */
interface PDFExportOptions {
  filename?: string;
  pageSize?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  quality?: number;
  preserveRatio?: boolean;
  scale?: number;
  margin?: number;
}

/**
 * Default export options
 */
const defaultOptions: PDFExportOptions = {
  filename: 'training-attendance.pdf',
  pageSize: 'a4',
  orientation: 'portrait',
  scale: 2,
  margin: 10
};

/**
 * Get PDF dimensions in mm based on page size and orientation
 */
const getPDFDimensions = (
    pageSize: 'a4' | 'letter',
    orientation: 'portrait' | 'landscape'
): { width: number; height: number } => {
  // A4 dimensions in mm
  let width = 210;
  let height = 297;

  if (pageSize.toLowerCase() === 'letter') {
    width = 215.9;
    height = 279.4;
  }

  if (orientation.toLowerCase() === 'landscape') {
    [width, height] = [height, width];
  }

  return { width, height };
};

/**
 * Exports an HTML element to PDF
 */
const exportPDF = async (
    element: HTMLElement | string,
    userOptions: PDFExportOptions = {}
): Promise<void> => {
  try {
    const options = { ...defaultOptions, ...userOptions };

    // Get the DOM element if ID was provided
    const targetElement = typeof element === 'string'
        ? document.getElementById(element)
        : element;

    if (!targetElement) {
      throw new Error('Element not found');
    }

    // Get page dimensions
    const { width: pdfWidth, height: pdfHeight } = getPDFDimensions(
        options.pageSize!,
        options.orientation!
    );

    // Create canvas
    const canvas = await html2canvas(targetElement, {
      scale: options.scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: targetElement.scrollWidth,
      windowHeight: targetElement.scrollHeight
    });

    // Calculate dimensions while maintaining aspect ratio
    const aspectRatio = canvas.width / canvas.height;
    const printWidth = pdfWidth - 2 * (options.margin || 0);
    const printHeight = printWidth / aspectRatio;

    // Check if content fits on one page
    if (printHeight <= pdfHeight - 2 * (options.margin || 0)) {
      // Single page export
      const pdf = new jsPDF({
        orientation: options.orientation,
        unit: 'mm',
        format: options.pageSize
      });

      // Convert canvas to image and add to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', options.margin || 0, options.margin || 0, printWidth, printHeight);
      pdf.save(options.filename || 'training-attendance.pdf');
    } else {
      // Multi-page export
      await exportMultiPage(canvas, options);
    }
  } catch (error) {
    console.error('PDF Export failed:', error);
    throw error;
  }
};

/**
 * Handles multi-page PDF export for long content
 */
const exportMultiPage = async (canvas: HTMLCanvasElement, options: PDFExportOptions): Promise<void> => {
  const { width: pdfWidth, height: pdfHeight } = getPDFDimensions(options.pageSize!, options.orientation!);

  const pdf = new jsPDF({
    orientation: options.orientation,
    unit: 'mm',
    format: options.pageSize
  });

  // Calculate dimensions for each page
  const printWidth = pdfWidth - 2 * (options.margin || 0);
  const printHeight = pdfHeight - 2 * (options.margin || 0);

  const imgData = canvas.toDataURL('image/png');
  const imgWidth = printWidth;
  const imgHeight = (canvas.height * printWidth) / canvas.width;

  let heightLeft = imgHeight;
  let currentPage = 1;

  // Add first page
  pdf.addImage(imgData, 'PNG', options.margin || 0, options.margin || 0, imgWidth, imgHeight);
  heightLeft -= printHeight;

  // Add additional pages if needed
  while (heightLeft > 0) {
    pdf.addPage();
    currentPage++;

    pdf.addImage(
        imgData,
        'PNG',
        options.margin || 0,
        options.margin! - printHeight * (currentPage - 1),
        imgWidth,
        imgHeight
    );

    heightLeft -= printHeight;
  }

  pdf.save(options.filename || 'training-attendance.pdf');
};

/**
 * Utility function to format date for filename
 */
export const formatDateForFilename = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Generates a filename for the training attendance PDF
 */
export const generateAttendanceFilename = (trainingName: string, date: Date = new Date()): string => {
  const sanitizedName = trainingName.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').toLowerCase();
  return `training-attendance-${sanitizedName}-${formatDateForFilename(date)}.pdf`;
};

export default exportPDF;
