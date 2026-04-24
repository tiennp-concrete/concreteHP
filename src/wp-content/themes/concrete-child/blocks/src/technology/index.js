import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  const { eyebrow, heading, headingSub, tabs } = attributes;
  const [activeTab, setActiveTab] = useState(0);

  const updateTab = (i, field, value) => {
    const next = tabs.map((t, idx) => idx === i ? { ...t, [field]: value } : t);
    setAttributes({ tabs: next });
  };

  const updateCatName = (tabIdx, catIdx, value) => {
    const next = tabs.map((t, ti) => {
      if (ti !== tabIdx) return t;
      const cats = t.categories.map((c, ci) => ci === catIdx ? { ...c, name: value } : c);
      return { ...t, categories: cats };
    });
    setAttributes({ tabs: next });
  };

  const updateIcon = (tabIdx, catIdx, iconIdx, field, value) => {
    const next = tabs.map((t, ti) => {
      if (ti !== tabIdx) return t;
      const cats = t.categories.map((c, ci) => {
        if (ci !== catIdx) return c;
        const icons = c.icons.map((ic, ii) => ii === iconIdx ? { ...ic, [field]: value } : ic);
        return { ...c, icons };
      });
      return { ...t, categories: cats };
    });
    setAttributes({ tabs: next });
  };

  const addIcon = (tabIdx, catIdx) => {
    const next = tabs.map((t, ti) => {
      if (ti !== tabIdx) return t;
      const cats = t.categories.map((c, ci) =>
        ci === catIdx ? { ...c, icons: [...c.icons, { src: '', alt: '' }] } : c
      );
      return { ...t, categories: cats };
    });
    setAttributes({ tabs: next });
  };

  const removeIcon = (tabIdx, catIdx, iconIdx) => {
    const next = tabs.map((t, ti) => {
      if (ti !== tabIdx) return t;
      const cats = t.categories.map((c, ci) =>
        ci === catIdx ? { ...c, icons: c.icons.filter((_, ii) => ii !== iconIdx) } : c
      );
      return { ...t, categories: cats };
    });
    setAttributes({ tabs: next });
  };

  const currentTab = tabs[activeTab] || tabs[0];
  const currentCats = currentTab?.categories || [];

  return (
    <>
      <InspectorControls>
        {tabs.map((tab, ti) =>
          (tab.categories || []).map((cat, ci) => (
            <PanelBody key={`${ti}-${ci}`} title={`${tab.label}: ${cat.name}`} initialOpen={false}>
              {cat.icons.map((icon, ii) => (
                <div key={ii} style={{ marginBottom: 8, padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
                  <TextControl label="Image URL" value={icon.src} onChange={(v) => updateIcon(ti, ci, ii, 'src', v)} />
                  <TextControl label="Alt text"  value={icon.alt} onChange={(v) => updateIcon(ti, ci, ii, 'alt', v)} />
                  <Button isDestructive size="small" onClick={() => removeIcon(ti, ci, ii)}>Remove</Button>
                </div>
              ))}
              <Button variant="primary" size="small" onClick={() => addIcon(ti, ci)}>+ Add icon</Button>
            </PanelBody>
          ))
        )}
      </InspectorControls>

      <section {...useBlockProps({ className: 'technology' })}>
        <div className="container">
          <div className="tech-wrap">

            <div className="tech-left">
              <RichText tagName="p" className="eyebrow"
                value={eyebrow} onChange={(v) => setAttributes({ eyebrow: v })} placeholder="Eyebrow" />
              <RichText tagName="h2" className="section-title"
                value={heading} onChange={(v) => setAttributes({ heading: v })} placeholder="Heading" />
              <RichText tagName="h2" className="section-title"
                value={headingSub} onChange={(v) => setAttributes({ headingSub: v })} placeholder="Sub heading" />

              <ul className="tech-tab-nav">
                {tabs.map((tab, ti) => (
                  <li key={ti}
                    className={`tech-tab${ti === activeTab ? ' is-active' : ''}`}
                    onClick={() => setActiveTab(ti)}
                  >
                    <span className="tech-tab-num">{tab.num}</span>
                    <RichText tagName="span" className="tech-tab-label"
                      value={tab.label}
                      onChange={(v) => updateTab(ti, 'label', v)}
                      placeholder="Tab label"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="tech-right">
              <div className="tech-panel is-active">
                {currentCats.map((cat, ci) => (
                  <div key={ci} className="tech-card">
                    <div className="tech-card-header">
                      <RichText tagName="h3"
                        value={cat.name}
                        onChange={(v) => updateCatName(activeTab, ci, v)}
                        placeholder="Category name"
                      />
                    </div>
                    <div className="tech-card-body">
                      <div className="tech-icons">
                        {cat.icons.filter(ic => ic.src).map((ic, ii) => (
                          <img key={ii} src={ic.src} alt={ic.alt} style={{ maxHeight: 30 }} />
                        ))}
                        {!cat.icons.some(ic => ic.src) && (
                          <span style={{ color: '#bbb', fontSize: 12 }}>Add icons in sidebar →</span>
                        )}
                      </div>
                    </div>
                  </div>
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
