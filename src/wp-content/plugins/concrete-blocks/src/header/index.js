import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  RichText,
} from '@wordpress/block-editor';

import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  const set = (field) => (v) => setAttributes({ [field]: v });

  return (
    <div {...useBlockProps({ className: 'site-header-wrap' })}>
      <header className="site-header bg-transparent">
        <nav className="main-navigation">
          <div className="nav-container">
            <div className="logo">
              <span className="site-title">
                <RichText
                  tagName="span"
                  className="logo-mark"
                  value={attributes.logoMark}
                  onChange={set('logoMark')}
                  placeholder="Logo mark"
                />
                <RichText
                  tagName="span"
                  className="logo-subtitle"
                  value={attributes.logoSubtitle}
                  onChange={set('logoSubtitle')}
                  placeholder="Subtitle"
                />
              </span>
            </div>
            <div className="nav-right">
              <ul id="primary-menu">
                <li><RichText tagName="a" value={attributes.menuBusiness}    onChange={set('menuBusiness')}    placeholder="Business" /></li>
                <li><RichText tagName="a" value={attributes.menuProjects}    onChange={set('menuProjects')}    placeholder="Projects" /></li>
                <li><RichText tagName="a" value={attributes.menuEnvironment} onChange={set('menuEnvironment')} placeholder="Environment" /></li>
                <li><RichText tagName="a" value={attributes.menuNews}        onChange={set('menuNews')}        placeholder="News" /></li>
                <li><RichText tagName="a" value={attributes.menuCareers}     onChange={set('menuCareers')}     placeholder="Careers" /></li>
              </ul>
              <div className="language-switcher">
                <RichText tagName="a" className="active" value={attributes.langVi} onChange={set('langVi')} placeholder="VI" />
                <span className="separator">|</span>
                <RichText tagName="a" value={attributes.langEn} onChange={set('langEn')} placeholder="EN" />
              </div>
              <span className="header-action">
                <RichText
                  tagName="span"
                  value={attributes.ctaText}
                  onChange={set('ctaText')}
                  placeholder="CTA"
                />
              </span>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,
});
