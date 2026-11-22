import type { ProjectAnalytics } from '../types';

/**
 * Google Analytics (Firebase) export for the RoboFiesta'26 site, 4 Oct – 3 Nov 2026.
 * Collection started on 4 Oct, so earlier days in the report are empty and are left out.
 */
export const robofiestaAnalytics: ProjectAnalytics = {
  period: '4 Oct – 3 Nov 2026',
  source: 'Google Analytics',
  startDate: '2026-10-04',
  headline: [
    { label: 'Monthly active users', value: '355' },
    { label: 'Sessions', value: '637' },
    { label: 'Avg. session', value: '5m 05s' },
    { label: 'Engagement rate', value: '71%' },
  ],
  // One entry per day from 4 Oct. `daily` = active users that day, `rolling` = 30-day active users.
  daily: [5, 1, 3, 1, 4, 1, 3, 5, 4, 4, 12, 197, 26, 13, 14, 6, 8, 5, 10, 10, 12, 15, 10, 6, 17, 14, 14, 10, 5, 14, 11],
  rolling: [5, 6, 9, 10, 13, 14, 17, 18, 20, 21, 26, 220, 232, 239, 244, 248, 253, 257, 264, 270, 278, 290, 296, 301, 314, 322, 330, 336, 339, 350, 355],
  launchDay: 11,
  channels: [
    { label: 'Direct', value: 379 },
    { label: 'Organic search', value: 203 },
    { label: 'Organic social', value: 24 },
    { label: 'AI assistants', value: 15 },
    { label: 'Referral', value: 13 },
  ],
  geo: {
    local: { label: 'Bengaluru', value: 286 },
    total: 356,
    cities: [
      { label: 'Bengaluru', value: 286 },
      { label: 'Mysuru', value: 6 },
      { label: 'Chennai', value: 5 },
      { label: 'Mumbai', value: 3 },
      { label: 'Pune', value: 3 },
    ],
    countries: 7,
  },
  // Average engagement time per active user, seconds, by week (weeks starting 8 Oct).
  engagement: [
    { label: '8 Oct', value: 123 },
    { label: '15 Oct', value: 195 },
    { label: '22 Oct', value: 96 },
    { label: '29 Oct', value: 117 },
    { label: '5 Nov*', value: 158 },
  ],
  engagementNote: '*Partial week, to 3 Nov.',
};
