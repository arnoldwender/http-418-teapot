interface TeapotIconProps {
  steaming: boolean;
}

export function TeapotIcon({ steaming }: TeapotIconProps) {
  return (
    <div
      className={`teapot-icon ${steaming ? 'teapot-icon--steaming' : ''}`}
    >
      <span className="teapot-icon__emoji" role="img" aria-label="Teapot">
        🫖
      </span>
      {steaming && (
        <div className="teapot-icon__steam">
          <span className="teapot-icon__steam-puff teapot-icon__steam-puff--1">~</span>
          <span className="teapot-icon__steam-puff teapot-icon__steam-puff--2">~</span>
          <span className="teapot-icon__steam-puff teapot-icon__steam-puff--3">~</span>
        </div>
      )}
    </div>
  );
}
