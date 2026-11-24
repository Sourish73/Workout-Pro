/**
 * Pure JavaScript PDF Generator for "My Weekly Gym Split" by Akshita Sahu
 * Generates an authentic, colorful, multi-page PDF document (PDF-1.4 standard)
 * with zero external dependencies.
 */

function escapePdfText(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

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
    // Obj 5: Font F3 (Helvetica-Oblique)
    objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj');

    let currentObjId = 6;
    const pageObjIds = [];

    for (const pageCommands of this.pages) {
      const pageId = currentObjId++;
      const contentId = currentObjId++;
      pageObjIds.push(pageId);

      const streamContent = pageCommands.join('\n');
      // Calculate byte length for UTF-8 string
      const streamLen = new TextEncoder().encode(streamContent).length;

      // Page object (A4: 595.28 x 841.89 points)
      objects.push(
        `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents ${contentId} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> >>\nendobj`
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
 * Downloads a multi-page colorful, well-oriented PDF guide.
 */
export function downloadWeeklyGymSplitPdf() {
  const doc = new SimplePdfBuilder();

  // ==========================================
  // PAGE 1: COVER & GUIDE OVERVIEW
  // ==========================================
  doc.addPage([
    // Background soft cream
    '0.97 0.95 0.91 rg 0 0 595.28 841.89 re f',

    // Top Header Banner (Charcoal Luxury)
    '0.11 0.10 0.09 rg 30 735 535.28 85 re f',
    // Accent gold line
    '0.96 0.75 0.20 rg 30 732 535.28 3 re f',

    // Header Text
    'BT /F2 10 Tf 0.96 0.75 0.20 rg 45 798 Td (BUILD WITH ME  *  OFFICIAL WORKOUT SPLIT) Tj ET',
    'BT /F2 22 Tf 1 1 1 rg 45 772 Td (MY WEEKLY GYM SPLIT) Tj ET',
    'BT /F1 10 Tf 0.85 0.85 0.85 rg 45 750 Td (By Akshita Sahu  *  Instagram: @akshitaoffside_  *  Fitwithakshita@gmail.com) Tj ET',

    // Verified Member Pill
    '0.06 0.58 0.40 rg 380 755 170 20 re f',
    'BT /F2 9 Tf 1 1 1 rg 390 762 Td ([✓] UNLOCKED MEMBER ACCESS) Tj ET',

    // Core Hook Card
    '1 1 1 rg 0.92 0.88 0.82 RG 1.5 w 30 635 535.28 80 re B',
    'BT /F2 13 Tf 0.11 0.10 0.09 rg 45 690 Td (If you are tired of going to the gym without a plan, this is for you.) Tj ET',
    'BT /F1 10 Tf 0.25 0.25 0.25 rg 45 668 Td (Build With Me is my personal weekly workout split - the routine I follow to build muscle,) Tj ET',
    'BT /F1 10 Tf 0.25 0.25 0.25 rg 45 652 Td (get stronger, and work towards my fitness goals with specific exercises, sets, and reps.) Tj ET',

    // "What's Inside" Card (Rich Ivory Card with Gold Accent)
    '0.99 0.98 0.96 rg 0.92 0.88 0.82 RG 1.5 w 30 355 535.28 265 re B',
    '0.96 0.75 0.20 rg 45 595 140 18 re f',
    'BT /F2 10 Tf 0.11 0.10 0.09 rg 52 601 Td (WHAT IS INSIDE THE GUIDE) Tj ET',

    // Bullet points with colorful rose/gold bullets
    // Bullet 1
    '0.88 0.11 0.28 rg 50 568 7 7 re f',
    'BT /F2 11 Tf 0.15 0.15 0.15 rg 65 567 Td (6 Structured Training Days) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 240 567 Td (Complete Monday through Saturday exercise program) Tj ET',

    // Bullet 2
    '0.88 0.11 0.28 rg 50 540 7 7 re f',
    'BT /F2 11 Tf 0.15 0.15 0.15 rg 65 539 Td (Glute & Hamstring Focused Training) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 285 539 Td (Hip thrusts, RDLs, sumo squats) Tj ET',

    // Bullet 3
    '0.88 0.11 0.28 rg 50 512 7 7 re f',
    'BT /F2 11 Tf 0.15 0.15 0.15 rg 65 511 Td (Quad-Focused Workouts) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 220 511 Td (Leg press, leg extensions, lunges to failure) Tj ET',

    // Bullet 4
    '0.88 0.11 0.28 rg 50 484 7 7 re f',
    'BT /F2 11 Tf 0.15 0.15 0.15 rg 65 483 Td (Back, Arms & Forearms Training) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 265 483 Td (V-Taper lats, biceps, triceps & grip work) Tj ET',

    // Bullet 5
    '0.88 0.11 0.28 rg 50 456 7 7 re f',
    'BT /F2 11 Tf 0.15 0.15 0.15 rg 65 455 Td (Legs & Shoulders) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 185 455 Td (Complete 3D deltoid sculpt & quad finishing) Tj ET',

    // Bullet 6
    '0.88 0.11 0.28 rg 50 428 7 7 re f',
    'BT /F2 11 Tf 0.15 0.15 0.15 rg 65 427 Td (Rest & Recovery Days) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 210 427 Td (Step tracker, hydration target, mobility & sleep) Tj ET',

    // Bullet 7
    '0.88 0.11 0.28 rg 50 400 7 7 re f',
    'BT /F2 11 Tf 0.15 0.15 0.15 rg 65 399 Td (Exercises, Sets, Reps & Intensity Guidance) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 325 399 Td (Form cues & failure sets) Tj ET',

    // Guidance text
    'BT /F1 10 Tf 0.30 0.30 0.30 rg 50 370 Td (Whether you are starting out or looking for a structured routine, this is your guide to training with purpose.) Tj ET',

    // Coach Quote Card (Dark Athletic Aesthetic)
    '0.11 0.10 0.09 rg 30 220 535.28 115 re f',
    '0.88 0.11 0.28 rg 30 220 5 115 re f',
    'BT /F3 13 Tf 0.95 0.95 0.95 rg 50 295 Td ("You do not have to be the strongest girl in the gym.) Tj ET',
    'BT /F3 13 Tf 0.95 0.95 0.95 rg 50 275 Td ( You just have to keep showing up.") Tj ET',
    'BT /F2 12 Tf 0.96 0.75 0.20 rg 50 248 Td (- Akshita Sahu) Tj ET',
    'BT /F2 10 Tf 0.80 0.80 0.80 rg 430 248 Td (Let us build together.) Tj ET',

    // Footer Page 1
    '0.75 0.70 0.65 rg 30 180 535.28 1 re f',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 30 162 Td (Official Workout Protocol * Akshita Sahu * Page 1 of 4) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 400 162 Td (Verified Member Personal Copy) Tj ET',
  ]);

  // ==========================================
  // PAGE 2: MONDAY & TUESDAY
  // ==========================================
  doc.addPage([
    // Background cream
    '0.97 0.95 0.91 rg 0 0 595.28 841.89 re f',

    // Top Header Banner
    '0.11 0.10 0.09 rg 30 780 535.28 42 re f',
    '0.96 0.75 0.20 rg 30 777 535.28 3 re f',
    'BT /F2 13 Tf 1 1 1 rg 45 798 Td (PART 1: LOWER BODY SPECIALIZATION (MON & TUE)) Tj ET',
    'BT /F1 9 Tf 0.85 0.85 0.85 rg 430 798 Td (My Weekly Gym Split) Tj ET',

    // MONDAY CARD
    '1 1 1 rg 0.92 0.88 0.82 RG 1.5 w 30 460 535.28 300 re B',
    // Monday Title Bar
    '0.88 0.11 0.28 rg 45 725 80 18 re f',
    'BT /F2 10 Tf 1 1 1 rg 53 730 Td (MONDAY) Tj ET',
    'BT /F2 14 Tf 0.11 0.10 0.09 rg 135 728 Td (Glutes & Hamstrings - Posterior Chain) Tj ET',
    'BT /F1 9 Tf 0.50 0.50 0.50 rg 450 728 Td (Time: 55-65 mins) Tj ET',

    // Warm-up Box
    '0.98 0.96 0.94 rg 45 685 505.28 28 re f',
    'BT /F2 9 Tf 0.88 0.11 0.28 rg 55 695 Td (WARM-UP:) Tj ET',
    'BT /F1 9 Tf 0.25 0.25 0.25 rg 120 695 Td (Push-Ups: 10-15 Reps   *   Pull-Ups: 10-15 Reps   *   Dynamic Stretch: 5-7 mins) Tj ET',

    // Monday Exercises
    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 660 Td (1. Hip Abduction) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 660 Td (3 Sets x 15-20 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 660 Td (Lean slightly forward for glute medius isolation) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 635 Td (2. Hip Thrust) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 635 Td (3 Sets x Heavy to Failure) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 635 Td (Drive through heels; full hip lockout; chin tucked) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 610 Td (3. Sumo Squats) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 610 Td (3 Sets x 15-20 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 610 Td (Wide stance with toes flared 35-45 degrees) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 585 Td (4. Romanian Deadlift (RDL)) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 585 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 585 Td (Push hips straight back with soft knee bend) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 560 Td (5. Lying Leg Curl) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 560 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 560 Td (Keep hips glued to pad; 3-second negative descent) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 535 Td (6. Calf Raises) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 535 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 535 Td (Pause 2 full seconds at absolute bottom stretch) Tj ET',

    // Monday Pro-tip
    '0.96 0.75 0.20 rg 45 478 505.28 22 re f',
    'BT /F2 9 Tf 0.11 0.10 0.09 rg 55 484 Td (COACH TIP: Record weights each week. If you hit 20 reps on Hip Thrust, increase weight next session.) Tj ET',

    // TUESDAY CARD
    '1 1 1 rg 0.92 0.88 0.82 RG 1.5 w 30 135 535.28 305 re B',
    // Tuesday Title Bar
    '0.11 0.10 0.09 rg 45 405 80 18 re f',
    'BT /F2 10 Tf 1 1 1 rg 53 410 Td (TUESDAY) Tj ET',
    'BT /F2 14 Tf 0.11 0.10 0.09 rg 135 408 Td (Quads - Anterior Chain Hypertrophy) Tj ET',
    'BT /F1 9 Tf 0.50 0.50 0.50 rg 450 408 Td (Time: 50-60 mins) Tj ET',

    // Warm-up Box
    '0.98 0.96 0.94 rg 45 365 505.28 28 re f',
    'BT /F2 9 Tf 0.11 0.10 0.09 rg 55 375 Td (WARM-UP:) Tj ET',
    'BT /F1 9 Tf 0.25 0.25 0.25 rg 120 375 Td (Push-Ups: 10-15 Reps   *   Pull-Ups: 10-15 Reps   *   Quad Rolling) Tj ET',

    // Tuesday Exercises
    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 340 Td (1. Leg Press) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 340 Td (4 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 340 Td (Low-to-mid foot placement for maximal quad bias) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 315 Td (2. Leg Extension) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 315 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 315 Td (Last set taken to absolute failure; 1s top squeeze) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 290 Td (3. Seated Leg Curl) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 290 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 290 Td (Lengthened position overload; controls knee stress) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 265 Td (4. Lunges) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 265 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 265 Td (Dumbbell walking or reverse lunges with torso upright) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 240 Td (5. Calf Raises) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 240 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 240 Td (3-second slow descent into deep calf stretch) Tj ET',

    // Tuesday Pro-tip
    '0.96 0.75 0.20 rg 45 155 505.28 22 re f',
    'BT /F2 9 Tf 0.11 0.10 0.09 rg 55 161 Td (COACH TIP: Quads respond best to controlled eccentrics. Do not bounce the weight.) Tj ET',

    // Footer Page 2
    '0.75 0.70 0.65 rg 30 110 535.28 1 re f',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 30 92 Td (Official Workout Protocol * Akshita Sahu * Page 2 of 4) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 400 92 Td (Verified Member Personal Copy) Tj ET',
  ]);

  // ==========================================
  // PAGE 3: WEDNESDAY & THURSDAY
  // ==========================================
  doc.addPage([
    // Background cream
    '0.97 0.95 0.91 rg 0 0 595.28 841.89 re f',

    // Top Header Banner
    '0.11 0.10 0.09 rg 30 780 535.28 42 re f',
    '0.96 0.75 0.20 rg 30 777 535.28 3 re f',
    'BT /F2 13 Tf 1 1 1 rg 45 798 Td (PART 2: UPPER BODY SCULPTING (WED & THU)) Tj ET',
    'BT /F1 9 Tf 0.85 0.85 0.85 rg 430 798 Td (My Weekly Gym Split) Tj ET',

    // WEDNESDAY CARD
    '1 1 1 rg 0.92 0.88 0.82 RG 1.5 w 30 460 535.28 300 re B',
    // Wednesday Title Bar
    '0.88 0.11 0.28 rg 45 725 90 18 re f',
    'BT /F2 10 Tf 1 1 1 rg 52 730 Td (WEDNESDAY) Tj ET',
    'BT /F2 14 Tf 0.11 0.10 0.09 rg 145 728 Td (Back - V-Taper Width & Upper Back Density) Tj ET',
    'BT /F1 9 Tf 0.50 0.50 0.50 rg 450 728 Td (Time: 50-60 mins) Tj ET',

    // Warm-up Box
    '0.98 0.96 0.94 rg 45 685 505.28 28 re f',
    'BT /F2 9 Tf 0.88 0.11 0.28 rg 55 695 Td (WARM-UP:) Tj ET',
    'BT /F1 9 Tf 0.25 0.25 0.25 rg 120 695 Td (Push-Ups: 10-15 Reps   *   Pull-Ups: 10-15 Reps   *   Band Face Pulls) Tj ET',

    // Wednesday Exercises
    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 660 Td (1. Lat Pulldown) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 220 660 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 660 Td (Pull elbows down and into side pockets) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 635 Td (2. Bent-Over Row / T-Bar) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 220 635 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 635 Td (Maintain flat 45-degree spine; pull to navel) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 610 Td (3. Seated Cable Row) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 220 610 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 610 Td (Close-grip V-handle; avoid excessive momentum) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 585 Td (4. Reverse Lat Pulldown) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 220 585 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 585 Td (Underhand grip for maximal lower-lat recruitment) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 560 Td (5. Shrugs) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 220 560 Td (3 Sets x 8-12 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 560 Td (Last set to failure; strict pause at top peak) Tj ET',

    // Wednesday Pro-tip
    '0.96 0.75 0.20 rg 45 478 505.28 22 re f',
    'BT /F2 9 Tf 0.11 0.10 0.09 rg 55 484 Td (COACH TIP: Think of your hands as hooks; initiate every pull from your scapula and back.) Tj ET',

    // THURSDAY CARD (Arms)
    '1 1 1 rg 0.92 0.88 0.82 RG 1.5 w 30 115 535.28 325 re B',
    // Thursday Title Bar
    '0.11 0.10 0.09 rg 45 405 85 18 re f',
    'BT /F2 10 Tf 1 1 1 rg 53 410 Td (THURSDAY) Tj ET',
    'BT /F2 14 Tf 0.11 0.10 0.09 rg 140 408 Td (Arms - Biceps, Forearms & Triceps Gun Show) Tj ET',
    'BT /F1 9 Tf 0.50 0.50 0.50 rg 450 408 Td (Time: 55-65 mins) Tj ET',

    // Thursday Exercises
    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 375 Td (1. Dumbbell Curls) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 190 375 Td (3 x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 285 375 Td (Supinate wrists as you curl upward for biceps peak) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 350 Td (2. Hammer Curls) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 190 350 Td (3 x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 285 350 Td (Neutral palms grip; hits brachialis for upper arm thickness) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 325 Td (3. Preacher Curls) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 190 325 Td (3 x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 285 325 Td (Eliminate momentum; full lower arm stretch) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 300 Td (4. Reverse Cable Curls) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 190 300 Td (3 x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 285 300 Td (Overhand grip for forearm development) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 275 Td (5. Wrist Curls) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 190 275 Td (3 x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 285 275 Td (Forearms resting flat across bench) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 250 Td (6. Cable Pushdowns) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 190 250 Td (3 x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 285 250 Td (Rope attachment; flare rope apart at full extension) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 225 Td (7. Weighted Bench Dips) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 190 225 Td (3 x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 285 225 Td (Keep elbows tucked; press hard through palms) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 200 Td (8. Overhead Triceps Ext) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 190 200 Td (3 x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 285 200 Td (Long head triceps stretch with cable) Tj ET',

    // Thursday Pro-tip
    '0.96 0.75 0.20 rg 45 135 505.28 22 re f',
    'BT /F2 9 Tf 0.11 0.10 0.09 rg 55 141 Td (COACH TIP: Keep your elbows pinned in place during curls to isolate biceps completely.) Tj ET',

    // Footer Page 3
    '0.75 0.70 0.65 rg 30 90 535.28 1 re f',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 30 72 Td (Official Workout Protocol * Akshita Sahu * Page 3 of 4) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 400 72 Td (Verified Member Personal Copy) Tj ET',
  ]);

  // ==========================================
  // PAGE 4: FRIDAY, SATURDAY & SUNDAY
  // ==========================================
  doc.addPage([
    // Background cream
    '0.97 0.95 0.91 rg 0 0 595.28 841.89 re f',

    // Top Header Banner
    '0.11 0.10 0.09 rg 30 780 535.28 42 re f',
    '0.96 0.75 0.20 rg 30 777 535.28 3 re f',
    'BT /F2 13 Tf 1 1 1 rg 45 798 Td (PART 3: RECOVERY, SHOULDERS & WEEKLY REVIEW) Tj ET',
    'BT /F1 9 Tf 0.85 0.85 0.85 rg 430 798 Td (My Weekly Gym Split) Tj ET',

    // FRIDAY CARD (Rest & Recovery)
    '1 1 1 rg 0.92 0.88 0.82 RG 1.5 w 30 550 535.28 210 re B',
    // Friday Title Bar
    '0.06 0.58 0.40 rg 45 725 70 18 re f',
    'BT /F2 10 Tf 1 1 1 rg 53 730 Td (FRIDAY) Tj ET',
    'BT /F2 14 Tf 0.11 0.10 0.09 rg 125 728 Td (Rest Day & Active Tissue Repair) Tj ET',
    'BT /F1 9 Tf 0.50 0.50 0.50 rg 435 728 Td (Goal: Full Muscle Recovery) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 690 Td ([*] 8,000 - 10,000 Daily Steps) Tj ET',
    'BT /F1 9 Tf 0.35 0.35 0.35 rg 220 690 Td (Low-intensity outdoor walking; accelerates lymphatic drainage) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 665 Td ([*] 3.5 Liters Water Target) Tj ET',
    'BT /F1 9 Tf 0.35 0.35 0.35 rg 220 665 Td (Add pinch of pink Himalayan salt & electrolytes for hydration) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 640 Td ([*] 15-20 Min Foam Rolling) Tj ET',
    'BT /F1 9 Tf 0.35 0.35 0.35 rg 220 640 Td (Focus on quads, glutes, lats, and thoracic mobility) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 615 Td ([*] 8+ Hours Sleep Protocol) Tj ET',
    'BT /F1 9 Tf 0.35 0.35 0.35 rg 220 615 Td (Pitch-black room; zero screens 60 mins before bed for GH release) Tj ET',

    '0.06 0.58 0.40 rg 45 565 505.28 20 re f',
    'BT /F2 9 Tf 1 1 1 rg 55 571 Td (RECOVERY FACT: Muscle does not grow in the gym; it grows when you rest, eat, and sleep.) Tj ET',

    // SATURDAY CARD (Legs & Shoulders)
    '1 1 1 rg 0.92 0.88 0.82 RG 1.5 w 30 255 535.28 275 re B',
    // Saturday Title Bar
    '0.88 0.11 0.28 rg 45 495 80 18 re f',
    'BT /F2 10 Tf 1 1 1 rg 52 500 Td (SATURDAY) Tj ET',
    'BT /F2 14 Tf 0.11 0.10 0.09 rg 135 498 Td (Legs & Shoulders - Quad Hypertrophy & 3D Deltoids) Tj ET',
    'BT /F1 9 Tf 0.50 0.50 0.50 rg 450 498 Td (Time: 60-70 mins) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 465 Td (1. Leg Extensions) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 465 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 465 Td (Prime knee joint and flood quads before squats) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 440 Td (2. Sumo Squats) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 440 Td (3 Sets x 15-20 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 440 Td (Strict depth and continuous tension) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 415 Td (3. Shoulder Press) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 415 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 415 Td (Dumbbells with 75-degree incline; core braced) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 390 Td (4. Lateral Raises) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 390 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 390 Td (Lead with elbows; lean forward 10 degrees) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 365 Td (5. Front Raises) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 365 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 365 Td (Under control; no hip rocking or swing) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 340 Td (6. Upright Rows) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 340 Td (3 Sets x 12-15 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 340 Td (Cable or barbell pulled to lower chest level) Tj ET',

    'BT /F2 10 Tf 0.11 0.10 0.09 rg 50 315 Td (7. Shrugs) Tj ET',
    'BT /F2 10 Tf 0.88 0.11 0.28 rg 200 315 Td (3 Sets x 8-12 Reps) Tj ET',
    'BT /F1 9 Tf 0.40 0.40 0.40 rg 330 315 Td (Strict 2-second hold at peak contraction) Tj ET',

    // SUNDAY CARD (Review)
    '0.11 0.10 0.09 rg 30 115 535.28 125 re f',
    '0.96 0.75 0.20 rg 30 115 5 125 re f',
    'BT /F2 12 Tf 0.96 0.75 0.20 rg 45 212 Td (SUNDAY: REST, RECOVERY & WEEKLY ANALYTICS) Tj ET',
    'BT /F1 9 Tf 0.90 0.90 0.90 rg 45 192 Td (1. Review your 6-day training logs and celebrate your PRs and consistency.) Tj ET',
    'BT /F1 9 Tf 0.90 0.90 0.90 rg 45 174 Td (2. Meal prep high-protein sources (chicken breast, paneer, eggs, lentils, tofu) for 3 days.) Tj ET',
    'BT /F1 9 Tf 0.90 0.90 0.90 rg 45 156 Td (3. Joint check-in: Score your physical readiness (1-10) before Monday arrives.) Tj ET',
    'BT /F2 10 Tf 0.96 0.75 0.20 rg 45 132 Td (Let us build together! - Akshita Sahu (@akshitaoffside_)) Tj ET',

    // Footer Page 4
    '0.75 0.70 0.65 rg 30 75 535.28 1 re f',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 30 58 Td (Official Workout Protocol * Akshita Sahu * Page 4 of 4 * All rights reserved) Tj ET',
    'BT /F1 9 Tf 0.45 0.45 0.45 rg 370 58 Td (Contact: Fitwithakshita@gmail.com) Tj ET',
  ]);

  const blob = doc.buildBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'My-Weekly-Gym-Split-Akshita-Sahu.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Printable HTML view generator: opens full color magazine layout in new window for direct print/PDF save.
 */
export function printWeeklyGymSplit() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Weekly Gym Split - Akshita Sahu</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: #FAF7F2;
      color: #1C1917;
      padding: 30px;
      line-height: 1.5;
    }
    .page {
      max-width: 820px;
      margin: 0 auto 40px auto;
      background: #FFFFFF;
      border: 1px solid #EADBCC;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
      page-break-after: always;
    }
    .header-banner {
      background: #1C1917;
      color: #FFFFFF;
      border-radius: 18px;
      padding: 24px 30px;
      margin-bottom: 30px;
      position: relative;
      border-bottom: 4px solid #EAB308;
    }
    .badge {
      display: inline-block;
      background: #EAB308;
      color: #1C1917;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
    }
    h1 { font-size: 30px; font-weight: 900; letter-spacing: -0.02em; }
    h2 { font-size: 20px; font-weight: 800; margin-bottom: 12px; }
    .card {
      border: 1px solid #EADBCC;
      background: #FAF8F5;
      border-radius: 18px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    .bullet-list { list-style: none; margin: 16px 0; }
    .bullet-list li {
      position: relative;
      padding-left: 24px;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    .bullet-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      top: -2px;
      color: #E11D48;
      font-size: 24px;
    }
    .quote-box {
      background: #1C1917;
      color: #FFFFFF;
      border-radius: 18px;
      padding: 24px;
      margin-top: 30px;
      border-left: 6px solid #E11D48;
    }
    .exercise-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-radius: 12px;
      background: #FFFFFF;
      border: 1px solid #EADBCC;
      margin-bottom: 8px;
    }
    .ex-name { font-weight: 700; font-size: 14px; }
    .ex-sets { font-weight: 800; font-size: 13px; color: #E11D48; }
    .ex-note { font-size: 12px; color: #78716C; }
    @media print {
      body { background: #FFFFFF; padding: 0; }
      .page { box-shadow: none; border: none; padding: 20px; margin: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="max-width:820px;margin:0 auto 20px auto;text-align:right;">
    <button onclick="window.print()" style="background:#1C1917;color:#fff;border:none;padding:12px 24px;border-radius:12px;font-weight:800;cursor:pointer;font-size:14px;">
      🖨️ Print or Save as PDF
    </button>
  </div>

  <div class="page">
    <div class="header-banner">
      <span class="badge">BUILD WITH ME • OFFICIAL WORKOUT SPLIT</span>
      <h1>MY WEEKLY GYM SPLIT</h1>
      <p style="font-size:13px;color:#D6D3D1;margin-top:4px;">
        By Akshita Sahu • Instagram: @akshitaoffside_ • Fitwithakshita@gmail.com
      </p>
    </div>

    <div class="card">
      <p style="font-size:16px;font-weight:700;margin-bottom:8px;">
        If you're tired of going to the gym without a plan, this is for you.
      </p>
      <p style="font-size:14px;color:#44403C;">
        <strong>Build With Me</strong> is my personal weekly workout split — the routine I follow to build muscle, get stronger, and work towards my fitness goals. I've structured each training day with specific exercises, sets, and reps so you know exactly what to do when you step into the gym.
      </p>
    </div>

    <div class="card">
      <h2>WHAT'S INSIDE THE GUIDE:</h2>
      <ul class="bullet-list">
        <li>6 structured training days</li>
        <li>Glute & hamstring focused training</li>
        <li>Quad-focused workouts</li>
        <li>Back, arms & forearms training</li>
        <li>Legs & shoulders</li>
        <li>Rest & recovery days</li>
        <li>Exercises, sets, reps & intensity guidance</li>
      </ul>
      <p style="font-size:13px;color:#57534E;margin-top:12px;">
        Whether you're just starting your gym journey or looking for a structured routine to follow, this is your guide to training with purpose.
      </p>
    </div>

    <div class="quote-box">
      <p style="font-size:16px;font-style:italic;margin-bottom:10px;">
        "You don't have to be the strongest girl in the gym. You just have to keep showing up."
      </p>
      <p style="font-size:13px;font-weight:800;color:#FDE047;">
        — Akshita Sahu • Let's build together.
      </p>
    </div>
  </div>

  <script>
    window.onload = function() {
      // Auto trigger print dialog
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
