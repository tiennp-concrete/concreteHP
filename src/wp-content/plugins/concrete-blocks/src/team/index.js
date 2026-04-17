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

  const updateShape = (i, value) => {
    const next = attributes.shapes.map((s, idx) => (idx === i ? { ...s, image: value } : s));
    setAttributes({ shapes: next });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Images" initialOpen>
          <TextControl label="Main image URL" value={attributes.heroImage} onChange={set('heroImage')} />
          {attributes.shapes.map((shape, i) => (
            <TextControl
              key={i}
              label={`Shape ${i + 1} image`}
              value={shape.image}
              onChange={(v) => updateShape(i, v)}
            />
          ))}
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'zh-team' })}>
        <div className="zh-container">
          <div className="zh-team-grid">
            <div className="zh-team-text">
              <RichText
                tagName="p" className="zh-eyebrow"
                value={attributes.eyebrow}
                onChange={set('eyebrow')}
                placeholder="Eyebrow"
              />
              <RichText
                tagName="h2" className="zh-section-title"
                value={attributes.heading}
                onChange={set('heading')}
                placeholder="Heading line 1"
              />
              <RichText
                tagName="h2" className="zh-section-title"
                value={attributes.headingSub}
                onChange={set('headingSub')}
                placeholder="Heading line 2"
              />
              <RichText
                tagName="p"
                value={attributes.description}
                onChange={set('description')}
                placeholder="Description"
              />
              <span className="zh-btn zh-btn-primary">
                <RichText
                  tagName="span"
                  value={attributes.ctaText}
                  onChange={set('ctaText')}
                  placeholder="CTA"
                />
              </span>
            </div>
            <div className="zh-team-media">
              {attributes.shapes.map((shape, i) => (
                <div key={i} className={`zh-shape-float ${shape.variant}`}>
                  <img src={shape.image} alt="" />
                </div>
              ))}
              <img className="zh-team-media-main" src={attributes.heroImage} alt="Team" />
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
