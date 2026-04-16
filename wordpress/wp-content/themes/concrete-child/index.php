<?php
/**
 * Homepage Template - Sun* Asterisk style
 *
 * @package ConcreteChild
 */

get_header();
?>

<!-- Banner Section with Particles -->
<section class="banner-section">
    <div id="particles-banner"></div>
    <div class="banner-content wow fadeIn" data-wow-duration="1s">
        <h1><?php _e( 'Digital Creative <span>Studio</span>', 'concrete-child' ); ?></h1>
        <p class="banner-subtitle"><?php _e( 'We create awesome things that matter through technology and creativity', 'concrete-child' ); ?></p>
        <a href="#business" class="banner-cta">
            <?php _e( 'Explore Our Services', 'concrete-child' ); ?>
            <span class="arrow">&rarr;</span>
        </a>
    </div>
    <div class="scroll-indicator">
        <div class="mouse"></div>
        <span><?php _e( 'Scroll', 'concrete-child' ); ?></span>
    </div>
</section>

<!-- Business Areas Section -->
<section class="business-section" id="business">
    <div class="business-container">
        <div class="business-intro wow fadeInUp" data-wow-duration="0.8s">
            <span class="intro-label"><?php _e( 'Business Fields', 'concrete-child' ); ?></span>
            <h2><?php _e( 'Our Services', 'concrete-child' ); ?></h2>
            <div class="accent-line"></div>
            <p><?php _e( 'We provide comprehensive solutions to help businesses grow through technology and creative innovation.', 'concrete-child' ); ?></p>
        </div>

        <div class="business-grid">
            <div class="business-card wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">
                <div class="business-card-image">
                    <div class="placeholder-img">&#x1f4bb;</div>
                </div>
                <div class="business-card-content">
                    <h3><?php _e( 'Creative & Engineering', 'concrete-child' ); ?></h3>
                    <p><?php _e( 'A resource-rich team specialized in technology, design, and business strategy. We deliver end-to-end digital solutions from concept to deployment.', 'concrete-child' ); ?></p>
                    <a href="#" class="business-card-link">
                        <?php _e( 'Learn More', 'concrete-child' ); ?>
                        <span class="arrow">&rarr;</span>
                    </a>
                </div>
            </div>

            <div class="business-card wow fadeInRight" data-wow-duration="0.8s" data-wow-delay="0.4s">
                <div class="business-card-image">
                    <div class="placeholder-img">&#x1f393;</div>
                </div>
                <div class="business-card-content">
                    <h3><?php _e( 'Talent Platform', 'concrete-child' ); ?></h3>
                    <p><?php _e( 'Solutions supporting sustainable business growth through talent development, training programs, and human resource optimization.', 'concrete-child' ); ?></p>
                    <a href="#" class="business-card-link">
                        <?php _e( 'Learn More', 'concrete-child' ); ?>
                        <span class="arrow">&rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Projects Section -->
<section class="projects-section" id="projects">
    <div class="projects-container">
        <div class="section-title wow fadeInUp" data-wow-duration="0.8s">
            <h2><?php _e( 'Our Projects', 'concrete-child' ); ?></h2>
            <div class="accent-line"></div>
        </div>

        <div class="projects-stats wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">
            <div class="stat-item">
                <span class="stat-number"><span class="counter" data-target="200">0</span><span class="counter-suffix">++</span></span>
                <span class="stat-label"><?php _e( 'Partners', 'concrete-child' ); ?></span>
            </div>
            <div class="stat-item">
                <span class="stat-number"><span class="counter" data-target="300">0</span><span class="counter-suffix">++</span></span>
                <span class="stat-label"><?php _e( 'Services Supported', 'concrete-child' ); ?></span>
            </div>
        </div>

        <div class="projects-grid">
            <?php
            $projects = new WP_Query( array(
                'posts_per_page' => 6,
                'post_type'      => 'post',
            ) );

            if ( $projects->have_posts() ) :
                $delay = 0.1;
                while ( $projects->have_posts() ) :
                    $projects->the_post();
                    ?>
                    <article class="project-card wow fadeInUp" data-wow-duration="0.6s" data-wow-delay="<?php echo esc_attr( $delay ); ?>s">
                        <div class="project-image">
                            <?php if ( has_post_thumbnail() ) : ?>
                                <?php the_post_thumbnail( 'medium_large' ); ?>
                            <?php else : ?>
                                <div class="placeholder-img">&#x1f3a8;</div>
                            <?php endif; ?>
                        </div>
                        <div class="project-content">
                            <h3><?php the_title(); ?></h3>
                            <p><?php echo wp_trim_words( get_the_excerpt(), 20 ); ?></p>
                            <a href="<?php the_permalink(); ?>" class="read-more"><?php _e( 'View Details', 'concrete-child' ); ?></a>
                        </div>
                    </article>
                    <?php
                    $delay += 0.15;
                endwhile;
                wp_reset_postdata();
            else :
                ?>
                <p class="no-posts"><?php _e( 'No projects found.', 'concrete-child' ); ?></p>
            <?php endif; ?>
        </div>

        <div class="view-all-link wow fadeInUp" data-wow-duration="0.6s">
            <a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>">
                <?php _e( 'View All Projects', 'concrete-child' ); ?>
            </a>
        </div>
    </div>
