import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
} from '@wordpress/components';

import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  const set = (field) => (v) => setAttributes({ [field]: v });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Images" initialOpen>
          <TextControl
            label="Hero / form decor image URL"
            value={attributes.heroImage}
            onChange={set('heroImage')}
          />
          <TextControl
            label="Inline decor image URL"
            value={attributes.decorImage}
            onChange={set('decorImage')}
          />
        </PanelBody>
        <PanelBody title="Form placeholders" initialOpen={false}>
          <TextControl label="Name placeholder"    value={attributes.namePlaceholder}    onChange={set('namePlaceholder')} />
          <TextControl label="Email placeholder"   value={attributes.emailPlaceholder}   onChange={set('emailPlaceholder')} />
          <TextControl label="Subject placeholder" value={attributes.subjectPlaceholder} onChange={set('subjectPlaceholder')} />
          <TextControl label="Message placeholder" value={attributes.messagePlaceholder} onChange={set('messagePlaceholder')} />
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'zh-contact-cta', id: 'contact' })}>
        <div className="zh-container">
          <div className="zh-contact-grid">
            <div className="zh-contact-media">
              {attributes.heroImage && (
                <img className="zh-contact-decor" src={attributes.heroImage} alt="" />
              )}
              <div className="zh-contact-form">
                <input type="text"  disabled placeholder={attributes.namePlaceholder} />
                <input type="email" disabled placeholder={attributes.emailPlaceholder} />
                <input type="text"  disabled placeholder={attributes.subjectPlaceholder} />
                <textarea disabled placeholder={attributes.messagePlaceholder} />
                <span className="zh-btn zh-btn-primary">
                  <RichText
                    tagName="span"
                    value={attributes.submitText}
                    onChange={set('submitText')}
                    placeholder="Submit text"
                  />
                </span>
              </div>
            </div>

            <div className="zh-contact-text">
              <RichText
                tagName="p" className="zh-eyebrow"
                value={attributes.eyebrow}
                onChange={set('eyebrow')}
                placeholder="Eyebrow"
              />
              {attributes.decorImage && (
                <img className="zh-contact-decor-inline" src={attributes.decorImage} alt="" />
              )}
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
              <RichText
                tagName="p" className="zh-contact-phone-label"
                value={attributes.phoneLabel}
                onChange={set('phoneLabel')}
                placeholder="Phone label"
              />
              <span className="zh-contact-phone">
                <span className="zh-phone-icon">📞</span>
                <RichText
                  tagName="span"
                  value={attributes.phone}
                  onChange={set('phone')}
                  placeholder="Phone number"
                />
              </span>
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
