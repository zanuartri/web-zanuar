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

export type EngineeringDecision = {
  decision: string;
  reason: string;
};

export type Project = {
  slug: string;
  title: string;
  status?: string;
  summary: string;
  stack: string[];
  problem: string;
  approach: string;
  screenshotUrl?: string;
  screenshotAlt?: string;
  decisions?: EngineeringDecision[];
  architecture?: Architecture;
  architectureImage?: string;
  architectureAlt?: string;
  metrics?: Metric[];
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'qa-dashboard',
    title: 'QA Automation Test',
    status: 'Live: public demo',
    summary:
      'A cross-stack QA automation test-health dashboard aggregating results from seven independent test repos, Playwright, Selenium, Cypress, Cucumber BDD, and API testing, across Python and TypeScript. Each repo posts its own results to a small authenticated webhook right after CI runs, and the dashboard renders whatever is on disk, no rebuild, no redeploy, no polling.',
    stack: ['Next.js', 'TypeScript', 'Playwright', 'Selenium', 'Cypress', 'Cucumber', 'GitHub Actions', 'Docker', 'Traefik'],
    problem:
      'Seven independent QA automation repos across five frameworks and two languages produce seven different places to check whether anything is actually passing. There was no single view of cross-stack health, and CI logs are not something anyone, including me, checks regularly. A pass/fail regression in one stack could sit unnoticed for days.',
    approach:
      'A standardized results.json schema (stack, platform, pass/fail/skip counts, per-test detail) is shared across all seven repos. Each repo\'s CI workflow posts its results to a small authenticated webhook (POST /api/results/[stack]) right after every run, one bearer token per stack, compared with a timing-safe hash so a leaked token can only overwrite that one stack\'s file, never the git repo or any other stack. The dashboard itself is a Next.js app that reads results/*.json fresh on every request instead of baking data in at build time, groups cards by platform (web, API, with a mobile section ready for Appium/Maestro), color-codes by pass rate, and shows a per-test detail modal on demand. Adding a new stack later is just a new JSON file and a webhook call, no dashboard code changes.',
    decisions: [
      {
        decision: 'A scoped webhook token, not a git-push PAT.',
        reason:
          'Each source repo gets its own per-stack token that can only write one results file. A leaked token cannot touch the dashboard repo, other stacks, or anything else on the VPS, a narrower blast radius than the git-PAT-with-repo-write-access alternative.',
      },
      {
        decision: 'Dynamic rendering, not a static export.',
        reason:
          'The homepage reads results/*.json on every request (export const dynamic = "force-dynamic") instead of freezing the data at build time. A webhook POST shows up on the next page load, with zero rebuild, redeploy, or restart.',
      },
      {
        decision: 'Rate-limited and schema-validated at the edge.',
        reason:
          'Stack slugs are regex-locked to [a-z0-9-]+ (no path traversal), each stack is capped at 10 writes/minute, and every payload is checked against the same schema the dashboard renders, so a malformed or hostile request never reaches disk.',
      },
    ],
    architecture: {
      entry: 'CI run (7 independent repos)',
      router: 'POST /api/results/[stack] (per-stack bearer token)',
      branches: [
        { label: 'playwright-python', detail: 'Playwright + pytest, Page Object Model' },
        { label: 'playwright-js', detail: 'Playwright + TypeScript, network mocking, parallel-safe' },
        { label: 'selenium-python', detail: 'Selenium 4 + pytest, Page Object Model' },
        { label: 'cypress-js', detail: 'Cypress + TypeScript, Page Object Model' },
        { label: 'bdd-cucumber-playwright', detail: 'Cucumber + Playwright, Gherkin feature files' },
        { label: 'api-testing-python', detail: 'pytest + requests + pydantic, schema validation' },
        { label: 'api-testing-js', detail: 'Jest + TypeScript, mirrors the Python suite' },
      ],
      sink: 'results/*.json → dashboard renders on next request',
    },
    metrics: [
      { label: 'Source repos', value: '7' },
      { label: 'Frameworks', value: '5' },
      { label: 'Rebuilds per update', value: '0' },
    ],
    demoUrl: 'https://qa.zanuar.dev',
    githubUrl: 'https://github.com/zanuartri/qa-dashboard',
  },
  {
    slug: 'qa-regression-agent',
    title: 'QA Regression Agent',
    status: 'Live: public demo',
    summary:
      'An autonomous regression agent that runs Playwright, Cypress, and Selenium suites against real and sandbox targets, uses an LLM to triage every failure (real regression, flaky, or just a broken selector), and, for Playwright only, proposes and verifies a fix for the broken-selector case instead of just reporting it.',
    stack: ['LangGraph', 'Playwright', 'Cypress', 'Selenium', 'PostgreSQL', 'pgvector', 'TypeScript'],
    screenshotUrl: '/projects/qa-regression-agent-screenshot.png',
    screenshotAlt:
      'QA Regression Agent dashboard showing a broken Playwright selector classified as broken_selector by the LLM, with the self-heal panel showing the before/after selector diff labeled "verified, not applied"',
    problem:
      'Regression suites across three different frameworks produce three different kinds of noise: a real behavior change, a flaky network blip, and a selector that broke because the DOM moved, not because anything is actually wrong. Triaging which is which is manual and repetitive, and the third category, broken selectors, is exactly the kind of small, well-specified fix an LLM should be good at proposing, if it can be trusted to check its own work before anyone believes it.',
    approach:
      'A LangGraph state machine runs four independent suites (Playwright against a site I control, Cypress against Sauce Demo, Selenium driving a browser to dummyjson.com\'s JSON endpoints, and Playwright\'s APIRequestContext against the public GitHub API), normalizes every result into one schema regardless of framework, and routes each failure through an LLM classification step. A keyword heuristic covers the same three categories when no LLM key is configured, so the whole pipeline stays runnable without one. Failures classified as a broken Playwright selector go to a self-heal step: it extracts the failing locator from the spec source, asks the LLM for a replacement, writes it to a throwaway copy of the spec, and re-runs just that one test to verify the fix actually works before recording anything. Cypress command logs, Playwright action/assertion steps, and real request/response bodies for the API-shaped suites are all captured per test and stored as structured detail, browsable in a dashboard alongside a pass/fail/flaky trend chart and a real activity log of what the agent actually did on each run.',
    decisions: [
      {
        decision: 'Self-heal proposes and verifies a fix, it never applies one.',
        reason:
          'The healed selector lives in a throwaway file used for a single verification re-run, then gets deleted; the actual spec file is never touched and nothing auto-commits. The dashboard shows a labeled before/after diff ("verified, not applied") for a human to copy in, on purpose: an agent quietly rewriting test source code is a bigger risk than a slower fix.',
      },
      {
        decision: 'Every LLM-classified path has a deterministic fallback, not just a try/catch.',
        reason:
          'Both failure classification and selector healing fall back to a keyword heuristic when no LLM key is set, so the graph is fully testable and demoable without paying for API calls. Verified by running the same deliberately-broken selector through both the heuristic and a real model and confirming each path actually heals it.',
      },
      {
        decision: 'Four suites run sequentially, one worker each, never in parallel.',
        reason:
          'This is built to run on a small VPS, where four browser processes at once risks OOM. run_tests pauses between suites and every framework is capped to a single worker internally, even though that makes a full run slower.',
      },
      {
        decision: 'Verified end-to-end against real bugs, not just code review.',
        reason:
          'Actually running the pipeline surfaced two bugs a design review would have missed: Cypress\'s CLI JSON reporter never wrote its output file (switched to the Node API, which returns structured results directly), and Node\'s execFile with shell:true silently dropped quoting on a multi-word argument, which made every self-heal verification look like it failed even when the fix was correct.',
      },
    ],
    architecture: {
      entry: 'Test run (Playwright, Cypress, Selenium, github-api)',
      router: 'classify_failure (LLM or heuristic)',
      branches: [
        {
          label: 'Broken selector',
          detail: 'Playwright only: propose and verify a replacement selector, never auto-apply',
        },
        {
          label: 'Flaky',
          detail: 'Re-run the affected suite once to check if it was noise',
        },
        {
          label: 'Regression',
          detail: 'Flagged for a human to review',
        },
      ],
      sink: 'PostgreSQL (run history, per-test step/request-response detail)',
    },
    metrics: [
      { label: 'Test frameworks', value: '4' },
      { label: 'Tests per run', value: '14' },
      { label: 'Failure categories', value: '3' },
    ],
    demoUrl: 'https://qa-regression-agent.zanuar.dev',
    githubUrl: 'https://github.com/zanuartri/qa-regression-agent',
  },
  {
    slug: 'qa-agent-platform',
    title: 'QA Agent Platform',
    status: 'Live: public demo',
    summary:
      'A public, scoped-down demo of an AI agent platform for QA I built at my company. Chat with a QA-tuned persona grounded in RAG, and get back more than text: the agent answers questions with citations, generates test analysis as an editable interactive mindmap, and actually runs the tests it talks about.',
    stack: ['LangGraph', 'LangChain', 'RAG', 'Pydantic', 'FastAPI', 'PostgreSQL', 'pgvector', 'Markmap'],
    screenshotUrl: '/projects/qa-agent-platform-screenshot.png',
    screenshotAlt:
      'QA Agent Platform chat interface showing a real pytest run, 10 tests passed and 1 failed, with failure details expanded',
    problem:
      'At my company, QA engineers were losing time to two things a chatbot alone doesn’t fix: answering the same requirements and coverage questions over and over, and turning test analysis into something a team will actually read instead of a wall of text. This case study is a public rebuild of that idea, scoped down and without the proprietary integrations (Notion publishing, Figma reads, internal MCP tools) that only make sense inside the company’s own stack.',
    approach:
      'The agent runs on a QA-tuned system prompt (a "QA soul"), grounded in RAG over a set of internal docs (requirements, test plans) embedded with pgvector and stored in PostgreSQL. A LangGraph state machine routes each incoming message through an intent-classification step, choosing between four branches: answering a question with cited retrieval, generating a fresh test-analysis mindmap, editing a mindmap that already exists in the conversation, or running tests. For test analysis, the LLM\'s output is constrained to a Pydantic schema (structured nodes: title, coverage notes, risk level, children) before it ever reaches the UI, so a malformed response fails validation and gets regenerated instead of breaking the mindmap. Follow-up edits to an existing mindmap (add a scenario, change a risk level, delete a node) are handled by a separate tool-calling agent bound to stable per-node IDs, not a full regeneration. Test-run requests let the LLM pick which specific tests to execute from a fixed whitelist, then a tool call actually runs them and folds the real pass/fail output back into the same conversation. Conversations and validated analyses are persisted in PostgreSQL under an anonymous session, no login required, auto-expired after 48 hours by a scheduled cleanup job, with a global daily prompt cap to keep usage bounded.',
    decisions: [
      {
        decision: 'Test selection uses a closed whitelist, not open tool-calling.',
        reason:
          'The LLM picks which tests to run from a fixed set of real test names enforced at the type level, never constructs a command string itself. No path exists from LLM output to a subprocess argument.',
      },
      {
        decision: 'RAG relevance threshold was measured, not guessed.',
        reason:
          'Ran real queries through the retriever and compared cosine-distance scores for on-topic versus off-topic questions before picking a cutoff, so citations only show up when they are actually relevant.',
      },
      {
        decision: 'Every LLM call is treated as unreliable, even after "structured output".',
        reason:
          'The gateway model silently stalled mid-task, returned malformed JSON, and occasionally echoed its own input back as the answer, three different failure modes caught in development and each handled with an explicit retry or fallback instead of trusting the API contract.',
      },
      {
        decision: 'Mindmap edits mutate a stable tree, they do not regenerate it.',
        reason:
          'Every node gets a persistent ID at creation. A follow-up request like "delete the stacking scenario" resolves to one tool call against that ID, not a full re-generation that could silently rewrite unrelated nodes.',
      },
    ],
    architecture: {
      entry: 'Chat message',
      router: 'Intent router',
      branches: [
        {
          label: 'Q&A',
          detail: 'RAG retrieval over internal docs, grounded answer with citations',
        },
        {
          label: 'Test analysis',
          detail: 'Pydantic-validated outline, rendered as a Markmap mindmap',
        },
        {
          label: 'Edit mindmap',
          detail: 'Tool-calling agent mutates the existing tree via stable node IDs',
        },
        {
          label: 'Test run',
          detail: 'LLM selects tests from a whitelist, tool call executes and reports results',
        },
      ],
      sink: 'PostgreSQL (anonymous session, 48h TTL)',
    },
    metrics: [
      { label: 'Intent branches', value: '4' },
      { label: 'Tests in sample suite', value: '11' },
      { label: 'Session TTL', value: '48h' },
    ],
    demoUrl: 'https://qa-agent.zanuar.dev',
    githubUrl: 'https://github.com/zanuartri/qa-agent-platform',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
