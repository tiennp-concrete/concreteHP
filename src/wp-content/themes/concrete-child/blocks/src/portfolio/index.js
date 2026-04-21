import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import {
  useBlockProps,
  RichText,
  BlockControls,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  ToolbarGroup,
  ToolbarButton,
  PanelBody,
  TextControl,
  SelectControl,
  ToggleControl,
} from '@wordpress/components';

import metadata from './block.json';

const FILTERS = [
  { value: 'all',         label: 'All Projects' },
  { value: 'branding',    label: 'Branding' },
  { value: 'development', label: 'Development' },
  { value: 'ui',          label: 'UI Design' },
  { value: 'web',         label: 'Web Design' },
];

const CATEGORIES = FILTERS.slice(1); // without 'all'

function Edit({ attributes, setAttributes }) {
  const [filter, setFilter] = useState('all');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { projects } = attributes;

  const updateProject = (i, field, value) => {
    const next = projects.map((p, idx) => (idx === i ? { ...p, [field]: value } : p));
    setAttributes({ projects: next });
  };

  const visible = (p) => filter === 'all' || p.category === filter;

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          {FILTERS.map((f) => (
            <ToolbarButton
              key={f.value}
              isPressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >{f.label}</ToolbarButton>
          ))}
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={`Project ${selectedIdx + 1} of ${projects.length}`} initialOpen>
          <p style={{ fontSize: 12, color: '#666' }}>
            Click a card in the block to select it, then edit its settings here.
          </p>
          <TextControl
            label="Image URL"
            value={projects[selectedIdx]?.image || ''}
            onChange={(v) => updateProject(selectedIdx, 'image', v)}
          />
          <SelectControl
            label="Category"
            value={projects[selectedIdx]?.category || 'branding'}
            options={CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
            onChange={(v) => updateProject(selectedIdx, 'category', v)}
          />
          <ToggleControl
            label="Wide card (span 2 columns)"
            checked={projects[selectedIdx]?.size === 'wide'}
            onChange={(v) => updateProject(selectedIdx, 'size', v ? 'wide' : '')}
          />
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'zh-portfolio', id: 'projects' })}>
        <div className="zh-container">
          <div className="zh-portfolio-head">
            <RichText
              tagName="p" className="zh-eyebrow"
              value={attributes.eyebrow}
              onChange={(v) => setAttributes({ eyebrow: v })}
              placeholder="Eyebrow"
            />
            <RichText
              tagName="h2" className="zh-section-title"
              value={attributes.heading}
              onChange={(v) => setAttributes({ heading: v })}
              placeholder="Heading line 1"
            />
            <RichText
              tagName="h2" className="zh-section-title"
              value={attributes.headingSub}
              onChange={(v) => setAttributes({ headingSub: v })}
              placeholder="Heading line 2"
            />
          </div>

          {attributes.decorImage && (
            <div className="zh-portfolio-decor">
              <img src={attributes.decorImage} alt="" />
            </div>
          )}

          <div className="zh-portfolio-filters">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`zh-filter${filter === f.value ? ' is-active' : ''}`}
                onClick={() => setFilter(f.value)}
              >{f.label}</button>
            ))}
          </div>

          <div className="zh-portfolio-grid">
            {projects.map((p, i) => {
              const classes = [
                'zh-port-card',
                p.size === 'wide' ? 'zh-port-wide' : '',
                !visible(p) ? 'is-hidden' : '',
                selectedIdx === i ? 'is-selected' : '',
              ].filter(Boolean).join(' ');

              return (
                <a
                  key={i}
                  className={classes}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setSelectedIdx(i); }}
                  style={selectedIdx === i ? { outline: '2px solid #17cfbd', outlineOffset: 2 } : undefined}
                >
                  <img src={p.image} alt={p.title} />
                  <div className="zh-port-meta" style={{ opacity: 1 }}>
                    <RichText
                      tagName="span" className="zh-port-tag"
                      value={p.tag}
                      onChange={(v) => updateProject(i, 'tag', v)}
                      placeholder="Tag"
                    />
                    <RichText
                      tagName="h3"
                      value={p.title}
                      onChange={(v) => updateProject(i, 'title', v)}
                      placeholder="Project title"
                    />
                  </div>
                </a>
              );
            })}
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
