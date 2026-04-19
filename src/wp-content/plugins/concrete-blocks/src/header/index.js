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

  return (
    <>
      <InspectorControls>
        <PanelBody title="Logo" initialOpen>
          <TextControl
            label="Logo image URL"
            value={attributes.logoUrl}
            onChange={set('logoUrl')}
          />
          <TextControl
            label="Brand alt text"
            value={attributes.brand}
            onChange={set('brand')}
          />
        </PanelBody>
      </InspectorControls>

      <header {...useBlockProps({ className: 'zh-header' })}>
        <div className="zh-header-inner">
          <a className="zh-logo" href="/" onClick={(e) => e.preventDefault()}>
            {attributes.logoUrl ? (
              <img src={attributes.logoUrl} alt={attributes.brand} />
            ) : (
              <span className="zh-logo-text">{attributes.brand}</span>
            )}
          </a>

          <button type="button" className="zh-mobile-toggle" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>

          <div className="zh-header-menu">
            <div className="zh-drawer-head">
              <a className="zh-drawer-logo" href="/" onClick={(e) => e.preventDefault()}>
                {attributes.logoUrl ? (
                  <img src={attributes.logoUrl} alt={attributes.brand} />
                ) : (
                  <span className="zh-logo-text">{attributes.brand}</span>
                )}
              </a>
              <button type="button" className="zh-drawer-close" aria-label="Close menu">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <nav className="zh-nav">
              <ul>
                <li><RichText tagName="a" value={attributes.navHome}    onChange={set('navHome')}    placeholder="Home" /></li>
                <li><RichText tagName="a" value={attributes.navAbout}   onChange={set('navAbout')}   placeholder="About" /></li>
                {/* <li className="zh-has-submenu">
                  <RichText tagName="a" value={attributes.navProjects} onChange={set('navProjects')} placeholder="Projects" />
                  <ul className="zh-submenu">
                    <li><a>Branding</a></li>
                    <li><a>Development</a></li>
                    <li><a>UI Design</a></li>
                    <li><a>Web Design</a></li>
                  </ul>
                </li> */}
                <li><RichText tagName="a" value={attributes.navTeam}    onChange={set('navTeam')}    placeholder="Team" /></li>
                <li><RichText tagName="a" value={attributes.navNews}    onChange={set('navNews')}    placeholder="News" /></li>
                <li><RichText tagName="a" value={attributes.navContact} onChange={set('navContact')} placeholder="Contact" /></li>
              </ul>
            </nav>

            <div className="zh-header-cta">
              <span className="zh-btn zh-btn-outline">
                <RichText
                  tagName="span"
                  value={attributes.ctaText}
                  onChange={set('ctaText')}
                  placeholder="CTA"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="zh-header-overlay"></div>
      </header>
    </>
  );
}

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,
});
