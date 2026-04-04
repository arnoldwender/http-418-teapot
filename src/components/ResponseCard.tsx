interface ResponseCardProps {
  refusal: string;
}

export function ResponseCard({ refusal }: ResponseCardProps) {
  return (
    <div className="response-card" role="alert">
      <div className="response-card__header">
        <div className="response-card__status">
          <div className="response-card__code">418</div>
          <div className="response-card__label">I'M A TEAPOT</div>
        </div>
        <div className="response-card__headers">
          <div>Content-Type: text/teapot</div>
          <div>I-Am-A-Teapot: true</div>
          <div>Will-Brew-Coffee: false</div>
          <div>Porcelain: yes</div>
          <div>X-Caffeine-Level: 0</div>
        </div>
      </div>
      <div className="response-card__body">
        {refusal}
      </div>
    </div>
  );
}
