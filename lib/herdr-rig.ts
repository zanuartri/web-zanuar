import { SOCIAL_LINKS } from '@/lib/site';

export const HERDR_RIG = {
  hero: {
    backLabel: 'Back to the guide',
    backHref: '/#guide',
    tag: 'Open source · MIT',
    title: 'herdr-rig',
    lead: 'One manager agent, many coding agents, one terminal workspace. You talk to one session; it does the juggling.',
    leadMobile: 'One manager agent, many coding agents, one terminal workspace.',
    primary: { label: 'Get it on GitHub', href: SOCIAL_LINKS.github },
    secondary: { label: 'See how it works', href: '#how' },
  },
  demo: {
    src: '/herdr-rig/hero-1184.webp',
    src2x: '/herdr-rig/hero-1658.webp',
    src2xWidth: 1658,
    width: 1184,
    height: 743,
    /* Below 768 the frame shows board-app.png instead of hero.png. */
    mobileSrc: '/herdr-rig/board-820.webp',
    alt: 'The herdr-rig board in the herdr desktop app: tickets grouped by what they need, each with its worker harness and model',
  },
  promises: {
    heading: 'What it does for you.',
    items: [
      {
        title: 'You talk to one session.',
        body: 'The manager turns a request into tickets with a goal, checks and verify commands, then hands them out.',
        bodyMobile: 'The manager turns a request into tickets and hands them out.',
      },
      {
        title: 'Any harness, any role.',
        body: 'Claude Code, Codex, opencode, pi, omp or Command Code, each with its own model. A cheap worker, a reviewer from another family.',
        bodyMobile:
          'Claude Code, Codex, opencode, pi, omp or Command Code, each with its own model.',
      },
      {
        title: 'Nothing to babysit.',
        body: 'Each ticket gets its own worktree. Workers report back on their own, and a watcher speaks up when one goes quiet.',
        bodyMobile:
          'Own worktree per ticket. A watcher speaks up when an agent goes quiet.',
      },
    ],
  },
  callout: {
    heading: 'Why a manager?',
    body: 'Running several agents at once is easy. Keeping track of them is not: which one is stuck on a question, did the review pass, whose branch is safe to merge. I kept losing that thread, so I gave the job to one agent.',
    bodyMobile:
      'Running several agents at once is easy. Keeping track of them is not, so I gave the job to one agent.',
    listLabel: 'What it takes off your hands',
    items: [
      'Splitting one request into tickets',
      'Queuing work that waits on other tickets',
      'One review per ticket, not two',
      'Closing panes and worktrees once merged',
    ],
  },
  steps: {
    heading: 'How it works.',
    items: [
      {
        title: 'Install it once.',
        body: 'bun link, then rig install copies the skills into every agent it finds, and the board into the herdr app.',
      },
      {
        title: 'Start the manager.',
        body: 'Open your agent in a herdr pane and run the rig-manager skill. It asks your setup once and remembers.',
      },
      {
        title: 'Ask in plain words.',
        body: 'Workers and reviewers open beside you. Watch them, type into them, or let them run headless.',
      },
    ],
    worksWithLabel: 'Works with',
    worksWith: ['Claude Code', 'Codex', 'opencode', 'pi, omp, Command Code'],
  },
  board: {
    heading: 'Everything on one board.',
    body: 'Tickets grouped by what they need from you: Needs you, Working, Ready, Queued, Done. Click Open to jump to an agent’s pane, and a toast tells you when something needs you.',
    src: '/herdr-rig/board-820.webp',
    width: 1184,
    height: 679,
    alt: 'The rig board showing Working and Queued tickets, each with its worker harness and model',
  },
  tested: {
    heading: 'What’s tested.',
    items: [
      { label: 'Workers, all six harnesses', status: 'Tested' },
      { label: 'Manager in the herdr desktop app', status: 'Tested' },
      { label: 'Watcher, board and cleanup', status: 'Tested' },
      { label: 'merge pr and auto-merge, end to end', status: 'Not yet' },
      { label: 'Driving panes by hand on macOS and Linux', status: 'Reports welcome' },
    ],
    itemsMobile: [
      { label: 'Workers, all six harnesses', status: 'Tested' },
      { label: 'Watcher, board and cleanup', status: 'Tested' },
      { label: 'merge pr and auto-merge', status: 'Not yet' },
      { label: 'Reports from macOS and Linux', status: 'Welcome' },
    ],
  },
} as const;
