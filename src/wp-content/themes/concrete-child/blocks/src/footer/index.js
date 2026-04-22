import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  SelectControl,
} from '@wordpress/components';

import metadata from './block.json';

const SOCIAL = [
  { name: 'Facebook',  svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  { name: 'Twitter',   svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> },
  { name: 'Behance',   svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 5H2v14h5a4 4 0 0 0 0-8 3 3 0 0 0 0-6zM22 12h-7a3 3 0 0 1 6 0M16 5h5" /></svg> },
  { name: 'LinkedIn',  svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
  { name: 'Instagram', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg> },
  { name: 'RSS',       svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="2" /></svg> },
];

function Edit({ attributes, setAttributes }) {
  const [editCol, setEditCol] = useState('companyItems');
  const set = (field) => (v) => setAttributes({ [field]: v });

  const updateLink = (colKey, i, field, value) => {
    const next = attributes[colKey].map((it, idx) => (idx === i ? { ...it, [field]: value } : it));
    setAttributes({ [colKey]: next });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Brand" initialOpen>
          <TextControl label="Logo URL"   value={attributes.logoUrl}  onChange={set('logoUrl')} />
          <TextControl label="Brand name" value={attributes.brand}    onChange={set('brand')} />
        </PanelBody>
        <PanelBody title="Column links" initialOpen={false}>
          <SelectControl
            label="Edit column"
            value={editCol}
            options={[
              { value: 'companyItems',   label: 'Company' },
              { value: 'resourcesItems', label: 'Resources' },
            ]}
            onChange={setEditCol}
          />
          {attributes[editCol].map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #eee' }}>
              <TextControl
                label={`Item ${i + 1} text`}
                value={item.text}
                onChange={(v) => updateLink(editCol, i, 'text', v)}
              />
              <TextControl
                label="URL"
                value={item.url}
                onChange={(v) => updateLink(editCol, i, 'url', v)}
              />
            </div>
          ))}
        </PanelBody>
      </InspectorControls>

      <footer {...useBlockProps({ className: 'footer' })}>
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="logo" href="/" onClick={(e) => e.preventDefault()}>
              {attributes.logoUrl
                ? <img src={attributes.logoUrl} alt={attributes.brand} />
                : <span className="logo-text">{attributes.brand}</span>}
            </a>
            <RichText
              tagName="p" className="footer-tag"
              value={attributes.tagline}
              onChange={set('tagline')}
              placeholder="Tagline"
            />
            <div className="footer-social">
              {SOCIAL.map((s, i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()} aria-label={s.name}>{s.svg}</a>
              ))}
            </div>
            <RichText
              tagName="p" className="footer-copyright"
              value={attributes.copyright}
              onChange={set('copyright')}
              placeholder="Copyright"
            />
          </div>

          <div className="footer-col">
            <RichText
              tagName="h4"
              value={attributes.colCompanyHeading}
              onChange={set('colCompanyHeading')}
              placeholder="Company"
            />
            <ul>
              {attributes.companyItems.map((item, i) => (
                <li key={i}><a href={item.url} onClick={(e) => e.preventDefault()}>{item.text}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <RichText
              tagName="h4"
              value={attributes.colResourcesHeading}
              onChange={set('colResourcesHeading')}
              placeholder="Resources"
            />
            <ul>
              {attributes.resourcesItems.map((item, i) => (
                <li key={i}><a href={item.url} onClick={(e) => e.preventDefault()}>{item.text}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-newsletter">
            <RichText
              tagName="h4"
              value={attributes.newsletterHeading}
              onChange={set('newsletterHeading')}
              placeholder="Newsletter"
            />
            <RichText
              tagName="p"
              value={attributes.newsletterText}
              onChange={set('newsletterText')}
              placeholder="Newsletter description"
            />
            <div className="newsletter-form">
              <input type="email" disabled placeholder="Enter your email" />
              <button type="button" disabled aria-label="Subscribe">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
            </div>
            <ul className="footer-contact">
              <li>
                <i>📞</i>
                <RichText
                  tagName="span"
                  value={attributes.phone}
                  onChange={set('phone')}
                  placeholder="Phone"
                />
              </li>
              <li>
                <i>✉</i>
                <RichText
                  tagName="span"
                  value={attributes.email}
                  onChange={set('email')}
                  placeholder="Email"
                />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,
});
