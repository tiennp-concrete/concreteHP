import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import {
  useBlockProps,
  MediaUpload,
  MediaUploadCheck,
  BlockControls,
} from '@wordpress/block-editor';
import { Button, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { chevronLeft, chevronRight } from '@wordpress/icons';

import metadata from './block.json';

const PER_VIEW = 8;

function Edit({ attributes, setAttributes }) {
  const { logos } = attributes;
  const [slide, setSlide] = useState(0);

  const maxSlide = Math.max(0, logos.length - PER_VIEW);
  const clampedSlide = Math.min(slide, maxSlide);
  const visible = logos.slice(clampedSlide, clampedSlide + PER_VIEW);

  const updateLogo = (i, value) => {
    const next = logos.map((l, idx) => (idx === i ? { image: value } : l));
    setAttributes({ logos: next });
  };

  const insertAfter = (i) => {
    const next = [...logos.slice(0, i + 1), { image: '' }, ...logos.slice(i + 1)];
    setAttributes({ logos: next });
  };

  const deleteLogo = (i) => {
    setAttributes({ logos: logos.filter((_, idx) => idx !== i) });
  };

  const goPrev = () => setSlide(Math.max(0, clampedSlide - 1));
  const goNext = () => setSlide(Math.min(maxSlide, clampedSlide + 1));

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={chevronLeft}
            label="Previous logos"
            disabled={clampedSlide === 0}
            onClick={goPrev}
          />
          <ToolbarButton
            icon={chevronRight}
            label="Next logos"
            disabled={clampedSlide >= maxSlide}
            onClick={goNext}
          />
        </ToolbarGroup>
      </BlockControls>

      <section {...useBlockProps({ className: 'brands' })}>
        <div className="container">

          <div className="brands-viewport">
            <div
              className="brands-track"
              style={{
                flexWrap: 'nowrap',
                width: 'auto',
                animation: 'none',
                justifyContent: 'flex-start',
              }}
            >
              {visible.map((logo, vi) => {
                const i = clampedSlide + vi;
                return (
                  <div
                    key={i}
                    style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}
                    className="brand-logo-wrap"
                  >
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(media) => updateLogo(i, media.url)}
                        allowedTypes={['image']}
                        value={logo.image}
                        render={({ open }) => (
                          <Button
                            onClick={open}
                            style={{
                              padding: 0,
                              background: 'transparent',
                              border: '2px dashed transparent',
                              cursor: 'pointer',
                              height: 'auto',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#17cfbd')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
                            title={`Click to replace logo ${i + 1}`}
                          >
                            {logo.image ? (
                              <img
                                className="brand-logo"
                                src={logo.image}
                                alt={`Brand ${i + 1}`}
                              />
                            ) : (
                              <span
                                className="brand-logo"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minWidth: 120,
                                  height: 60,
                                  background: '#f5f5f5',
                                  color: '#888',
                                  fontSize: 12,
                                }}
                              >
                                + Logo {i + 1}
                              </span>
                            )}
                          </Button>
                        )}
                      />
                    </MediaUploadCheck>

                    <button
                      type="button"
                      onClick={() => insertAfter(i)}
                      title="Add logo after this"
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: -10,
                        width: 22,
                        height: 22,
                        padding: 0,
                        margin: 0,
                        borderRadius: '50%',
                        background: '#17cfbd',
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 700,
                        lineHeight: 1,
                        border: '2px solid #fff',
                        boxShadow: '0 1px 3px rgba(0,0,0,.25)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                      }}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteLogo(i)}
                      title="Delete logo"
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        width: 22,
                        height: 22,
                        padding: 0,
                        margin: 0,
                        borderRadius: '50%',
                        background: '#d63638',
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 700,
                        lineHeight: 1,
                        border: '2px solid #fff',
                        boxShadow: '0 1px 3px rgba(0,0,0,.25)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
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
