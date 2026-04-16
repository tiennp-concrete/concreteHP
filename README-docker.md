# Docker Setup for Concrete HP - WordPress + Child Theme

## Quick Start

```bash
docker compose up -d
```

## Services & URLs

- **WordPress**: http://localhost:8825
- **phpMyAdmin**: http://localhost:8081 (user: `wordpress`, password: `wordpress`)
- **Database**: Internal MySQL 5.7 service on `db:3306`

## Configuration

Edit `.env` to customize:
- `PROJECT_NAME`: Container name prefix (default: `concrete-hp`)
- `THEME_NAME`: Active WordPress child theme (default: `concrete-child`)
- `PORT_NUM`: WordPress port (default: `8825`)
- Database credentials and other settings

## Plugins & Themes

### Plugin: Sunstar Showcase Block
- Location: `./sunstar-showcase-block/`
- Auto-mounted to: `/var/www/html/wp-content/plugins/sunstar-showcase-block`
- Activate in WordPress admin after first setup

### Child Theme: Concrete Child
- Location: `./wordpress/wp-content/themes/concrete-child/`
- Set as active theme in WordPress admin

## Common Commands

### Start containers in background
```bash
docker compose up -d
```

### Stop all containers
```bash
docker compose stop
```

### Restart containers
```bash
docker compose restart
```

### View logs
```bash
docker compose logs -f wordpress
docker compose logs -f db
```

### Reset database (remove volume)
```bash
docker compose down -v
```

### SSH into WordPress container
```bash
docker exec -it concrete-hp-web bash
```

### SSH into database container
```bash
docker exec -it concrete-hp-db bash
```

## Database

- **Root password**: See `MARIADB_ROOT_PASSWORD` in `.env`
- **WordPress DB**: `wordpress`
- **WordPress user**: `wordpress`
- **Initial SQL scripts**: Place `.sql` files in `./db-data/` folder

## PHP Configuration

Custom PHP settings are loaded from `./config/php.ini`:
- `post_max_size=50M`
- `upload_max_filesize=50M`
- `date.timezone=Asia/Tokyo`

Edit this file and restart containers to apply changes.

## Environment Reference

See `.env.example` for all available configuration options.
