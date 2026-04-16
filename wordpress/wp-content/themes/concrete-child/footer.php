<?php
/**
 * Footer Template - Sun* Asterisk style
 *
 * @package ConcreteChild
 */
?>

    <footer id="colophon" class="site-footer">
        <!-- Footer Main -->
        <div class="footer-main">
            <!-- Brand / About -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <?php if ( has_custom_logo() ) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">ConcreteHP</a>
                    <?php endif; ?>
                </div>
                <p><?php bloginfo( 'description' ); ?></p>
                <div class="footer-social">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                </div>
            </div>

            <!-- Services Column -->
            <div class="footer-column">
                <h3><?php _e( 'Services', 'concrete-child' ); ?></h3>
                <ul>
                    <li><a href="#"><?php _e( 'Creative & Engineering', 'concrete-child' ); ?></a></li>
                    <li><a href="#"><?php _e( 'Talent Platform', 'concrete-child' ); ?></a></li>
                    <li><a href="#"><?php _e( 'Our Projects', 'concrete-child' ); ?></a></li>
                </ul>
            </div>

            <!-- Company Column -->
            <div class="footer-column">
                <h3><?php _e( 'Company', 'concrete-child' ); ?></h3>
                <ul>
                    <li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>"><?php _e( 'About Us', 'concrete-child' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/careers' ) ); ?>"><?php _e( 'Careers', 'concrete-child' ); ?></a></li>
                    <li><a href="#"><?php _e( 'Work Environment', 'concrete-child' ); ?></a></li>
                    <li><a href="#"><?php _e( 'News', 'concrete-child' ); ?></a></li>
                </ul>
            </div>

            <!-- Contact Column -->
            <div class="footer-contact">
                <h3><?php _e( 'Contact', 'concrete-child' ); ?></h3>
                <div class="contact-item">
                    <span class="contact-icon">&#x1f4de;</span>
                    <span class="contact-text"><?php _e( '84-24-3795-5417', 'concrete-child' ); ?></span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">&#x2709;</span>
                    <span class="contact-text"><a href="mailto:hr@example.com">hr@example.com</a></span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">&#x1f4cd;</span>
                    <span class="contact-text"><?php _e( 'Hanoi, Vietnam', 'concrete-child' ); ?></span>
                </div>
            </div>
        </div>

        <!-- Offices -->
        <div class="footer-offices">
            <h3><?php _e( 'Our Offices', 'concrete-child' ); ?></h3>
            <div class="offices-grid">
                <div class="office-item">
                    <div class="office-city"><?php _e( 'Ha Noi', 'concrete-child' ); ?></div>
                    <div class="office-address"><?php _e( 'Keangnam Landmark, Ha Noi, Vietnam', 'concrete-child' ); ?></div>
                </div>
                <div class="office-item">
                    <div class="office-city"><?php _e( 'Da Nang', 'concrete-child' ); ?></div>
                    <div class="office-address"><?php _e( 'Da Nang, Vietnam', 'concrete-child' ); ?></div>
                </div>
                <div class="office-item">
                    <div class="office-city"><?php _e( 'Ho Chi Minh', 'concrete-child' ); ?></div>
                    <div class="office-address"><?php _e( 'Ho Chi Minh City, Vietnam', 'concrete-child' ); ?></div>
                </div>
                <div class="office-item">
                    <div class="office-city"><?php _e( 'Tokyo', 'concrete-child' ); ?></div>
                    <div class="office-address"><?php _e( 'Tokyo, Japan', 'concrete-child' ); ?></div>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <p>&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php _e( 'All rights reserved.', 'concrete-child' ); ?></p>
            <div class="footer-bottom-links">
                <a href="#"><?php _e( 'Privacy Policy', 'concrete-child' ); ?></a>
                <a href="#"><?php _e( 'Terms of Use', 'concrete-child' ); ?></a>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
