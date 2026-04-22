import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  BlockControls,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  ToolbarGroup,
  ToolbarButton,
  PanelBody,
  ToggleControl,
} from '@wordpress/components';

import metadata from './block.json';

// Hardcoded SVG icons per plan index — not editable, kept in sync with render.php
const ICONS = [
  // Plan 1 — Entrepreneur
  <svg key="0" viewBox="0 0 480 480" fill="currentColor"><path d="M240 112c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 80c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" /><path d="M325.8 229.2c-2.7-2.7-5.5-5.1-8.4-7.5l.1-.2c26.4-81.4-3.1-170.5-72.9-220-2.8-2-6.5-2-9.3 0-69.7 49.6-99.2 138.6-72.9 220l.1.2c-44 35.3-51 99.6-15.7 143.6 2.3 2.9 4.8 5.7 7.5 8.3a8 8 0 0 0 13.6-4.5l6-42.3c.6-3.9 4-6.9 7.9-6.9h24.4l-6.1 30.4a8 8 0 0 0 7.8 9.6h64a8 8 0 0 0 7.8-9.6l-6.1-30.4h24.4c4 0 7.4 2.9 7.9 6.9l6 42.3a8 8 0 0 0 13.6 4.5c39.8-39.9 39.9-104.6 0-144.4zM240 17.9a180 180 0 0 1 47.3 54H192.7A180 180 0 0 1 240 17.9z" /></svg>,
  // Plan 2 — Pro Business
  <svg key="1" viewBox="0 0 480 480" fill="currentColor"><path d="M429.7 50.3c-7.3-7.3-19.9-7.2-38.1.2a31.8 31.8 0 0 0-44.8-2.8 31.8 31.8 0 0 0-9 34.2c-5.2 3.6-10.4 7.4-15.9 11.5-80.8-45.4-183.1-16.6-228.4 64.2a151.6 151.6 0 0 0 0 164.4c-41.2 56.7-55.5 92.7-41.4 106.8a20 20 0 0 0 14.6 5.2c21.9 0 57.6-21.9 92-47.6a152 152 0 0 0 228.6-63.7 151.6 151.6 0 0 0 .2-164.5c41-56.8 67.5-102.7 50.3-119.9zM368 56a16 16 0 1 1 0 32 16 16 0 0 1 0-32zM240 88a152 152 0 0 1 152 152 152 152 0 0 1-216.8 137.6A600 600 0 0 0 316 240c-13.3-14-44-47.2-72.5-83.3A151.4 151.4 0 0 1 240 88z" /></svg>,
];

function Edit({ attributes, setAttributes }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const { plans } = attributes;
  const period = isAnnual ? 'annual' : 'monthly';

  const updatePlan = (i, field, value) => {
    const next = plans.map((p, idx) => (idx === i ? { ...p, [field]: value } : p));
    setAttributes({ plans: next });
  };

  const updateFeature = (planIdx, featureIdx, value) => {
    const plan = plans[planIdx];
    const nextFeatures = plan.features.map((f, idx) => (idx === featureIdx ? value : f));
    updatePlan(planIdx, 'features', nextFeatures);
  };

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            isPressed={!isAnnual}
            onClick={() => setIsAnnual(false)}
          >Monthly</ToolbarButton>
          <ToolbarButton
            isPressed={isAnnual}
            onClick={() => setIsAnnual(true)}
          >Annual</ToolbarButton>
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title="Preview" initialOpen>
          <ToggleControl
            label="Show annual prices"
            help="Toggle to preview — frontend shows Monthly/Annual via tab buttons."
            checked={isAnnual}
            onChange={setIsAnnual}
          />
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'pricing' })}>
        <div className="container">
          <div className="pricing-grid-wrap">
            <div className="pricing-head">
              <RichText
                tagName="p" className="eyebrow"
                value={attributes.eyebrow}
                onChange={(v) => setAttributes({ eyebrow: v })}
                placeholder="Eyebrow"
              />
              <RichText
                tagName="h2" className="section-title"
                value={attributes.heading}
                onChange={(v) => setAttributes({ heading: v })}
                placeholder="Heading line 1"
              />
              <RichText
                tagName="h2" className="section-title"
                value={attributes.headingSub1}
                onChange={(v) => setAttributes({ headingSub1: v })}
                placeholder="Heading line 2"
              />
              <RichText
                tagName="h2" className="section-title"
                value={attributes.headingSub2}
                onChange={(v) => setAttributes({ headingSub2: v })}
                placeholder="Heading line 3"
              />
            </div>

            <div className="pricing-panel">
              <div className="pricing-toggle">
                <button
                  type="button"
                  className={`pt-btn${isAnnual ? '' : ' is-active'}`}
                  onClick={() => setIsAnnual(false)}
                >Monthly</button>
                <button
                  type="button"
                  className={`pt-btn${isAnnual ? ' is-active' : ''}`}
                  onClick={() => setIsAnnual(true)}
                >Annual</button>
              </div>

              <div className="pricing-cards" data-period-target={period}>
                {plans.map((plan, i) => (
                  <article key={i} className="price-card">
                    <div className="price-header">
                      <div>
                        <RichText
                          tagName="h3"
                          value={plan.title}
                          onChange={(v) => updatePlan(i, 'title', v)}
                          placeholder="Plan name"
                        />
                        <p className="price-amount">
                          {isAnnual ? (
                            <span className="price-annual" style={{ display: 'inline' }}>
                              <RichText
                                tagName="span"
                                value={plan.annualPrice}
                                onChange={(v) => updatePlan(i, 'annualPrice', v)}
                                placeholder="$0"
                              />
                              <RichText
                                tagName="span" className="price-unit"
                                value={plan.annualUnit}
                                onChange={(v) => updatePlan(i, 'annualUnit', v)}
                                placeholder="/ year"
                              />
                            </span>
                          ) : (
                            <span className="price-monthly" style={{ display: 'inline' }}>
                              <RichText
                                tagName="span"
                                value={plan.monthlyPrice}
                                onChange={(v) => updatePlan(i, 'monthlyPrice', v)}
                                placeholder="$0"
                              />
                              <RichText
                                tagName="span" className="price-unit"
                                value={plan.monthlyUnit}
                                onChange={(v) => updatePlan(i, 'monthlyUnit', v)}
                                placeholder="/ month"
                              />
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="price-icon">{ICONS[i] || ICONS[0]}</div>
                    </div>

                    <ul className="price-features">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <RichText
                            tagName="span"
                            value={feat}
                            onChange={(v) => updateFeature(i, fIdx, v)}
                            placeholder="Feature"
                          />
                        </li>
                      ))}
                    </ul>

                    <a className="btn btn-outline-dark" href="#" onClick={(e) => e.preventDefault()}>
                      <RichText
                        tagName="span"
                        value={plan.ctaText}
                        onChange={(v) => updatePlan(i, 'ctaText', v)}
                        placeholder="CTA"
                      />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,
});
