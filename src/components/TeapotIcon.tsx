import { AnimatedTeapot } from './AnimatedTeapot';
import type { TeapotReaction } from '../hooks/useBrewProcess';

/* === Teapot Icon — wraps AnimatedTeapot with backwards-compatible props === */

interface TeapotIconProps {
  steaming: boolean;
  reaction: TeapotReaction;
  color: string;
  pattern: string;
}

export function TeapotIcon({ reaction, color, pattern }: TeapotIconProps) {
  return (
    <div className="teapot-icon">
      <AnimatedTeapot reaction={reaction} color={color} pattern={pattern} />
    </div>
  );
}
