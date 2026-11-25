/**
 * Pure JavaScript PDF Generator for "WEEKLY WORKOUT PLAN"
 * Exactly matches the clean, minimalist 2-page format:
 * - Pure white background, zero decorative boxes/cards
 * - Elegant typography and generous spacing
 * - Page 1: Monday, Tuesday, Wednesday + PAGE 1
 * - Page 2: Thursday, Friday, Saturday, Sunday + PAGE 2
 */

class SimplePdfBuilder {
  constructor() {
    this.pages = [];
  }

  addPage(commands) {
    this.pages.push(commands);
  }

  buildBlob() {
    const objects = [];
    const offsets = [];

    // Obj 1: Catalog
    objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
    // Obj 2: Placeholder for Pages
    objects.push('');
    // Obj 3: Font F1 (Helvetica)
    objects.push('3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
    // Obj 4: Font F2 (Helvetica-Bold)
    objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');

    let currentObjId = 5;
    const pageObjIds = [];

    for (const pageCommands of this.pages) {
      const pageId = currentObjId++;
      const contentId = currentObjId++;
      pageObjIds.push(pageId);

      const streamContent = pageCommands.join('\n');
      const streamLen = new TextEncoder().encode(streamContent).length;

      // Page object (A4: 595.28 x 841.89 points)
      objects.push(
        `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents ${contentId} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> >>\nendobj`
      );

      // Content stream object
      objects.push(
        `${contentId} 0 obj\n<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream\nendobj`
      );
    }

    // Set Obj 2 (Pages)
    const kidsStr = pageObjIds.map((id) => `${id} 0 R`).join(' ');
    objects[1] = `2 0 obj\n<< /Type /Pages /Kids [${kidsStr}] /Count ${pageObjIds.length} >>\nendobj`;

    // Assemble file string
    let pdfHeader = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    let fullPdf = pdfHeader;
    let byteOffset = new TextEncoder().encode(pdfHeader).length;

    for (let i = 0; i < objects.length; i++) {
      offsets.push(byteOffset);
      const objStr = objects[i] + '\n';
      fullPdf += objStr;
      byteOffset += new TextEncoder().encode(objStr).length;
    }

    const xrefOffset = byteOffset;
    fullPdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;

    for (let i = 0; i < offsets.length; i++) {
      const off = String(offsets[i]).padStart(10, '0');
      fullPdf += `${off} 00000 n \n`;
    }

    fullPdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    const bytes = new TextEncoder().encode(fullPdf);
    return new Blob([bytes], { type: 'application/pdf' });
  }
}

/**
 * Downloads the clean, minimalist 2-page PDF file directly.
 */
export function downloadWeeklyGymSplitPdf() {
  const doc = new SimplePdfBuilder();

  // ==========================================
  // PAGE 1: TITLE, MONDAY, TUESDAY, WEDNESDAY
  // ==========================================
  doc.addPage([
    // Pure White Background
    '1 1 1 rg 0 0 595.28 841.89 re f',

    // Title: WEEKLY WORKOUT PLAN (Centered, Bold, Deep Slate)
    'BT /F2 19 Tf 0.12 0.18 0.26 rg 175 776 Td (WEEKLY WORKOUT PLAN) Tj ET',
    // Subtitle: A structured weekly strength-training split (Centered, Slate Grey)
    'BT /F1 10 Tf 0.40 0.47 0.56 rg 188 758 Td (A structured weekly strength-training split) Tj ET',

    // MONDAY — GLUTES & HAMSTRINGS
    'BT /F2 11.5 Tf 0.12 0.18 0.26 rg 55 715 Td (MONDAY - GLUTES & HAMSTRINGS) Tj ET',
    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 699 Td (Warm-Up & Strength Training) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 685 Td (* Push-Ups - 10-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 672 Td (* Pull-Ups - 10-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 659 Td (* Stretching - 5-7 minutes) Tj ET',

    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 642 Td (Workout) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 628 Td (* 1. Hip Abduction - 3 sets x 15-20 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 615 Td (* 2. Hip Thrust - 3 sets x heavy weight, close to failure) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 602 Td (* 3. Sumo Squats - 3 sets x 15-20 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 589 Td (* 4. Romanian Deadlift (RDL) - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 576 Td (* 5. Lying Leg Curl - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 563 Td (* 6. Cable Kickback - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 550 Td (* 7. Calf Raises - 3 sets x 12-15 reps) Tj ET',

    // TUESDAY — QUADS
    'BT /F2 11.5 Tf 0.12 0.18 0.26 rg 55 518 Td (TUESDAY - QUADS) Tj ET',
    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 502 Td (Warm-Up & Strength Training) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 488 Td (* Push-Ups - 10-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 475 Td (* Pull-Ups - 10-15 reps) Tj ET',

    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 458 Td (Workout) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 444 Td (* 1. Leg Press - 4 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 431 Td (* 2. Leg Extension - 3 sets x 12-15 reps (last set to failure)) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 418 Td (* 3. Seated Leg Curl - 3 sets x 12-15 reps (last set to failure)) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 405 Td (* 4. Lunges - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 392 Td (* 5. Calf Raises - 3 sets x 12-15 reps) Tj ET',

    // WEDNESDAY — BACK
    'BT /F2 11.5 Tf 0.12 0.18 0.26 rg 55 360 Td (WEDNESDAY - BACK) Tj ET',
    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 344 Td (Warm-Up & Strength Training) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 330 Td (* Push-Ups - 10-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 317 Td (* Pull-Ups - 10-15 reps) Tj ET',

    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 300 Td (Workout) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 286 Td (* 1. Lat Pulldown - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 273 Td (* 2. Bent-Over Row / T-Bar Row - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 260 Td (* 3. Seated Cable Row - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 247 Td (* 4. Reverse Lat Pulldown - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 234 Td (* 5. Shrugs - 3 sets x 8-12 reps (last set to failure)) Tj ET',

    // Bottom Right: PAGE 1
    'BT /F1 8.5 Tf 0.60 0.65 0.72 rg 505 40 Td (PAGE 1) Tj ET',
  ]);

  // ==========================================
  // PAGE 2: THURSDAY, FRIDAY, SATURDAY, SUNDAY
  // ==========================================
  doc.addPage([
    // Pure White Background
    '1 1 1 rg 0 0 595.28 841.89 re f',

    // THURSDAY — ARMS
    'BT /F2 11.5 Tf 0.12 0.18 0.26 rg 55 776 Td (THURSDAY - ARMS) Tj ET',
    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 760 Td (Warm-Up & Strength Training) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 746 Td (* Push-Ups - 10-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 733 Td (* Pull-Ups - 10-15 reps) Tj ET',

    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 716 Td (Biceps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 702 Td (* 1. Dumbbell Curls - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 689 Td (* 2. Hammer Curls - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 676 Td (* 3. Preacher Curls - 3 sets x 12-15 reps) Tj ET',

    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 659 Td (Forearms) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 645 Td (* 4. Reverse Cable Curls - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 632 Td (* 5. Dumbbell Wrist Curls - 3 sets x 12-15 reps) Tj ET',

    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 615 Td (Triceps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 601 Td (* 6. Cable Pushdowns - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 588 Td (* 7. Weighted Bench Dips - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 575 Td (* 8. Cable Overhead Triceps Extensions - 3 sets x 12-15 reps) Tj ET',

    // FRIDAY — REST DAY
    'BT /F2 11.5 Tf 0.12 0.18 0.26 rg 55 540 Td (FRIDAY - REST DAY) Tj ET',
    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 524 Td (Recovery) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 510 Td (* Rest and recover.) Tj ET',

    // SATURDAY — LEGS & SHOULDERS
    'BT /F2 11.5 Tf 0.12 0.18 0.26 rg 55 474 Td (SATURDAY - LEGS & SHOULDERS) Tj ET',
    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 458 Td (Warm-Up & Strength Training) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 444 Td (* Push-Ups - 10-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 431 Td (* Pull-Ups - 10-15 reps) Tj ET',

    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 414 Td (Legs - Quad Focus) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 400 Td (* 1. Leg Extensions - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 387 Td (* 2. Sumo Squats - 3 sets x 15-20 reps (use a lighter weight and focus on proper form)) Tj ET',

    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 370 Td (Shoulders) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 356 Td (* 3. Dumbbell Shoulder Press - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 343 Td (* 4. Dumbbell Lateral Raises - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 330 Td (* 5. Dumbbell Front Raises - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 317 Td (* 6. Upright Rows - 3 sets x 12-15 reps) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 304 Td (* 7. Shrugs - 3 sets x 8-12 reps (heavy but controlled, close to failure)) Tj ET',

    // SUNDAY — REST & RECOVERY
    'BT /F2 11.5 Tf 0.12 0.18 0.26 rg 55 268 Td (SUNDAY - REST & RECOVERY) Tj ET',
    'BT /F2 9.5 Tf 0.30 0.36 0.45 rg 55 252 Td (Recovery) Tj ET',
    'BT /F1 9.5 Tf 0.12 0.18 0.26 rg 55 238 Td (* Rest and recover.) Tj ET',

    // Bottom Right: PAGE 2
    'BT /F1 8.5 Tf 0.60 0.65 0.72 rg 505 40 Td (PAGE 2) Tj ET',
  ]);

  const blob = doc.buildBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Weekly-Workout-Plan.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Printable HTML view generator: opens this exact clean 2-page document with
 * beautiful modern typography (Inter/Plus Jakarta Sans) and perfect print margins.
 */
export function printWeeklyGymSplit() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>WEEKLY WORKOUT PLAN</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #F1F3F5;
      color: #1E293B;
      padding: 30px 10px;
      -webkit-font-smoothing: antialiased;
      line-height: 1.45;
    }
    .print-actions {
      max-width: 794px;
      margin: 0 auto 20px auto;
      text-align: right;
    }
    .print-btn {
      background: #0F172A;
      color: #FFFFFF;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: background 0.2s;
    }
    .print-btn:hover {
      background: #000000;
    }
    .pdf-page {
      width: 210mm;
      min-height: 297mm;
      background: #FFFFFF;
      margin: 0 auto 30px auto;
      padding: 24mm 22mm 20mm 22mm;
      position: relative;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
    }
    .page-footer {
      position: absolute;
      bottom: 18mm;
      right: 22mm;
      font-size: 11px;
      font-weight: 500;
      color: #94A3B8;
      letter-spacing: 0.05em;
    }
    .main-title-box {
      text-align: center;
      margin-bottom: 24px;
    }
    .main-title {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: #1E293B;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .main-subtitle {
      font-size: 13px;
      font-weight: 500;
      color: #64748B;
    }
    .day-block {
      margin-bottom: 22px;
    }
    .day-heading {
      font-size: 15px;
      font-weight: 800;
      color: #1E293B;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 12.5px;
      font-weight: 700;
      color: #475569;
      margin-top: 8px;
      margin-bottom: 5px;
    }
    .item-list {
      list-style: none;
      padding-left: 0;
    }
    .item-list li {
      font-size: 12.5px;
      color: #1E293B;
      margin-bottom: 3.5px;
      line-height: 1.4;
      display: flex;
      align-items: baseline;
    }
    .item-list li::before {
      content: "•";
      font-size: 14px;
      margin-right: 8px;
      color: #1E293B;
      line-height: 1;
    }
    @media print {
      body {
        background: #FFFFFF;
        padding: 0;
      }
      .print-actions {
        display: none;
      }
      .pdf-page {
        width: 100%;
        min-height: 100vh;
        margin: 0;
        box-shadow: none;
        page-break-after: always;
      }
      @page {
        size: A4;
        margin: 0;
      }
    }
  </style>
</head>
<body>
  <div class="print-actions">
    <button class="print-btn" onclick="window.print()">🖨️ Print or Save as PDF</button>
  </div>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="pdf-page">
    <div class="main-title-box">
      <h1 class="main-title">WEEKLY WORKOUT PLAN</h1>
      <p class="main-subtitle">A structured weekly strength-training split</p>
    </div>

    <!-- MONDAY -->
    <div class="day-block">
      <h2 class="day-heading">MONDAY — GLUTES & HAMSTRINGS</h2>
      <div class="section-title">Warm-Up & Strength Training</div>
      <ul class="item-list">
        <li>Push-Ups — 10–15 reps</li>
        <li>Pull-Ups — 10–15 reps</li>
        <li>Stretching — 5–7 minutes</li>
      </ul>
      <div class="section-title">Workout</div>
      <ul class="item-list">
        <li>1. Hip Abduction — 3 sets × 15–20 reps</li>
        <li>2. Hip Thrust — 3 sets × heavy weight, close to failure</li>
        <li>3. Sumo Squats — 3 sets × 15–20 reps</li>
        <li>4. Romanian Deadlift (RDL) — 3 sets × 12–15 reps</li>
        <li>5. Lying Leg Curl — 3 sets × 12–15 reps</li>
        <li>6. Cable Kickback — 3 sets × 12–15 reps</li>
        <li>7. Calf Raises — 3 sets × 12–15 reps</li>
      </ul>
    </div>

    <!-- TUESDAY -->
    <div class="day-block">
      <h2 class="day-heading">TUESDAY — QUADS</h2>
      <div class="section-title">Warm-Up & Strength Training</div>
      <ul class="item-list">
        <li>Push-Ups — 10–15 reps</li>
        <li>Pull-Ups — 10–15 reps</li>
      </ul>
      <div class="section-title">Workout</div>
      <ul class="item-list">
        <li>1. Leg Press — 4 sets × 12–15 reps</li>
        <li>2. Leg Extension — 3 sets × 12–15 reps (last set to failure)</li>
        <li>3. Seated Leg Curl — 3 sets × 12–15 reps (last set to failure)</li>
        <li>4. Lunges — 3 sets × 12–15 reps</li>
        <li>5. Calf Raises — 3 sets × 12–15 reps</li>
      </ul>
    </div>

    <!-- WEDNESDAY -->
    <div class="day-block">
      <h2 class="day-heading">WEDNESDAY — BACK</h2>
      <div class="section-title">Warm-Up & Strength Training</div>
      <ul class="item-list">
        <li>Push-Ups — 10–15 reps</li>
        <li>Pull-Ups — 10–15 reps</li>
      </ul>
      <div class="section-title">Workout</div>
      <ul class="item-list">
        <li>1. Lat Pulldown — 3 sets × 12–15 reps</li>
        <li>2. Bent-Over Row / T-Bar Row — 3 sets × 12–15 reps</li>
        <li>3. Seated Cable Row — 3 sets × 12–15 reps</li>
        <li>4. Reverse Lat Pulldown — 3 sets × 12–15 reps</li>
        <li>5. Shrugs — 3 sets × 8–12 reps (last set to failure)</li>
      </ul>
    </div>

    <div class="page-footer">PAGE 1</div>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="pdf-page">
    <!-- THURSDAY -->
    <div class="day-block">
      <h2 class="day-heading">THURSDAY — ARMS</h2>
      <div class="section-title">Warm-Up & Strength Training</div>
      <ul class="item-list">
        <li>Push-Ups — 10–15 reps</li>
        <li>Pull-Ups — 10–15 reps</li>
      </ul>
      <div class="section-title">Biceps</div>
      <ul class="item-list">
        <li>1. Dumbbell Curls — 3 sets × 12–15 reps</li>
        <li>2. Hammer Curls — 3 sets × 12–15 reps</li>
        <li>3. Preacher Curls — 3 sets × 12–15 reps</li>
      </ul>
      <div class="section-title">Forearms</div>
      <ul class="item-list">
        <li>4. Reverse Cable Curls — 3 sets × 12–15 reps</li>
        <li>5. Dumbbell Wrist Curls — 3 sets × 12–15 reps</li>
      </ul>
      <div class="section-title">Triceps</div>
      <ul class="item-list">
        <li>6. Cable Pushdowns — 3 sets × 12–15 reps</li>
        <li>7. Weighted Bench Dips — 3 sets × 12–15 reps</li>
        <li>8. Cable Overhead Triceps Extensions — 3 sets × 12–15 reps</li>
      </ul>
    </div>

    <!-- FRIDAY -->
    <div class="day-block">
      <h2 class="day-heading">FRIDAY — REST DAY</h2>
      <div class="section-title">Recovery</div>
      <ul class="item-list">
        <li>Rest and recover.</li>
      </ul>
    </div>

    <!-- SATURDAY -->
    <div class="day-block">
      <h2 class="day-heading">SATURDAY — LEGS & SHOULDERS</h2>
      <div class="section-title">Warm-Up & Strength Training</div>
      <ul class="item-list">
        <li>Push-Ups — 10–15 reps</li>
        <li>Pull-Ups — 10–15 reps</li>
      </ul>
      <div class="section-title">Legs — Quad Focus</div>
      <ul class="item-list">
        <li>1. Leg Extensions — 3 sets × 12–15 reps</li>
        <li>2. Sumo Squats — 3 sets × 15–20 reps (use a lighter weight and focus on proper form)</li>
      </ul>
      <div class="section-title">Shoulders</div>
      <ul class="item-list">
        <li>3. Dumbbell Shoulder Press — 3 sets × 12–15 reps</li>
        <li>4. Dumbbell Lateral Raises — 3 sets × 12–15 reps</li>
        <li>5. Dumbbell Front Raises — 3 sets × 12–15 reps</li>
        <li>6. Upright Rows — 3 sets × 12–15 reps</li>
        <li>7. Shrugs — 3 sets × 8–12 reps (heavy but controlled, close to failure)</li>
      </ul>
    </div>

    <!-- SUNDAY -->
    <div class="day-block">
      <h2 class="day-heading">SUNDAY — REST & RECOVERY</h2>
      <div class="section-title">Recovery</div>
      <ul class="item-list">
        <li>Rest and recover.</li>
      </ul>
    </div>

    <div class="page-footer">PAGE 2</div>
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
