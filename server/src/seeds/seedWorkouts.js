import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Workout } from '../models/Workout.js';

dotenv.config();

const workoutsData = [
  {
    day: 'MONDAY',
    dayNumber: 1,
    title: 'Glutes & Hamstrings',
    subtitle: 'Posterior Chain Hypertrophy & Strength',
    isPro: false,
    targetMuscles: ['Glutes', 'Hamstrings', 'Calves', 'Core'],
    estimatedDuration: '55–65 mins',
    intensity: 'High',
    description: 'High-tension posterior chain focus maximizing glute elongation, hamstring hinge mechanics, and hip power.',
    warmup: [
      {
        name: 'Push-Ups',
        setsReps: '10–15 Reps',
        notes: 'Activate chest, shoulders, and core stability before lower-body load.',
      },
      {
        name: 'Pull-Ups',
        setsReps: '10–15 Reps',
        notes: 'Engage lats and scapular depressors to reinforce spinal bracing.',
      },
      {
        name: 'Lower Body Dynamic Stretching',
        setsReps: '5–7 mins long',
        duration: '5–7 mins',
        notes: 'World’s greatest stretch, 90/90 hip flow, leg swings, and ankle mobility.',
      },
    ],
    exercises: [
      {
        id: 'mon-ex-1',
        name: 'Hip Abduction',
        category: 'Glutes',
        sets: 3,
        reps: '15–20 Reps',
        notes: 'Sit upright or lean slightly forward for deeper glute medius isolation. Hold peak contraction for 1 second.',
        youtubeVideoId: 'f9Vb8Z8w734',
        formCues: {
          setup: 'Sit firmly against pad with feet placed on pegs; hinge slightly at hips.',
          execution: 'Drive knees apart forcefully through glute medius, pause 1s at full extension.',
          breathing: 'Exhale as you push outward; inhale smoothly as pads return under control.',
        },
      },
      {
        id: 'mon-ex-2',
        name: 'Hip Thrust',
        category: 'Glutes',
        sets: 3,
        reps: 'Heavy Weight, Close to Failure',
        notes: 'Barbell or machine. Full hip extension at top with chin tucked to chest. 2–3 RIR on first two sets, true 0–1 RIR on final set.',
        youtubeVideoId: 'SEdqd1n0cvg',
        formCues: {
          setup: 'Upper back braced on bench just below shoulder blades, barbell centered across hip crease with pad.',
          execution: 'Drive through heels to full hip lockout; maintain posterior pelvic tilt and tucked chin.',
          breathing: 'Brace core deep before drive; exhale powerfully through the top third of movement.',
        },
      },
      {
        id: 'mon-ex-3',
        name: 'Sumo Squats',
        category: 'Glutes & Adductors',
        sets: 3,
        reps: '15–20 Reps',
        notes: 'Wide stance with toes flared 30–45 degrees. Dumbbell goblet or barbell. Squeeze glutes at top without hyperextending.',
        youtubeVideoId: '9ZuDXYJ6Bxs',
        formCues: {
          setup: 'Stance 1.5x shoulder width, toes pointed outward 35–45 degrees.',
          execution: 'Sit hips down between knees while driving knees outward in line with toes.',
          breathing: 'Inhale and brace diaphragm on descent; exhale pushing floor away through heels.',
        },
      },
      {
        id: 'mon-ex-4',
        name: 'Romanian Deadlift (RDL)',
        category: 'Hamstrings',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Soft knees, push hips backward like closing a car door with your butt until deep hamstring stretch is felt.',
        youtubeVideoId: 'JCXUYuzwNrM',
        formCues: {
          setup: 'Feet hip-width apart, double overhand or mixed grip, lats packed tight.',
          execution: 'Push hips backward with soft knees, barbell skimming shins until stretch at mid-shin.',
          breathing: 'Inhale deep into abdomen before hinging; exhale at top as hips lock in neutral.',
        },
      },
      {
        id: 'mon-ex-5',
        name: 'Lying Leg Curl',
        category: 'Hamstrings',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Keep hips pressed into pad. Control the eccentric for 3 slow seconds.',
        youtubeVideoId: '1Tq3QdYUuHs',
        formCues: {
          setup: 'Pad positioned just below calf muscles above Achilles; grip handles firmly.',
          execution: 'Curl heels toward glutes without lifting hips off pad; squeeze hamstrings at peak.',
          breathing: 'Exhale during curl; inhale on the controlled 3-second lowering phase.',
        },
      },
      {
        id: 'mon-ex-6',
        name: 'Calf Raises',
        category: 'Calves',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Standing or seated. Pause 2 seconds at the bottom for full stretch and 1 second at full peak.',
        youtubeVideoId: '3UWi44Tx3DA',
        formCues: {
          setup: 'Balls of feet on block, balls of big toes driving weight, neutral ankles.',
          execution: 'Sink heel into deep stretch for 2s, explode onto big toe knuckles for 1s squeeze.',
          breathing: 'Exhale as you rise up; inhale on controlled descent.',
        },
      },
    ],
  },
  {
    day: 'TUESDAY',
    dayNumber: 2,
    title: 'Quads',
    subtitle: 'Anterior Chain Hypertrophy & Knee Flexion',
    isPro: false,
    targetMuscles: ['Quadriceps', 'Calves', 'Core'],
    estimatedDuration: '50–60 mins',
    intensity: 'High',
    description: 'High quad volume workout designed to build tear-drop definition and quad sweep with controlled tempo.',
    warmup: [
      {
        name: 'Push-Ups',
        setsReps: '10–15 Reps',
        notes: 'Activate upper torso and serratus anterior.',
      },
      {
        name: 'Pull-Ups',
        setsReps: '10–15 Reps',
        notes: 'Decompress spine and activate posterior stabilizers.',
      },
    ],
    exercises: [
      {
        id: 'tue-ex-1',
        name: 'Leg Press',
        category: 'Quadriceps',
        sets: 4,
        reps: '12–15 Reps',
        notes: 'Feet low to mid platform hip-width apart for maximal quad bias. Do not lock knees at top.',
        youtubeVideoId: 'IZxyjW7MPJQ',
        formCues: {
          setup: 'Low-to-mid foot placement on sled, lower back flush against lumbar backpad.',
          execution: 'Lower carriage under control until knees reach 90 degrees; press through midfoot.',
          breathing: 'Inhale deep on descent; exhale pushing carriage up, stopping just short of knee lockout.',
        },
      },
      {
        id: 'tue-ex-2',
        name: 'Leg Extension',
        category: 'Quadriceps',
        sets: 3,
        reps: '12–15 Reps (Last Set to Failure)',
        notes: 'Keep hips down in seat. Final set: drop weight by 30% and perform 5 partial pulses to failure.',
        youtubeVideoId: 'YyvSfVjQeL0',
        formCues: {
          setup: 'Pivot point aligned with knee joints, shin pad resting just above ankle joint.',
          execution: 'Extend knees fully, locking quadriceps at top for a 1-second squeeze.',
          breathing: 'Exhale on kick up; inhale on a slow 3-second negative descent.',
        },
      },
      {
        id: 'tue-ex-3',
        name: 'Seated Leg Curl',
        category: 'Hamstrings',
        sets: 3,
        reps: '12–15 Reps (Last Set to Failure)',
        notes: 'Seated curl places hamstrings in a lengthened position for superior muscle damage and growth.',
        youtubeVideoId: 'ELOCsoDSmrg',
        formCues: {
          setup: 'Thigh clamp firmly locked down against quads to prevent pelvis rising.',
          execution: 'Sweep heels smoothly under seat, flexing hamstrings fully before slow return.',
          breathing: 'Exhale as you flex knees; inhale as legs return to start.',
        },
      },
      {
        id: 'tue-ex-4',
        name: 'Lunges',
        category: 'Quadriceps & Glutes',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Walking lunges or reverse lunges with dumbbells. Maintain an upright torso for quad bias.',
        youtubeVideoId: 'QOVaHwm-Q6U',
        formCues: {
          setup: 'Hold dumbbells by sides, tall chest, core braced.',
          execution: 'Step forward or back, sinking rear knee an inch off ground with front knee at 90 degrees.',
          breathing: 'Inhale dropping down; exhale driving through front midfoot to return.',
        },
      },
      {
        id: 'tue-ex-5',
        name: 'Calf Raises',
        category: 'Calves',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Pause at bottom of every rep to eliminate Achilles tendon elastic rebound.',
        youtubeVideoId: '3UWi44Tx3DA',
        formCues: {
          setup: 'Standing calf machine or leg press toe press. Shoulders locked.',
          execution: 'Slow 3-second descent into full calf stretch; explosive calf raise to peak.',
          breathing: 'Exhale at top contraction; inhale on stretch.',
        },
      },
    ],
  },
  {
    day: 'WEDNESDAY',
    dayNumber: 3,
    title: 'Back',
    subtitle: 'V-Taper Width & Upper Back Density',
    isPro: true,
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Traps', 'Rear Delts'],
    estimatedDuration: '50–60 mins',
    intensity: 'High',
    description: 'Complete back day targeting lat width, mid-back thickness, rhomboid retraction, and upper trap power.',
    warmup: [
      {
        name: 'Push-Ups',
        setsReps: '10–15 Reps',
        notes: 'Warm up shoulders and chest stabilizers.',
      },
      {
        name: 'Pull-Ups',
        setsReps: '10–15 Reps',
        notes: 'Strict bodyweight pull-ups focusing on lat activation at the bottom.',
      },
    ],
    exercises: [
      {
        id: 'wed-ex-1',
        name: 'Lat Pulldown',
        category: 'Lats',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Overhand medium-wide grip. Pull elbows down and slightly back into side pockets.',
        youtubeVideoId: 'CAwf7n6Luuc',
        formCues: {
          setup: 'Thighs locked tight under pads, hands slightly outside shoulder width.',
          execution: 'Lead with elbows pulling to upper chest; arch upper spine slightly.',
          breathing: 'Exhale driving bar down; inhale allowing arms to stretch all the way up.',
        },
      },
      {
        id: 'wed-ex-2',
        name: 'Bent-Over Row / T-Bar Row',
        category: 'Upper Back & Lats',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Maintain a 45-degree hip hinge with flat spine. Pull bar to lower ribs.',
        youtubeVideoId: 'FWJR5Ve8gkQ',
        formCues: {
          setup: 'Torso hinged at 45 degrees, chest up, neutral neck alignment.',
          execution: 'Row load toward navel, pinching shoulder blades together at peak.',
          breathing: 'Inhale at bottom hang; exhale pulling elbows back through torso.',
        },
      },
      {
        id: 'wed-ex-3',
        name: 'Seated Cable Row',
        category: 'Mid Back',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Use close-grip V-handle. Avoid rocking backwards; keep core locked.',
        youtubeVideoId: 'GZbfZ033fbo',
        formCues: {
          setup: 'Feet planted on footplates, knees slightly bent, spine vertical.',
          execution: 'Pull handle into belly button while rolling shoulders back and down.',
          breathing: 'Exhale as handle touches abdomen; inhale during controlled forward stretch.',
        },
      },
      {
        id: 'wed-ex-4',
        name: 'Reverse Lat Pulldown',
        category: 'Lower Lats & Biceps',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Underhand (supinated) shoulder-width grip for tremendous lower lat elongation and leverage.',
        youtubeVideoId: 'VprlTxpBqgg',
        formCues: {
          setup: 'Underhand shoulder-width grip, torso upright with subtle lean.',
          execution: 'Pull elbows directly down into hips, squeezing lats hard at bottom.',
          breathing: 'Exhale pulling down; inhale on full reach overhead.',
        },
      },
      {
        id: 'wed-ex-5',
        name: 'Shrugs',
        category: 'Traps',
        sets: 3,
        reps: '8–12 Reps (Last Set to Failure)',
        notes: 'Dumbbells or barbell. Straight up and down without rolling shoulders. Pause 2s at top.',
        youtubeVideoId: 'cJRVVxmytaM',
        formCues: {
          setup: 'Heavy dumbbells by sides or barbell in front, standing erect.',
          execution: 'Elevate scapulae straight toward ears like saying "I don\'t know", pause 2s.',
          breathing: 'Exhale as you shrug up; inhale letting weight stretch traps at bottom.',
        },
      },
    ],
  },
  {
    day: 'THURSDAY',
    dayNumber: 4,
    title: 'Arms',
    subtitle: 'Biceps, Forearms & Triceps Gun Show',
    isPro: true,
    targetMuscles: ['Biceps', 'Brachialis', 'Forearms', 'Triceps Long & Lateral Heads'],
    estimatedDuration: '55–65 mins',
    intensity: 'High',
    description: 'High-density arm blast grouping biceps, grip/forearms, and triceps with focused peak contraction.',
    warmup: [
      {
        name: 'Push-Ups',
        setsReps: '10–15 Reps',
        notes: 'Warm up elbow joints, chest, and anterior delts.',
      },
      {
        name: 'Pull-Ups',
        setsReps: '10–15 Reps',
        notes: 'Prime biceps brachii and brachialis via vertical pull.',
      },
    ],
    exercises: [
      {
        id: 'thu-ex-1',
        name: 'Dumbbell Curls',
        category: 'Biceps',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Supinate wrists as you curl upward so palms face ceiling at peak.',
        youtubeVideoId: 'sAq_ocpRh_I',
        formCues: {
          setup: 'Stand tall with dumbbells at sides, elbows pinned against ribcage.',
          execution: 'Curl weight while rotating pinky toward outside of shoulder for full supination.',
          breathing: 'Exhale on curl; inhale on 3-second descent.',
        },
      },
      {
        id: 'thu-ex-2',
        name: 'Hammer Curls',
        category: 'Biceps & Brachialis',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Neutral palms-facing-in grip to build arm thickness and brachioradialis.',
        youtubeVideoId: 'zC3nLlEvin4',
        formCues: {
          setup: 'Palms facing each other, wrists locked rigid, elbows stationary.',
          execution: 'Curl dumbbells upward like swinging a hammer, squeeze at collarbone level.',
          breathing: 'Exhale curling; inhale smoothly on return.',
        },
      },
      {
        id: 'thu-ex-3',
        name: 'Preacher Curls',
        category: 'Biceps (Short Head)',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'EZ-Bar or machine. Eliminate all body momentum with armpits snug against pad.',
        youtubeVideoId: 'fIWP-FRFNU0',
        formCues: {
          setup: 'Triceps flat against preacher pad, underhand grip on inner angled bar.',
          execution: 'Curl until forearms are vertical; lower slowly until arms are nearly straight.',
          breathing: 'Exhale on lift; inhale on lowering.',
        },
      },
      {
        id: 'thu-ex-4',
        name: 'Reverse Cable Curls',
        category: 'Forearms & Brachialis',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Pronated (overhand) grip on straight bar or EZ-bar attached to low cable.',
        youtubeVideoId: 'nRgxYX2Ve9w',
        formCues: {
          setup: 'Overhand knuckles-up grip on low cable bar.',
          execution: 'Keep wrists flat without bending backward; curl to 90+ degrees.',
          breathing: 'Exhale up; inhale down.',
        },
      },
      {
        id: 'thu-ex-5',
        name: 'Dumbbell Wrist Curls',
        category: 'Forearms',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Forearms resting on flat bench or knees, curl wrists upward.',
        youtubeVideoId: '3VOUl_f4370',
        formCues: {
          setup: 'Forearms supported on flat bench, palms face ceiling, wrists hanging over edge.',
          execution: 'Open fingers slightly to roll dumbbell down, curl back up with wrist flexors.',
          breathing: 'Smooth rhythmic breathing throughout reps.',
        },
      },
      {
        id: 'thu-ex-6',
        name: 'Cable Pushdowns',
        category: 'Triceps',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Rope or V-bar. Flare rope apart at bottom for lateral head lockout.',
        youtubeVideoId: '2-LAMcpzODU',
        formCues: {
          setup: 'Elbows tucked by sides, hinge slightly at hips, eyes forward.',
          execution: 'Push hands straight down, locking triceps hard for 1 second.',
          breathing: 'Exhale pushing down; inhale allowing forearms to come up to parallel.',
        },
      },
      {
        id: 'thu-ex-7',
        name: 'Weighted Bench Dips',
        category: 'Triceps',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Hands on bench behind hips, feet elevated on second bench or floor. Add plate across lap if bodyweight is easy.',
        youtubeVideoId: '0326dy_-CzM',
        formCues: {
          setup: 'Hands shoulder-width apart on bench edge, knuckles forward, torso upright.',
          execution: 'Lower body until elbows hit 90 degrees; press through palms to lock out triceps.',
          breathing: 'Inhale on descent; exhale pushing up.',
        },
      },
      {
        id: 'thu-ex-8',
        name: 'Cable Overhead Triceps Extensions',
        category: 'Triceps (Long Head)',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Rope attached to high cable, step forward and hinge, extending overhead for deep long head stretch.',
        youtubeVideoId: 'ns-rgcz8vII',
        formCues: {
          setup: 'Staggered stance, torso hinged forward at 45 degrees, rope held behind head.',
          execution: 'Extend elbows straight forward and overhead, flaring rope apart at lockout.',
          breathing: 'Exhale on extension; inhale on deep stretch behind neck.',
        },
      },
    ],
  },
  {
    day: 'FRIDAY',
    dayNumber: 5,
    title: 'Rest & Recovery Day',
    subtitle: 'Active Tissue Repair & Nervous System Reset',
    isPro: false,
    targetMuscles: ['Cardiovascular', 'Mobility', 'Central Nervous System'],
    estimatedDuration: 'All Day Habit Tracking',
    intensity: 'Low',
    description: 'Active rest day to optimize muscular recovery, clear metabolic byproducts, rehydrate tissues, and prep for the weekend push.',
    warmup: [],
    exercises: [],
    recoveryChecklist: [
      {
        id: 'fri-chk-1',
        title: '8,000–10,000 Steps Tracker',
        target: '10,000 Steps',
        description: 'Low-intensity outdoor walking or treadmill stroll to promote lymphatic drainage without CNS fatigue.',
        icon: 'footprints',
      },
      {
        id: 'fri-chk-2',
        title: '3.5L Daily Hydration Tracker',
        target: '3.5 Liters Water',
        description: 'Drink mineralized water with pink Himalayan salt and electrolytes to rehydrate muscle glycogen.',
        icon: 'droplets',
      },
      {
        id: 'fri-chk-3',
        title: 'Foam Rolling & Mobility Routine',
        target: '15–20 Mins',
        description: 'Foam roll quads, lats, glutes, and thoracic spine. Perform 10 cat-cows and 90/90 hip stretches.',
        icon: 'activity',
      },
      {
        id: 'fri-chk-4',
        title: 'Deep Rest & Sleep Quality Log',
        target: '8+ Hours Sleep',
        description: 'Maintain a dark, cold sleep sanctuary (18°C) with no blue light screens 60 minutes before bed.',
        icon: 'moon',
      },
    ],
  },
  {
    day: 'SATURDAY',
    dayNumber: 6,
    title: 'Legs & Shoulders',
    subtitle: 'Quad Hypertrophy & 3D Deltoid Boulder Build',
    isPro: true,
    targetMuscles: ['Quadriceps', 'Anterior Deltoids', 'Lateral Deltoids', 'Traps'],
    estimatedDuration: '60–70 mins',
    intensity: 'High',
    description: 'High-intensity session attacking quad volume followed by 3D shoulder sculpting and heavy trap shrugs.',
    warmup: [
      {
        name: 'Push-Ups',
        setsReps: '10–15 Reps',
        notes: 'Activate chest, front deltoids, and serratus.',
      },
      {
        name: 'Pull-Ups',
        setsReps: '10–15 Reps',
        notes: 'Prime upper back and posture for heavy pressing.',
      },
    ],
    exercises: [
      {
        id: 'sat-ex-1',
        name: 'Leg Extensions',
        category: 'Legs — Quad Focus',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Prime the knee joint and flood quads with blood before squats.',
        youtubeVideoId: 'YyvSfVjQeL0',
        formCues: {
          setup: 'Seat aligned so knees pivot exactly with the machine axis.',
          execution: 'Kick up smoothly, pausing for 1 full second at top contraction.',
          breathing: 'Exhale extending; inhale lowering under control.',
        },
      },
      {
        id: 'sat-ex-2',
        name: 'Sumo Squats',
        category: 'Legs — Quad Focus',
        sets: 3,
        reps: '15–20 Reps (Use lighter weight & focus on proper form)',
        notes: 'Use a lighter weight and focus on strict form, depth, and quad/inner-thigh squeeze.',
        youtubeVideoId: '9ZuDXYJ6Bxs',
        formCues: {
          setup: 'Wide stance, toes angled outward 30–45 degrees, chest proudly lifted.',
          execution: 'Squat between hips, tracking knees in line with second toes to parallel.',
          breathing: 'Inhale down; exhale pushing through heels to stand.',
        },
      },
      {
        id: 'sat-ex-3',
        name: 'Dumbbell Shoulder Press',
        category: 'Shoulders',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Slight bench incline (75–80 degrees) reduces impingement on shoulder capsule.',
        youtubeVideoId: 'qEwKCR5JCog',
        formCues: {
          setup: 'Dumbbells at ear level, elbows angled slightly in scapular plane (30 degrees).',
          execution: 'Press overhead in an arc until bells nearly touch; lower to ear level.',
          breathing: 'Inhale lowering; exhale pressing forcefully overhead.',
        },
      },
      {
        id: 'sat-ex-4',
        name: 'Dumbbell Lateral Raises',
        category: 'Shoulders',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Lead with elbows. Lean slightly forward to hit lateral head with pinpoint precision.',
        youtubeVideoId: '3VcKaXpzqRo',
        formCues: {
          setup: 'Slight forward torso lean (10 degrees), dumbbells resting in front of thighs.',
          execution: 'Raise arms out to sides leading with elbows up to parallel with shoulders.',
          breathing: 'Exhale raising outward; inhale lowering slowly for 2 seconds.',
        },
      },
      {
        id: 'sat-ex-5',
        name: 'Dumbbell Front Raises',
        category: 'Shoulders',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Neutral or overhand grip. Do not swing hips for momentum.',
        youtubeVideoId: '-t7fuZ0KhDA',
        formCues: {
          setup: 'Stand tall with core braced, dumbbells resting across quads.',
          execution: 'Raise weights in front to eye level without arching back.',
          breathing: 'Exhale lifting; inhale lowering.',
        },
      },
      {
        id: 'sat-ex-6',
        name: 'Upright Rows',
        category: 'Shoulders & Traps',
        sets: 3,
        reps: '12–15 Reps',
        notes: 'Dumbbells or wide-grip EZ bar. Pull to lower chest with elbows high.',
        youtubeVideoId: 'amCU-ziHITM',
        formCues: {
          setup: 'Grip slightly wider than shoulder width to protect rotator cuffs.',
          execution: 'Pull load up along torso, elbows leading the movement higher than hands.',
          breathing: 'Exhale pulling up; inhale on smooth release.',
        },
      },
      {
        id: 'sat-ex-7',
        name: 'Shrugs',
        category: 'Traps',
        sets: 3,
        reps: '8–12 Reps (Heavy but controlled, close to failure)',
        notes: 'Heavy but strictly controlled. No rolling shoulders. True near-failure load.',
        youtubeVideoId: 'cJRVVxmytaM',
        formCues: {
          setup: 'Barbell or heavy dumbbells at sides, arms extended.',
          execution: 'Elevate shoulders directly toward ears, holding 2 seconds at the peak.',
          breathing: 'Exhale shrugging up; inhale lowering with control.',
        },
      },
    ],
  },
  {
    day: 'SUNDAY',
    dayNumber: 7,
    title: 'Rest & Recovery',
    subtitle: 'Weekly Review, Analytics & Fuel Strategy',
    isPro: false,
    targetMuscles: ['Whole Body Restoration', 'Nutrition', 'Mental Prep'],
    estimatedDuration: 'Review & Meal Prep',
    intensity: 'Low',
    description: 'Weekly training volume recap, soreness and readiness assessment, plus meal prep and macro planning for the upcoming cycle.',
    warmup: [],
    exercises: [],
    recoveryChecklist: [
      {
        id: 'sun-chk-1',
        title: 'Weekly Volume & PR Audit',
        target: 'Review 6-Day Log',
        description: 'Examine sets completed, total tonnage lifted, and plan progressive overload increments for next week.',
        icon: 'bar-chart',
      },
      {
        id: 'sun-chk-2',
        title: 'High-Protein Meal Prep',
        target: '3 Days Ahead',
        description: 'Batch-cook lean proteins (chicken, paneer, tofu, eggs) and complex carbs (rice, oats, sweet potatoes).',
        icon: 'utensils',
      },
      {
        id: 'sun-chk-3',
        title: 'Readiness & Soreness Check-In',
        target: 'Score 1–10',
        description: 'Self-evaluate joint health, sleep debt, and muscle recovery status before starting Monday’s leg session.',
        icon: 'heart-pulse',
      },
    ],
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/workoutpro';

    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log('[Seed] Connected to MongoDB!');

    console.log('[Seed] Clearing existing workouts...');
    await Workout.deleteMany({});

    console.log('[Seed] Inserting 7-day workout split...');
    const inserted = await Workout.insertMany(workoutsData);

    console.log(`[Seed] Successfully seeded ${inserted.length} workout days!`);
    inserted.forEach((w) => {
      console.log(` - Day ${w.dayNumber}: ${w.day} (${w.title}) [${w.isPro ? 'PRO LOCKED' : 'FREE'}]`);
    });

    await mongoose.disconnect();
    console.log('[Seed] Database connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

seedDB();
