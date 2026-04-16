# Concrete HP - WordPress Setup Guide

## ✅ Project Structure

Your project is now fully configured with:

```
concreteHp/
├── wordpress/                       # WordPress core (downloaded from wordpress.org)
│   └── wp-content/
│       ├── plugins/
│       │   └── sunstar-showcase-block/  # Custom Gutenberg block plugin
│       └── themes/
│           └── concrete-child/        # Child theme (ready to customize)
├── sunstar-showcase-block/          # Plugin source (auto-synced)
├── config/
│   └── php.ini                      # PHP configuration (50M upload max)
├── db-data/                         # Database init scripts folder
├── docker-compose.yml               # Docker services config
├── .env                             # Environment variables
├── .env.example                     # Reference config
├── backup-db.sh                     # Database backup script
└── README-docker.md                 # Docker documentation
```

## 🚀 Quick Start

### 1. Ensure Docker is running
```bash
docker --version
```

### 2. Start all services
```bash
cd /Users/apple/Documents/Concrete/concreteHp
docker compose up -d
```

### 3. Access WordPress
- **WordPress**: http://localhost:8825
- **phpMyAdmin**: http://localhost:8081

### 4. Complete WordPress Installation
1. Go to http://localhost:8825
2. Select language and proceed with setup
3. Database credentials (from `.env`):
   - Database: `wordpress`
   - Username: `wordpress`
   - Password: `wordpress`
   - Host: `db` (not localhost)

### 5. Activate Plugin & Theme
After setup completes:
1. Go to **WordPress Admin** → **Plugins** → Activate **Sunstar Showcase Block**
2. Go to **Appearance** → **Themes** → Activate **Concrete Child**

## 📝 Configuration

Edit `.env` to customize:
```bash
PROJECT_NAME=concrete-hp        # Container prefix
THEME_NAME=concrete-child      # Active theme
PORT_NUM=8825                  # WordPress port
```

## 🛠️ Common Commands

```bash
# View running containers
docker compose ps

# View logs
docker compose logs -f wordpress

# Stop containers
docker compose stop

# Restart containers
docker compose restart

# Remove containers and volumes (⚠️ WARNING: Deletes database)
docker compose down -v

# Backup database
bash backup-db.sh

# Enter WordPress container
docker exec -it concrete-hp-web bash

# Enter database container
docker exec -it concrete-hp-db bash
```

## 🔧 Database

- **Type**: MySQL 5.7
- **Container**: concrete-hp-db
- **Database**: wordpress
- **User**: wordpress (password in .env)
- **Root**: root (password in .env)
- **Admin UI**: phpMyAdmin on http://localhost:8081

## 📚 Plugin Development

The plugin is in `./sunstar-showcase-block/` and auto-mounted to WordPress.

To develop and build:
```bash
cd sunstar-showcase-block
npm install
npm start        # Watch mode
# or
npm run build    # Production build
```

## 🎨 Theme Customization

Your child theme is in `./wordpress/wp-content/themes/concrete-child/`

- `style.css`: Child theme styles (override parent here)
- `functions.php`: PHP hooks and child theme setup

## 💾 Backup Database

```bash
bash backup-db.sh
```

Backups are stored in `./backups/` folder with timestamps.

## 📖 Need More Help?

See `README-docker.md` for detailed Docker documentation.

---

**Ready?** Run `docker compose up -d` and visit http://localhost:8825 ! 🎉
