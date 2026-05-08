import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  const set = (field) => (v) => setAttributes({ [field]: v });

  const updateStat = (i, key, value) => {
    const next = attributes.stats.map((s, idx) => (idx === i ? { ...s, [key]: value } : s));
    setAttributes({ stats: next });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Image & Link" initialOpen>
          <TextControl
            label="Image URL"
            value={attributes.image}
            onChange={set('image')}
          />
          <TextControl
            label="CTA URL"
            value={attributes.ctaUrl}
            onChange={set('ctaUrl')}
          />
        </PanelBody>
        <PanelBody title="Stats" initialOpen={false}>
          {attributes.stats.map((stat, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <TextControl
                label={`Stat ${i + 1} — Number`}
                value={stat.number}
                onChange={(v) => updateStat(i, 'number', v)}
              />
              <TextControl
                label={`Stat ${i + 1} — Label`}
                value={stat.label}
                onChange={(v) => updateStat(i, 'label', v)}
              />
            </div>
          ))}
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'about' })}>
        <div className="container about-grid">

          <div className="about-media">
            {attributes.image && <img src={attributes.image} alt="About us" />}
          </div>

          <div className="about-text">
            <RichText
              tagName="p" className="eyebrow"
              value={attributes.eyebrow}
              onChange={set('eyebrow')}
              placeholder="Eyebrow"
            />
            <RichText
              tagName="h2" className="section-title"
              value={attributes.heading}
              onChange={set('heading')}
              placeholder="Heading line 1"
            />
            <RichText
              tagName="h2" className="section-title about-heading-sub"
              value={attributes.headingSub}
              onChange={set('headingSub')}
              placeholder="Heading line 2"
            />
            <RichText
              tagName="p" className="about-desc"
              value={attributes.description}
              onChange={set('description')}
              placeholder="Description"
            />

            {/* HIDDEN: stats section
            <div className="about-stats">
              {attributes.stats.map((stat, i) => (
                <div key={i} className="about-stat">
                  <span className="about-stat-number">{stat.number}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            */}

            <span className="btn btn-primary">
              <RichText
                tagName="span"
                value={attributes.ctaText}
                onChange={set('ctaText')}
                placeholder="CTA text"
              />
            </span>
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
