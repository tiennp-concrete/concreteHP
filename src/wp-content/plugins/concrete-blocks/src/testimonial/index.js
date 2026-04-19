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
  RangeControl,
} from '@wordpress/components';
import { chevronLeft, chevronRight } from '@wordpress/icons';

import metadata from './block.json';

const IMG_BASE = '/wp-content/themes/concrete-child/assets/images';
const SHAPE_BASE = IMG_BASE;
const AVATAR = `${IMG_BASE}/testimonial_s1.jpg`;
const MAIN_IMG = `${IMG_BASE}/shape5.png`;

function Edit({ attributes, setAttributes }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    { quote: 'quote1', name: 'name1', role: 'role1' },
    { quote: 'quote2', name: 'name2', role: 'role2' },
  ];
  const total = slides.length;
  const go = (n) => setSlide(((n % total) + total) % total);

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={chevronLeft}
            label="Previous slide"
            onClick={() => go(slide - 1)}
          />
          <ToolbarButton
            icon={chevronRight}
            label="Next slide"
            onClick={() => go(slide + 1)}
          />
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title="Carousel Settings" initialOpen>
          <RangeControl
            label="Autoplay (ms, 0 = off)"
            value={attributes.autoplay}
            onChange={(v) => setAttributes({ autoplay: v || 0 })}
            min={0}
            max={10000}
            step={500}
          />
          <p style={{ fontSize: 12, color: '#666', marginTop: 12 }}>
            Current slide: <strong>{slide + 1} / {total}</strong>
          </p>
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'zh-testimonial' })}>
        <div className="zh-container">
          <div className="zh-testimonial-grid">
            <div className="zh-testimonial-media">
              <div className="zh-shape-float zh-tm-1 zh-float-ud">
                <img src={`${SHAPE_BASE}/team_s7.png`} alt="" />
              </div>
              <div className="zh-shape-float zh-tm-2 zh-float-small">
                <img src={`${SHAPE_BASE}/team_s8.png`} alt="" />
              </div>
              <div className="zh-shape-float zh-tm-3 zh-float-top">
                <img src={`${SHAPE_BASE}/team_s5-1.png`} alt="" />
              </div>
              <div className="zh-shape-float zh-tm-4 zh-float-circle">
                <img src={`${SHAPE_BASE}/team_s6.png`} alt="" />
              </div>
              <img className="zh-t-main-image" src={MAIN_IMG} alt="Testimonials" />
            </div>

            <div className="zh-testimonial-text">
              <RichText
                tagName="p"
                className="zh-eyebrow"
                value={attributes.eyebrow}
                onChange={(v) => setAttributes({ eyebrow: v })}
                placeholder="Eyebrow"
              />
              <RichText
                tagName="h2"
                className="zh-section-title"
                value={attributes.heading}
                onChange={(v) => setAttributes({ heading: v })}
                placeholder="Heading"
              />
              <RichText
                tagName="h2"
                className="zh-section-title"
                value={attributes.headingSub}
                onChange={(v) => setAttributes({ headingSub: v })}
                placeholder="Heading (line 2)"
              />

              <div className="zh-t-carousel">
                <div
                  className="zh-t-carousel-viewport"
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="zh-t-carousel-track"
                    style={{
                      display: 'flex',
                      transform: `translateX(-${slide * 100}%)`,
                      transition: 'transform 0.4s ease',
                    }}
                  >
                    {slides.map((keys, i) => (
                      <article
                        key={i}
                        className="zh-t-card"
                        style={{ flex: '0 0 100%' }}
                      >
                        <div className="zh-t-quote-icon">&ldquo;</div>
                        <RichText
                          tagName="p"
                          className="zh-t-quote"
                          value={attributes[keys.quote]}
                          onChange={(v) => setAttributes({ [keys.quote]: v })}
                          placeholder="Quote…"
                        />
                        
                        <div className="zh-t-author">
                          <img src={AVATAR} alt="" />
                          <div>
                            <RichText
                              tagName="p"
                              className="zh-t-name"
                              value={attributes[keys.name]}
                              onChange={(v) => setAttributes({ [keys.name]: v })}
                              placeholder="Name"
                            />
                            <RichText
                              tagName="p"
                              className="zh-t-role"
                              value={attributes[keys.role]}
                              onChange={(v) => setAttributes({ [keys.role]: v })}
                              placeholder="Role"
                            />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="zh-t-navs">
                  <button
                    type="button"
                    className="zh-t-nav"
                    onClick={() => go(slide - 1)}
                    aria-label="Previous"
                  >‹</button>
                  <button
                    type="button"
                    className="zh-t-nav"
                    onClick={() => go(slide + 1)}
                    aria-label="Next"
                  >›</button>
                </div>
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
