export const HERO = {
  title: 'A field guide to coding with agents.',
  lead: 'Small, friendly tools I build for the moments an agent gets stuck.',
  bubble: "hi, I'm Zanuar",
  avatarAlt: 'Illustration of Zanuar',
} as const;

export type GuideEntry = {
  number: number;
  title: string;
  meta: string;
  href: string;
  isProject?: boolean;
};

export const GUIDE_ENTRIES: readonly GuideEntry[] = [
  {
    number: 1,
    title: 'When a provider goes down',
    meta: 'ZRouter',
    href: '#zrouter',
    isProject: true,
  },
  {
    number: 2,
    title: 'When it forgets how you work',
    meta: 'Agent skills',
    href: '#skills',
  },
  {
    number: 3,
    title: 'When it can’t reach your tools',
    meta: 'Plugins and MCP',
    href: '#plugins',
  },
  {
    number: 4,
    title: 'When the same steps repeat',
    meta: 'CLI tools',
    href: '#cli',
  },
  {
    number: 5,
    title: "When one agent isn't enough",
    meta: 'herdr-rig',
    href: '#herdr',
  },
];

export type ToolTag = 'Idea' | 'Open source';

export type ToolCard = {
  id: string;
  number: number;
  title: string;
  tag: ToolTag;
  body: string;
  bodyMobile: string;
  visual: 'skills' | 'plugins' | 'cli' | 'herdr';
};

export const TOOL_CARDS: readonly ToolCard[] = [
  {
    id: 'skills',
    number: 2,
    title: 'When it forgets how you work.',
    tag: 'Idea',
    body: 'Agent skills that write your habits down once. First ideas: one that learns a repo’s conventions, one that reviews a diff before you commit.',
    bodyMobile:
      'Agent skills: one that learns a repo’s conventions, one that reviews a diff before you commit.',
    visual: 'skills',
  },
  {
    id: 'plugins',
    number: 3,
    title: 'When it can’t reach your tools.',
    tag: 'Idea',
    body: 'Claude Code plugins and MCP servers. First ideas: a ZRouter plugin that shows which provider answered and what it cost, and an issue-to-branch server.',
    bodyMobile:
      'Plugins and MCP: a ZRouter plugin that shows which provider answered and what it cost, and an issue-to-branch server.',
    visual: 'plugins',
  },
  {
    id: 'cli',
    number: 4,
    title: 'When the same steps repeat.',
    tag: 'Idea',
    body: 'Small command-line tools. First ideas: one that sums up what the agent changed, one that packs repo context for a prompt.',
    bodyMobile:
      'CLI tools: one that sums up what the agent changed, one that packs repo context for a prompt.',
    visual: 'cli',
  },
  {
    id: 'herdr',
    number: 5,
    title: "When one agent isn't enough.",
    tag: 'Open source',
    body: 'herdr-rig: one manager agent writes tickets, hands them to worker and reviewer agents, and shows them on a board in Herdr.',
    bodyMobile:
      'herdr-rig: one manager agent hands tickets to workers and reviewers, on a board in Herdr.',
    visual: 'herdr',
  },
];

export const ZROUTER = {
  number: '1',
  status: 'In the works',
  title: 'When a provider goes down.',
  lead: 'Your agent is halfway through a task when the provider starts failing. ZRouter, the one I’m building now, hands the request to the next provider and keeps the context and cache it already had.',
  leadMobile:
    'ZRouter, the one I’m building now, hands the request to the next provider and keeps the context and cache it already had.',
  features: [
    'Local gateways, first-class',
    'OpenAI and Anthropic APIs',
    'Cache-aware routing',
    'Fallback and round robin',
    'Request telemetry',
    'Built-in dashboard',
  ],
} as const;

export const ABOUT = {
  title: 'Who’s writing this guide.',
  body: 'I started in software and quality engineering, where I learned to care about the things that break. These days I build tools for coding with agents, and I share them here as they ship.',
} as const;
