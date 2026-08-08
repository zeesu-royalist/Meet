import React from "react";
import {
  GithubIcon,
  CodeIcon,
  SparklesIcon,
  ZapIcon,
  LayoutGridIcon,
} from "./Icons";

const IntegrationStrip = () => {
  return (
    <section className="zm-section zm-integration-section">
      <div className="zm-container">
        <div className="zm-integration-strip-card">
          <div className="zm-integration-label-col">
            <span className="zm-integration-label">
              Compatible With 10+ Platforms & Tools
            </span>
          </div>
          <div className="zm-integration-logos-row">
            <div className="zm-partner-logo">
              <CodeIcon size={20} />
              <span>VS Code</span>
            </div>
            <div className="zm-partner-logo">
              <GithubIcon size={20} />
              <span>GitHub</span>
            </div>
            <div className="zm-partner-logo">
              <SparklesIcon size={20} />
              <span>Vercel</span>
            </div>
            <div className="zm-partner-logo">
              <ZapIcon size={20} />
              <span>Linear</span>
            </div>
            <div className="zm-partner-logo">
              <LayoutGridIcon size={20} />
              <span>Figma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationStrip;
