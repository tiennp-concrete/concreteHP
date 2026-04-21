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

  const updateShape = (i, field, value) => {
    const next = attributes.shapes.map((s, idx) => (idx === i ? { ...s, [field]: value } : s));
    setAttributes({ shapes: next });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Hero image & video" initialOpen>
          <TextControl label="Hero image URL"  value={attributes.heroImage} onChange={set('heroImage')} />
          <TextControl label="Video URL"       value={attributes.videoUrl}  onChange={set('videoUrl')} />
        </PanelBody>
        <PanelBody title="Decorative shapes" initialOpen={false}>
          {attributes.shapes.map((shape, i) => (
            <TextControl
              key={i}
              label={`Shape ${i + 1} image`}
              value={shape.image}
              onChange={(v) => updateShape(i, 'image', v)}
            />
          ))}
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'zh-hero' })}>
        {attributes.shapes.map((shape, i) => (
          <div key={i} className={`zh-shape-float ${shape.variant}`}>
            <img src={shape.image} alt="" />
          </div>
        ))}

        <div className="zh-container zh-hero-grid">
          <div className="zh-hero-text">
            <RichText
              tagName="p" className="zh-eyebrow"
              value={attributes.eyebrow}
              onChange={set('eyebrow')}
              placeholder="Eyebrow"
            />
            <RichText
              tagName="h1" className="zh-hero-title"
              value={attributes.title}
              onChange={set('title')}
              placeholder="Title line 1"
            />
            <RichText
              tagName="h2" className="zh-hero-title-sub"
              value={attributes.titleSub}
              onChange={set('titleSub')}
              placeholder="Title line 2"
            />
            <RichText
              tagName="p" className="zh-hero-sub"
              value={attributes.subtitle}
              onChange={set('subtitle')}
              placeholder="Subtitle"
            />
            <div className="zh-hero-ctas">
              <span className="zh-btn zh-btn-primary">
                <RichText
                  tagName="span"
                  value={attributes.primaryCta}
                  onChange={set('primaryCta')}
                  placeholder="Primary CTA"
                />
              </span>
              <span className="zh-hero-video">
                <span className="zh-play-icon">
                  <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M2 1.3v11.4a.6.6 0 00.9.5l9.6-5.7a.6.6 0 000-1L2.9.8a.6.6 0 00-.9.5z" /></svg>
                </span>
                <RichText
                  tagName="span"
                  value={attributes.videoLabel}
                  onChange={set('videoLabel')}
                  placeholder="Video label"
                />
              </span>
            </div>
          </div>
          <div className="zh-hero-media">
            <img src={attributes.heroImage} alt="Our team" />
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
