export type Metric = {
  label: string;
  value: string;
};

export type ArchitectureBranch = {
  label: string;
  detail: string;
};

export type Architecture = {
  entry: string;
  router: string;
  branches: ArchitectureBranch[];
  sink: string;
};

export type Project = {
  slug: string;
  title: string;
  status?: string;
  summary: string;
  stack: string[];
  problem: string;
  approach: string;
  architecture?: Architecture;
  architectureImage?: string;
  architectureAlt?: string;
  metrics?: Metric[];
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'qa-agent-platform',
    title: 'QA Agent Platform',
    status: 'Building: public demo, live soon',
    summary:
      'A public, scoped-down demo of an AI agent platform for QA I built at my company. Chat with a QA-tuned persona grounded in RAG, and get back more than text: the agent helps execute testing and generates test analysis as an interactive mindmap.',
    stack: ['LangGraph', 'LangChain', 'RAG', 'Pydantic', 'PostgreSQL', 'Markmap'],
    problem:
      'At my company, QA engineers were losing time to two things a chatbot alone doesn’t fix: answering the same requirements and coverage questions over and over, and turning test analysis into something a team will actually read instead of a wall of text. This case study is a public rebuild of that idea, scoped down and without the proprietary integrations (Notion publishing, Figma reads, internal MCP tools) that only make sense inside the company’s own stack.',
    approach:
      'The agent runs on a QA-tuned system prompt (a "QA soul"), grounded in RAG over a set of internal docs (requirements, test plans) embedded and stored in PostgreSQL. A LangGraph state machine routes each incoming message through a lightweight intent step, deciding whether the user wants a Q&A answer, a test-analysis breakdown, or a test run. For test analysis, the LLM\'s output is constrained to a Pydantic schema (structured nodes: title, coverage notes, risk level, children) before it ever reaches the UI, so a malformed response fails validation and gets regenerated instead of breaking the mindmap. Conversations and validated analyses are persisted in PostgreSQL, and the validated outline is rendered as an interactive mindmap with Markmap. Test-run requests trigger a tool call that executes the relevant test and folds the result back into the same conversation, so failures can be discussed in-thread instead of a separate log.',
    architecture: {
      entry: 'Chat message',
      router: 'Intent router (LangGraph)',
      branches: [
        {
          label: 'Q&A',
          detail: 'RAG retrieval over internal docs, grounded answer',
        },
        {
          label: 'Test analysis',
          detail: 'Pydantic-validated outline, rendered as a Markmap mindmap',
        },
        {
          label: 'Test run',
          detail: 'Tool call executes the test, result folds back into chat',
        },
      ],
      sink: 'PostgreSQL (conversations + analyses)',
    },
    demoUrl: undefined,
    githubUrl: undefined,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
