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
} from '@wordpress/components';
import { chevronLeft, chevronRight } from '@wordpress/icons';

import metadata from './block.json';

const PER_VIEW = 3;

function Edit({ attributes, setAttributes }) {
  const [slide, setSlide] = useState(0);
  const { posts } = attributes;
  const maxSlide = Math.max(0, posts.length - PER_VIEW);
  const clampedSlide = Math.min(slide, maxSlide);

  const updatePost = (i, field, value) => {
    const next = posts.map((p, idx) => (idx === i ? { ...p, [field]: value } : p));
    setAttributes({ posts: next });
  };

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={chevronLeft}
            label="Previous"
            disabled={clampedSlide === 0}
            onClick={() => setSlide(Math.max(0, clampedSlide - 1))}
          />
          <ToolbarButton
            icon={chevronRight}
            label="Next"
            disabled={clampedSlide >= maxSlide}
            onClick={() => setSlide(Math.min(maxSlide, clampedSlide + 1))}
          />
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title="Slider" initialOpen>
          <p style={{ fontSize: 12, color: '#666' }}>
            Showing posts <strong>{clampedSlide + 1}</strong> to{' '}
            <strong>{Math.min(clampedSlide + PER_VIEW, posts.length)}</strong> of {posts.length}
          </p>
        </PanelBody>
        <PanelBody title={`Post ${clampedSlide + 1} image`} initialOpen={false}>
          <TextControl
            label="Image URL"
            value={posts[clampedSlide]?.image || ''}
            onChange={(v) => updatePost(clampedSlide, 'image', v)}
          />
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'blog', id: 'news' })}>
        <div className="container">
          <div className="blog-grid-wrap">
            <div className="blog-intro">
              <RichText
                tagName="p" className="eyebrow"
                value={attributes.eyebrow}
                onChange={(v) => setAttributes({ eyebrow: v })}
                placeholder="Eyebrow"
              />
              <RichText
                tagName="h2" className="section-title"
                value={attributes.heading}
                onChange={(v) => setAttributes({ heading: v })}
                placeholder="Heading"
              />
              <RichText
                tagName="h2" className="section-title"
                value={attributes.headingSub}
                onChange={(v) => setAttributes({ headingSub: v })}
                placeholder="Heading (line 2)"
              />
              <RichText
                tagName="p"
                value={attributes.description}
                onChange={(v) => setAttributes({ description: v })}
                placeholder="Description"
              />
              <span className="btn btn-primary">
                <RichText
                  tagName="span"
                  value={attributes.ctaText}
                  onChange={(v) => setAttributes({ ctaText: v })}
                  placeholder="CTA"
                />
              </span>
            </div>

            <div className="blog-slider">
              <div
                className="blog-track"
                style={{
                  display: 'flex',
                  gap: 24,
                  transform: `translateX(calc(-${clampedSlide} * ((100% - ${(PER_VIEW - 1) * 24}px) / ${PER_VIEW} + 24px)))`,
                  transition: 'transform 0.4s ease',
                }}
              >
                {posts.map((post, i) => (
                  <article
                    key={i}
                    className="post-card"
                    style={{ flex: `0 0 calc((100% - ${(PER_VIEW - 1) * 24}px) / ${PER_VIEW})` }}
                  >
                    <span className="post-thumb">
                      <img src={post.image} alt={post.title} />
                    </span>
                    <div className="post-body">
                      <RichText
                        tagName="span" className="post-date"
                        value={post.date}
                        onChange={(v) => updatePost(i, 'date', v)}
                        placeholder="Date"
                      />
                      <RichText
                        tagName="h3"
                        value={post.title}
                        onChange={(v) => updatePost(i, 'title', v)}
                        placeholder="Title"
                      />
                      <div className="post-meta">
                        <RichText
                          tagName="span" className="post-author"
                          value={post.author}
                          onChange={(v) => updatePost(i, 'author', v)}
                          placeholder="Author"
                        />
                        <span className="post-cat">
                          <RichText
                            tagName="span"
                            value={post.cat}
                            onChange={(v) => updatePost(i, 'cat', v)}
                            placeholder="Category"
                          />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="blog-navs">
                <button
                  type="button"
                  className="t-nav"
                  onClick={() => setSlide(Math.max(0, clampedSlide - 1))}
                  disabled={clampedSlide === 0}
                  aria-label="Previous"
                >‹</button>
                <button
                  type="button"
                  className="t-nav"
                  onClick={() => setSlide(Math.min(maxSlide, clampedSlide + 1))}
                  disabled={clampedSlide >= maxSlide}
                  aria-label="Next"
                >›</button>
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
