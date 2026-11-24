export const HERO = {
  title: 'A field guide to coding with agents.',
  lead: 'Small, friendly tools I build for the moments an agent gets stuck.',
  bubble: "hi, I'm Zanuar",
  avatarAlt: 'Illustration of Zanuar',
} as const;

export const GUIDE_SUMMARY =
  'Six moments that break a coding session, and the tools I build for them.';

export type GuideEntry = {
  number: number;
  title: string;
  meta: string;
  href: string;
  metaStyle?: 'accent' | 'tag';
};

export const GUIDE_ENTRIES: readonly GuideEntry[] = [
  {
    number: 1,
    title: 'When one agent isn’t enough',
    meta: 'zanuar-stack',
    href: '#zanuar-stack',
    metaStyle: 'accent',
  },
  {
    number: 2,
    title: 'When a provider goes down',
    meta: 'ZRouter',
    href: '#zrouter',
    metaStyle: 'tag',
  },
  {
    number: 3,
    title: 'When it forgets how you work',
    meta: 'Agent skills',
    href: '#skills',
  },
  {
    number: 4,
    title: 'When it can’t reach your tools',
    meta: 'Plugins and MCP',
    href: '#plugins',
  },
  {
    number: 5,
    title: 'When the same steps repeat',
    meta: 'CLI tools',
    href: '#cli',
  },
  {
    number: 6,
    title: 'When your team works in Herdr',
    meta: 'herdr-rig',
    href: '#herdr',
  },
];

export const ZANUAR_STACK = {
  label: '01 / OPEN SOURCE',
  title: 'When one agent isn’t enough.',
  name: 'zanuar-stack',
  pitch:
    'An open-source skill pack that gives coding agents clear roles, from a worker and reviewer on one ticket to a manager per repo for larger jobs.',
  diagramLabel: 'MULTI-REPO WORK',
  diagramDescription:
    'An orchestrator points one repo manager at each repo for multi-repo work. The manager coordinates a worker and a reviewer on one ticket.',
} as const;

export type ToolTag = 'Idea' | 'Open source';

export type ToolCard = {
  id: string;
  number: number;
  title: string;
  tag: ToolTag;
  body: string;
  bodyMobile: string;
  visual: 'skills' | 'plugins' | 'cli' | 'herdr';
  href?: string;
};

export const TOOL_CARDS: readonly ToolCard[] = [
  {
    id: 'skills',
    number: 3,
    title: 'When it forgets how you work.',
    tag: 'Idea',
    body: 'Agent skills that write your habits down once. First ideas: one that learns a repo’s conventions, one that reviews a diff before you commit.',
    bodyMobile:
      'Agent skills: one that learns a repo’s conventions, one that reviews a diff before you commit.',
    visual: 'skills',
  },
  {
    id: 'plugins',
    number: 4,
    title: 'When it can’t reach your tools.',
    tag: 'Idea',
    body: 'Claude Code plugins and MCP servers. First ideas: a ZRouter plugin that shows which provider answered and what it cost, and an issue-to-branch server.',
    bodyMobile:
      'Plugins and MCP: a ZRouter plugin that shows which provider answered and what it cost, and an issue-to-branch server.',
    visual: 'plugins',
  },
  {
    id: 'cli',
    number: 5,
    title: 'When the same steps repeat.',
    tag: 'Idea',
    body: 'Small command-line tools. First ideas: one that sums up what the agent changed, one that packs repo context for a prompt.',
    bodyMobile:
      'CLI tools: one that sums up what the agent changed, one that packs repo context for a prompt.',
    visual: 'cli',
  },
  {
    id: 'herdr',
    number: 6,
    title: 'When your team works in Herdr.',
    tag: 'Open source',
    body: 'herdr-rig gives a manager, workers and reviewers a shared workflow in Herdr.',
    bodyMobile:
      'herdr-rig coordinates tickets, workers and reviewers in a Herdr workspace.',
    visual: 'herdr',
    href: '/herdr-rig',
  },
];

export const ZROUTER = {
  number: '2',
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
