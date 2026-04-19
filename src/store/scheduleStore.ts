import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Sun … 6=Sat

export interface ScheduleEntry {
  id: string;
  label: string;            // user-visible name e.g. "صلاة الفجر"
  startHour: number;        // 0-23
  startMinute: number;      // 0-59
  durationMinutes: number;  // session length
  mode: string;             // study | work | sleep | deep_detox | custom
  days: DayOfWeek[];        // which days are active
  enabled: boolean;
}

export interface ScheduleStore {
  schedules: ScheduleEntry[];

  addSchedule: (entry: Omit<ScheduleEntry, 'id'>) => ScheduleEntry;
  updateSchedule: (id: string, patch: Partial<Omit<ScheduleEntry, 'id'>>) => void;
  deleteSchedule: (id: string) => void;
  toggleSchedule: (id: string) => void;

  /** Returns the next scheduled entry that will fire from now (within 7 days) */
  getNextSchedule: () => { entry: ScheduleEntry; firesAt: Date } | null;
}

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set, get) => ({
      schedules: [],

      addSchedule: (entry) => {
        const newEntry: ScheduleEntry = { ...entry, id: uuidv4() };
        set((s) => ({ schedules: [...s.schedules, newEntry] }));
        return newEntry;
      },

      updateSchedule: (id, patch) => {
        set((s) => ({
          schedules: s.schedules.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        }));
      },

      deleteSchedule: (id) => {
        set((s) => ({ schedules: s.schedules.filter((e) => e.id !== id) }));
      },

      toggleSchedule: (id) => {
        set((s) => ({
          schedules: s.schedules.map((e) =>
            e.id === id ? { ...e, enabled: !e.enabled } : e
          ),
        }));
      },

      getNextSchedule: () => {
        const now = new Date();
        const enabled = get().schedules.filter((e) => e.enabled && e.days.length > 0);

        let best: { entry: ScheduleEntry; firesAt: Date } | null = null;

        for (const entry of enabled) {
          for (let offset = 0; offset < 7; offset++) {
            const candidate = new Date(now);
            candidate.setDate(candidate.getDate() + offset);
            candidate.setHours(entry.startHour, entry.startMinute, 0, 0);

            const dow = candidate.getDay() as DayOfWeek;
            if (!entry.days.includes(dow)) continue;
            if (candidate <= now) continue; // already passed today

            if (!best || candidate < best.firesAt) {
              best = { entry, firesAt: candidate };
            }
            break; // closest day found for this entry
          }
        }

        return best;
      },
    }),
    {
      name: 'zeroescape-schedules',
    }
  )
);
