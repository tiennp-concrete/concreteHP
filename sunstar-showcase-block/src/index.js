/**
 * Sunstar Showcase Block
 * Hero section block for WordPress with modern corporate design
 */

import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls, PanelColorSettings, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './editor.css';

registerBlockType('sunstar-showcase/hero', {
    title: __('Sunstar Hero Section', 'sunstar-showcase-block'),
    description: __('A hero banner with title, subtitle, and CTA buttons', 'sunstar-showcase-block'),
    category: 'common',
    icon: 'star',
    attributes: {
        title: {
            type: 'string',
            default: __('Welcome to Our Awesome Studio', 'sunstar-showcase-block'),
        },
        subtitle: {
            type: 'string',
            default: __('Create digital experiences that matter', 'sunstar-showcase-block'),
        },
        backgroundColor: {
            type: 'string',
            default: '#001f3f',
        },
        textColor: {
            type: 'string',
            default: '#ffffff',
        },
        buttonLabel: {
            type: 'string',
            default: __('Get Started', 'sunstar-showcase-block'),
        },
        buttonLink: {
            type: 'string',
            default: '#',
        },
    },

    edit: (props) => {
        const { attributes: { title, subtitle, backgroundColor, textColor, buttonLabel, buttonLink }, setAttributes } = props;

        return (
            <>
                <BlockControls>
                    <AlignmentToolbar value="center" />
                </BlockControls>

                <InspectorControls>
                    <PanelBody title={__('Hero Settings', 'sunstar-showcase-block')}>
                        <TextControl
                            label={__('Button Label', 'sunstar-showcase-block')}
                            value={buttonLabel}
                            onChange={(value) => setAttributes({ buttonLabel: value })}
                        />
                        <TextControl
                            label={__('Button Link', 'sunstar-showcase-block')}
                            value={buttonLink}
                            onChange={(value) => setAttributes({ buttonLink: value })}
                        />
                    </PanelBody>

                    <PanelColorSettings
                        title={__('Color Settings', 'sunstar-showcase-block')}
                        initialOpen={true}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (value) => setAttributes({ backgroundColor: value }),
                                label: __('Background Color', 'sunstar-showcase-block'),
                            },
                            {
                                value: textColor,
                                onChange: (value) => setAttributes({ textColor: value }),
                                label: __('Text Color', 'sunstar-showcase-block'),
                            },
                        ]}
                    />
                </InspectorControls>

                <div className="sunstar-hero-editor" style={{ backgroundColor, color: textColor }}>
                    <RichText
                        tagName="h1"
                        className="sunstar-hero-title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Enter title...', 'sunstar-showcase-block')}
                    />
                    <RichText
                        tagName="p"
                        className="sunstar-hero-subtitle"
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                        placeholder={__('Enter subtitle...', 'sunstar-showcase-block')}
                    />
                    <Button isPrimary href={buttonLink}>
                        {buttonLabel}
                    </Button>
                </div>
            </>
        );
    },

    save: (props) => {
        const { attributes: { title, subtitle, backgroundColor, textColor, buttonLabel, buttonLink } } = props;

        return (
            <div className="sunstar-hero" style={{ backgroundColor, color: textColor }}>
                <h1 className="sunstar-hero-title">{title}</h1>
                <p className="sunstar-hero-subtitle">{subtitle}</p>
                <a href={buttonLink} className="sunstar-hero-button">
                    {buttonLabel}
                </a>
            </div>
        );
    },
});
