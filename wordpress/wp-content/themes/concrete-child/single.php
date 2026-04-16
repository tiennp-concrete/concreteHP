<?php
/**
 * Single post template
 *
 * @package ConcreteChild
 */

get_header();
?>

<main id="primary" class="site-main" style="max-width: 900px; margin: 60px auto; padding: 0 40px;">

    <?php
    while ( have_posts() ) :
        the_post();
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header" style="margin-bottom: 40px;">
                <h1 class="entry-title" style="font-size: 48px; margin-bottom: 16px;"><?php the_title(); ?></h1>
                <div class="entry-meta" style="color: #666; font-size: 14px;">
                    <?php concrete_child_posted_on(); ?>
                </div>
            </header><!-- .entry-header -->

            <?php
            if ( has_post_thumbnail() ) {
                echo '<div class="post-thumbnail" style="margin: 40px 0; border-radius: 12px; overflow: hidden;">';
                the_post_thumbnail( 'large' );
                echo '</div>';
            }
            ?>

            <div class="entry-content" style="font-size: 16px; line-height: 1.8; color: #333;">
                <?php
                the_content();

                wp_link_pages( array(
                    'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'concrete-child' ),
                    'after'  => '</div>',
                ) );
                ?>
            </div><!-- .entry-content -->
        </article><!-- #post-<?php the_ID(); ?> -->

        <?php
    endwhile;
    ?>

</main><!-- #primary -->

<?php
get_footer();
