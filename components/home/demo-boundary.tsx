'use client';

import { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ZRouterDemo } from './zrouter-demo';

type DemoBoundaryProps = { children: ReactNode };
type DemoBoundaryState = { failed: boolean };

/**
 * The demo is drawing only, so a failure in it must never take the page with
 * it. Card and copy come from the "Error / demo failed to load" board.
 */
class DemoBoundary extends Component<DemoBoundaryProps, DemoBoundaryState> {
  state: DemoBoundaryState = { failed: false };

  static getDerivedStateFromError(): DemoBoundaryState {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div
        role="alert"
        className="mx-auto flex w-full max-w-[580px] flex-col items-start gap-4 rounded-card-mobile border-2 border-ink bg-paper p-[24px] md:rounded-card md:p-10"
      >
        <div
          aria-hidden
          className="flex h-[86px] w-full items-center justify-center gap-3 rounded-inner bg-cream md:h-[110px]"
        >
          <span className="flex h-[34px] items-center rounded-pill border-2 border-ink bg-paper px-[14px] font-mono text-[12px] font-medium text-ink md:h-[42px] md:px-[18px] md:text-[14px]">
            your agent
          </span>
          <span className="h-[2.5px] w-[24px] shrink-0 rounded-[1px] bg-faint md:w-[40px]" />
          <span className="flex h-[34px] items-center rounded-pill border-2 border-dashed border-faint bg-cream px-[14px] text-[12px] font-semibold text-faint md:h-[42px] md:px-[18px] md:text-[14px]">
            ZRouter
          </span>
        </div>

        <h2 className="font-display text-[30px] leading-[36px] tracking-[-0.02em] text-ink md:text-[36px] md:leading-[44px]">
          The demo didn’t load.
        </h2>
        <p className="text-[15px] leading-[25px] text-ink-soft md:text-[16px]">
          It’s only a drawing, so nothing is broken on your side. Try once more.
        </p>
        <Button
          variant="secondary"
          onClick={() => this.setState({ failed: false })}
          className="h-[42px] px-[18px] text-[14px]"
        >
          Try again
        </Button>
      </div>
    );
  }
}

export function ZRouterDemoFrame() {
  return (
    <DemoBoundary>
      <ZRouterDemo />
    </DemoBoundary>
  );
}