</section>

<!-- Career CTA Section -->
<section class="career-cta-section">
    <div class="career-cta-content wow fadeInUp" data-wow-duration="0.8s">
        <h2><?php _e( 'Join Us & Make Awesome Things That Matter', 'concrete-child' ); ?></h2>
        <p><?php _e( 'We are looking for talented and passionate people to join our growing team.', 'concrete-child' ); ?></p>
        <a href="<?php echo esc_url( home_url( '/careers' ) ); ?>" class="career-btn">
            <?php _e( 'Career Opportunities', 'concrete-child' ); ?>
            <span class="arrow">&rarr;</span>
        </a>
    </div>
</section>

<!-- Work Environment Section -->
<section class="work-env-section" id="environment">
    <div class="work-env-container">
        <div class="work-env-header wow fadeInUp" data-wow-duration="0.8s">
            <h2><?php _e( 'Work Environment', 'concrete-child' ); ?></h2>
            <div class="accent-line"></div>
        </div>

        <div class="work-env-grid">
            <div class="work-env-item wow fadeInUp" data-wow-duration="0.6s" data-wow-delay="0.1s">
                <div class="work-env-icon">&#x1f525;</div>
                <h3>#ActiveChallenge</h3>
                <p><?php _e( 'Continuously creating challenges for yourself. Take the initiative and push beyond your limits every day.', 'concrete-child' ); ?></p>
            </div>

            <div class="work-env-item wow fadeInUp" data-wow-duration="0.6s" data-wow-delay="0.3s">
                <div class="work-env-icon">&#x1f4da;</div>
                <h3>#ActiveLearn</h3>
                <p><?php _e( 'Learning within a comprehensive environment with the right capabilities, opportunities, and support systems.', 'concrete-child' ); ?></p>
            </div>

            <div class="work-env-item wow fadeInUp" data-wow-duration="0.6s" data-wow-delay="0.5s">
                <div class="work-env-icon">&#x1f389;</div>
                <h3>#ActiveJoy</h3>
                <p><?php _e( 'Building a culture oriented towards humanistic values where happiness and well-being come first.', 'concrete-child' ); ?></p>
            </div>
        </div>
    </div>
</section>

<!-- News / Culture & Events Section -->
<section class="news-section" id="news">
    <div class="news-container">
        <div class="news-header wow fadeInUp" data-wow-duration="0.8s">
            <h2><?php _e( 'Culture & Events', 'concrete-child' ); ?></h2>
            <div class="accent-line"></div>
        </div>

        <div class="news-grid">
            <?php
            $news = new WP_Query( array(
                'posts_per_page' => 3,
                'post_type'      => 'post',
                'orderby'        => 'date',
                'order'          => 'DESC',
            ) );

            if ( $news->have_posts() ) :
                $delay = 0.1;
                while ( $news->have_posts() ) :
                    $news->the_post();
                    ?>
                    <article class="news-card wow fadeInUp" data-wow-duration="0.6s" data-wow-delay="<?php echo esc_attr( $delay ); ?>s">
                        <div class="news-card-image">
                            <?php if ( has_post_thumbnail() ) : ?>
                                <?php the_post_thumbnail( 'medium_large' ); ?>
                            <?php else : ?>
                                <div class="placeholder-img">&#x1f4f0;</div>
                            <?php endif; ?>
                        </div>
                        <div class="news-card-content">
                            <span class="news-date"><?php echo get_the_date(); ?></span>
                            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                            <p><?php echo wp_trim_words( get_the_excerpt(), 20 ); ?></p>
                            <a href="<?php the_permalink(); ?>" class="news-link"><?php _e( 'View Details', 'concrete-child' ); ?></a>
                        </div>
                    </article>
                    <?php
                    $delay += 0.2;
                endwhile;
                wp_reset_postdata();
            else :
                ?>
                <p class="no-posts"><?php _e( 'No news found.', 'concrete-child' ); ?></p>
            <?php endif; ?>
        </div>

        <div class="news-view-all wow fadeInUp" data-wow-duration="0.6s">
            <a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>">
                <?php _e( 'View All News', 'concrete-child' ); ?>
            </a>
        </div>
    </div>
</section>

<?php
get_footer();
