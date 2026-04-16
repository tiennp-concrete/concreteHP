<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <header id="site-header" class="site-header bg-transparent">
        <nav class="main-navigation">
            <div class="nav-container">
                <div class="logo">
                    <?php
                    if ( has_custom_logo() ) {
                        the_custom_logo();
                    } else {
                        echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="site-title">' . esc_html( get_bloginfo( 'name' ) ) . '</a>';
                    }
                    ?>
                </div>

                <div class="nav-right">
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'container'      => false,
                        'fallback_cb'    => 'concrete_child_fallback_menu',
                    ) );
                    ?>

                    <div class="language-switcher">
                        <?php if ( function_exists( 'pll_the_languages' ) ) : ?>
                            <?php pll_the_languages( array( 'show_flags' => 0, 'show_names' => 1 ) ); ?>
                        <?php else : ?>
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="active">VI</a>
                            <span class="separator">|</span>
                            <a href="<?php echo esc_url( home_url( '/en/' ) ); ?>">EN</a>
                        <?php endif; ?>
                    </div>

                    <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobile-menu">
        <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
        <ul>
            <?php
            if ( has_nav_menu( 'primary' ) ) {
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'items_wrap'     => '%3$s',
                    'depth'          => 1,
                ) );
            } else {
                $home = esc_url( home_url( '/' ) );
                echo '<li><a href="' . $home . '">' . __( 'Home', 'concrete-child' ) . '</a></li>';
                echo '<li><a href="' . $home . '#business">' . __( 'Services', 'concrete-child' ) . '</a></li>';
                echo '<li><a href="' . $home . '#projects">' . __( 'Projects', 'concrete-child' ) . '</a></li>';
                echo '<li><a href="' . esc_url( home_url( '/careers' ) ) . '">' . __( 'Careers', 'concrete-child' ) . '</a></li>';
                echo '<li><a href="' . $home . '#environment">' . __( 'Environment', 'concrete-child' ) . '</a></li>';
                echo '<li><a href="' . $home . '#news">' . __( 'News', 'concrete-child' ) . '</a></li>';
            }
            ?>
        </ul>
        <div class="mobile-lang-switcher">
            <?php if ( function_exists( 'pll_the_languages' ) ) : ?>
                <?php pll_the_languages( array( 'show_flags' => 0, 'show_names' => 1 ) ); ?>
            <?php else : ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="active">VI</a>
                <a href="<?php echo esc_url( home_url( '/en/' ) ); ?>">EN</a>
            <?php endif; ?>
        </div>
    </div>
