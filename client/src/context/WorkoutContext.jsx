import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

const WorkoutContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DAYS_OF_WEEK = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

export const WorkoutProvider = ({ children }) => {
  // Determine current day of week as default
  const todayIndex = new Date().getDay();
  const currentDayName = DAYS_OF_WEEK[todayIndex] || 'MONDAY';

  const [activeDay, setActiveDay] = useState(currentDayName);
  const [weeklyOverview, setWeeklyOverview] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [isLoadingWorkout, setIsLoadingWorkout] = useState(true);

  // 12-Week Winter Arc Training Level (1. Beginner, 2. Intermediate, 3. Advance)
  const [trainingLevel, setTrainingLevel] = useState(() => {
    return localStorage.getItem('winter_arc_level') || 'intermediate';
  });

  // Persistent Local Athlete State (No mandatory login required!)
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('winter_arc_completed_days')) || [];
    } catch {
      return [];
    }
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem('winter_arc_streak')) || 0;
  });

  const [dayLogs, setDayLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('winter_arc_day_logs')) || {};
    } catch {
      return {};
    }
  });

  const [exerciseBests, setExerciseBests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('winter_arc_prs')) || {};
    } catch {
      return {};
    }
  });

  // Modals & Panels
  const [selectedFormGuide, setSelectedFormGuide] = useState(null);
  const [isGymToolsOpen, setIsGymToolsOpen] = useState(false);
  const [gymToolsActiveTab, setGymToolsActiveTab] = useState('1rm');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Rest Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restSeconds, setRestSeconds] = useState(90);
  const [initialRestDuration, setInitialRestDuration] = useState(90);
  const [isTimerMinimized, setIsTimerMinimized] = useState(false);
  const timerIntervalRef = useRef(null);

  // Synthesize Web Audio API Athletic Chime
  const playChimeSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const playTone = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      playTone(587.33, now, 0.15); // D5
      playTone(880.0, now + 0.2, 0.15); // A5
      playTone(1174.66, now + 0.4, 0.4); // D6
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }, []);

  // Timer Tick Hook
  useEffect(() => {
    if (isTimerRunning && restSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setRestSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            playChimeSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, restSeconds, playChimeSound]);

  const startRestTimer = (seconds = 90) => {
    setInitialRestDuration(seconds);
    setRestSeconds(seconds);
    setIsTimerRunning(true);
    setIsTimerMinimized(false);
  };

  const pauseRestTimer = () => setIsTimerRunning(false);
  const resumeRestTimer = () => { if (restSeconds > 0) setIsTimerRunning(true); };
  const resetRestTimer = (seconds = initialRestDuration) => {
    setIsTimerRunning(false);
    setRestSeconds(seconds);
  };

  // Confetti Animation Trigger
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2E7E', '#F43F5E', '#FB7185', '#FFFFFF'],
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }, []);

  // Copy link helper
  const copyGuideLink = useCallback(() => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } catch {
      // Fallback
    }
  }, []);

  // Change training level (beginner, intermediate, advance)
  const changeTrainingLevel = (lvl) => {
    setTrainingLevel(lvl);
    localStorage.setItem('winter_arc_level', lvl);
  };

  // Fetch weekly overview
  const fetchWeeklyOverview = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/workouts`);
      const data = await res.json();
      if (data.success) {
        setWeeklyOverview(data.data);
      }
    } catch (err) {
      console.error('[WorkoutContext] Overview fetch error:', err);
    }
  }, []);

  // Fetch detailed workout for selected day
  const fetchWorkout = useCallback(async (dayName) => {
    setIsLoadingWorkout(true);
    try {
      const res = await fetch(`${API_BASE}/workouts/${dayName}`);
      const data = await res.json();
      if (data.success) {
        setActiveWorkout({
          ...data.data,
          isLocked: false, // 100% Free & Open
        });
      }
    } catch (err) {
      console.error(`[WorkoutContext] Error loading ${dayName}:`, err);
    } finally {
      setIsLoadingWorkout(false);
    }
  }, []);

  // Log set locally and calculate PRs
  const logExerciseSets = (day, exerciseId, exerciseName, updatedSets) => {
    // Calculate best weight and reps
    let bestWeight = 0;
    let bestReps = 0;
    updatedSets.forEach((s) => {
      const w = Number(s.weightKg) || 0;
      const r = Number(s.reps) || 0;
      if (s.completed && w >= bestWeight) {
        bestWeight = w;
        bestReps = r;
      }
    });

    setDayLogs((prev) => {
      const next = {
        ...prev,
        [exerciseId]: {
          day,
          exerciseId,
          exerciseName,
          sets: updatedSets,
        },
      };
      localStorage.setItem('winter_arc_day_logs', JSON.stringify(next));
      return next;
    });

    if (bestWeight > 0) {
      setExerciseBests((prev) => {
        const next = {
          ...prev,
          [exerciseId]: { weightKg: bestWeight, reps: bestReps },
        };
        localStorage.setItem('winter_arc_prs', JSON.stringify(next));
        return next;
      });
    }
  };

  // Mark current day complete
  const markDayComplete = (dayName = activeDay) => {
    setCompletedDays((prev) => {
      if (!prev.includes(dayName)) {
        const next = [...prev, dayName];
        localStorage.setItem('winter_arc_completed_days', JSON.stringify(next));
        return next;
      }
      return prev;
    });

    setStreak((prev) => {
      const next = prev + 1;
      localStorage.setItem('winter_arc_streak', next.toString());
      return next;
    });

    triggerConfetti();
  };

  const selectDay = (dayName) => {
    setActiveDay(dayName.toUpperCase());
  };

  useEffect(() => {
    fetchWeeklyOverview();
  }, [fetchWeeklyOverview]);

  useEffect(() => {
    if (activeDay) {
      fetchWorkout(activeDay);
    }
  }, [activeDay, fetchWorkout]);

  return (
    <WorkoutContext.Provider
      value={{
        activeDay,
        selectDay,
        weeklyOverview,
        activeWorkout,
        isLoadingWorkout,
        trainingLevel,
        changeTrainingLevel,
        completedDays,
        streak,
        dayLogs,
        exerciseBests,
        logExerciseSets,
        markDayComplete,
        fetchWeeklyOverview,
        fetchWorkout,
        copyGuideLink,
        copyFeedback,
        // Form Guide Modal
        selectedFormGuide,
        openFormGuide: (exercise) => setSelectedFormGuide(exercise),
        closeFormGuide: () => setSelectedFormGuide(null),
        // Rest Timer
        isTimerRunning,
        restSeconds,
        initialRestDuration,
        isTimerMinimized,
        setIsTimerMinimized,
        startRestTimer,
        pauseRestTimer,
        resumeRestTimer,
        resetRestTimer,
        // Confetti
        triggerConfetti,
        // Gym tools
        isGymToolsOpen,
        gymToolsActiveTab,
        openGymTools: (tab = '1rm') => {
          setGymToolsActiveTab(tab);
          setIsGymToolsOpen(true);
        },
        closeGymTools: () => setIsGymToolsOpen(false),
        // Download / Lead modal
        isDownloadModalOpen,
        openDownloadModal: () => setIsDownloadModalOpen(true),
        closeDownloadModal: () => setIsDownloadModalOpen(false),
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkout must be used within a WorkoutProvider');
  return context;
};
