import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const set = (field) => (v) => setAttributes({ [field]: v });

  const updateService = (i, field, value) => {
    const next = attributes.services.map((s, idx) => (idx === i ? { ...s, [field]: value } : s));
    setAttributes({ services: next });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={`Service ${selectedIdx + 1} of ${attributes.services.length}`} initialOpen>
          <p style={{ fontSize: 12, color: '#666' }}>
            Click a service card to select it, then edit its icon URL here.
          </p>
          <TextControl
            label="Icon URL"
            value={attributes.services[selectedIdx]?.icon || ''}
            onChange={(v) => updateService(selectedIdx, 'icon', v)}
          />
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'services' })}>
        <div className="container">
          <div className="services-head">
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
              placeholder="Heading"
            />
            <RichText
              tagName="p" className="services-subtitle"
              value={attributes.headingSub}
              onChange={set('headingSub')}
              placeholder="Subtitle"
            />
          </div>

          <div className="services-grid">
            {attributes.services.map((svc, i) => (
              <article
                key={i}
                className="service-card"
                onClick={() => setSelectedIdx(i)}
                style={selectedIdx === i ? { outline: '2px solid #17cfbd', outlineOffset: 2 } : undefined}
              >
                <div className="service-icon">
                  {svc.icon && <img src={svc.icon} alt="" />}
                </div>
                <RichText
                  tagName="h3"
                  value={svc.title}
                  onChange={(v) => updateService(i, 'title', v)}
                  placeholder="Service title"
                />
                <RichText
                  tagName="p"
                  value={svc.text}
                  onChange={(v) => updateService(i, 'text', v)}
                  placeholder="Service description"
                />
                <span className="service-arrow" aria-label="Read more">→</span>
              </article>
            ))}
          </div>

          <RichText
            tagName="p" className="services-footer"
            value={attributes.footerText}
            onChange={set('footerText')}
            placeholder="Footer paragraph"
          />
        </div>
      </section>
    </>
  );
}

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,
});
