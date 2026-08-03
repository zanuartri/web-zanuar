export function GradientMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <div className="absolute inset-0 grid-texture" />
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-lime/25 mix-blend-multiply" />
      <div className="absolute -bottom-52 -left-40 h-[560px] w-[560px] rounded-full bg-signal/[0.09] mix-blend-multiply" />
    </div>
  );
}
