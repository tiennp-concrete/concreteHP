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
  { label: 'Facebook', svg: <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  { label: 'YouTube',  svg: <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg> },
  { label: 'LinkedIn', svg: <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
];

function Edit({ attributes, setAttributes }) {
  const [editCol, setEditCol] = useState('services');
  const set = (field) => (v) => setAttributes({ [field]: v });

  const updateLink = (colKey, i, field, value) => {
    const next = attributes[colKey].map((it, idx) => (idx === i ? { ...it, [field]: value } : it));
    setAttributes({ [colKey]: next });
  };

  const updateOffice = (i, field, value) => {
    const next = attributes.offices.map((o, idx) => (idx === i ? { ...o, [field]: value } : o));
    setAttributes({ offices: next });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Column links" initialOpen>
          <SelectControl
            label="Edit column"
            value={editCol}
            options={[
              { value: 'services', label: 'Services' },
              { value: 'company',  label: 'Company' },
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

      <footer {...useBlockProps({ className: 'site-footer' })}>
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <RichText
                tagName="a"
                value={attributes.brandLogo}
                onChange={set('brandLogo')}
                placeholder="Brand logo"
              />
            </div>
            <RichText
              tagName="p"
              value={attributes.brandDescription}
              onChange={set('brandDescription')}
              placeholder="Description"
            />
            <div className="footer-social">
              {SOCIAL.map((s, i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()} aria-label={s.label}>{s.svg}</a>
              ))}
            </div>
          </div>
          <div className="footer-column">
            <RichText
              tagName="h3"
              value={attributes.servicesHeading}
              onChange={set('servicesHeading')}
              placeholder="Services"
            />
            <ul>
              {attributes.services.map((item, i) => (
                <li key={i}><a href={item.url} onClick={(e) => e.preventDefault()}>{item.text}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <RichText
              tagName="h3"
              value={attributes.companyHeading}
              onChange={set('companyHeading')}
              placeholder="Company"
            />
            <ul>
              {attributes.company.map((item, i) => (
                <li key={i}><a href={item.url} onClick={(e) => e.preventDefault()}>{item.text}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-offices">
          <RichText
            tagName="h3"
            value={attributes.officesHeading}
            onChange={set('officesHeading')}
            placeholder="Offices heading"
          />
          <div className="offices-grid">
            {attributes.offices.map((office, i) => (
              <div key={i} className="office-item">
                <RichText
                  tagName="div" className="office-city"
                  value={office.city}
                  onChange={(v) => updateOffice(i, 'city', v)}
                  placeholder="City"
                />
                <RichText
                  tagName="div" className="office-address"
                  value={office.address}
                  onChange={(v) => updateOffice(i, 'address', v)}
                  placeholder="Address"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <RichText
            tagName="p"
            value={attributes.copyright}
            onChange={set('copyright')}
            placeholder="Copyright"
          />
          <div className="footer-bottom-links">
            <RichText tagName="a" value={attributes.privacyLink} onChange={set('privacyLink')} placeholder="Privacy" />
            <RichText tagName="a" value={attributes.termsLink}   onChange={set('termsLink')}   placeholder="Terms" />
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
