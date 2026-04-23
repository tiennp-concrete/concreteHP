import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  const { eyebrow, heading, headingSub, introBullets, categories } = attributes;

  const updateBullet = (i, value) => {
    const next = introBullets.map((b, idx) => (idx === i ? { ...b, text: value } : b));
    setAttributes({ introBullets: next });
  };

  const updateCategoryName = (i, value) => {
    const next = categories.map((c, idx) => (idx === i ? { ...c, name: value } : c));
    setAttributes({ categories: next });
  };

  const updateIcon = (catIdx, iconIdx, field, value) => {
    const next = categories.map((c, ci) => {
      if (ci !== catIdx) return c;
      const icons = c.icons.map((ic, ii) => ii === iconIdx ? { ...ic, [field]: value } : ic);
      return { ...c, icons };
    });
    setAttributes({ categories: next });
  };

  const addIcon = (catIdx) => {
    const next = categories.map((c, ci) =>
      ci !== catIdx ? c : { ...c, icons: [...c.icons, { src: '', alt: '' }] }
    );
    setAttributes({ categories: next });
  };

  const removeIcon = (catIdx, iconIdx) => {
    const next = categories.map((c, ci) =>
      ci !== catIdx ? c : { ...c, icons: c.icons.filter((_, ii) => ii !== iconIdx) }
    );
    setAttributes({ categories: next });
  };

  return (
    <>
      <InspectorControls>
        {categories.map((cat, ci) => (
          <PanelBody key={ci} title={cat.name || `Category ${ci + 1}`} initialOpen={false}>
            {cat.icons.map((icon, ii) => (
              <div key={ii} style={{ marginBottom: 8, padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
                <TextControl label="Image URL" value={icon.src} onChange={(v) => updateIcon(ci, ii, 'src', v)} />
                <TextControl label="Alt text" value={icon.alt} onChange={(v) => updateIcon(ci, ii, 'alt', v)} />
                <Button isDestructive isSmall onClick={() => removeIcon(ci, ii)}>Remove</Button>
              </div>
            ))}
            <Button isPrimary isSmall onClick={() => addIcon(ci)}>+ Add icon</Button>
          </PanelBody>
        ))}
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
              <ul className="tech-bullets">
                {introBullets.map((b, i) => (
                  <li key={i} className="tech-bullet-item">
                    <span className="tech-bullet-num">0{i + 1}</span>
                    <RichText tagName="span" className="tech-bullet-text"
                      value={b.text} onChange={(v) => updateBullet(i, v)} placeholder="Bullet text" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="tech-right">
              <div className="tech-grid">
                {categories.map((cat, ci) => (
                  <div key={ci} className="tech-card">
                    <div className="tech-card-header">
                      <RichText tagName="h3"
                        value={cat.name} onChange={(v) => updateCategoryName(ci, v)} placeholder="Category" />
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
