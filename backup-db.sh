#!/bin/bash
# Database Backup Script for Concrete HP WordPress

set -e

PROJECT_NAME="concrete-hp"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/wordpress_backup_${TIMESTAMP}.sql"

# Create backup directory if not exists
mkdir -p ${BACKUP_DIR}

# Execute mysqldump from database container
docker exec ${PROJECT_NAME}-db mysqldump \
    -u wordpress \
    -pwordpress \
    wordpress > ${BACKUP_FILE}

# Compress backup
gzip ${BACKUP_FILE}
BACKUP_FILE="${BACKUP_FILE}.gz"

echo "✓ Database backed up to: ${BACKUP_FILE}"

# Keep only latest 5 backups
echo "→ Cleaning old backups..."
ls -t ${BACKUP_DIR}/wordpress_backup_*.sql.gz 2>/dev/null | tail -n +6 | xargs -r rm

echo "✓ Backup complete!"
