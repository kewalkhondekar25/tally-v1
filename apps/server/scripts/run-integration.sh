docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5432/postgres" -- echo '🟢 - Database is ready!'
export $(grep -v '^#' ../../packages/db/prisma/.env.test | xargs)
pnpm --filter @repo/db exec prisma migrate dev --name init --schema=./prisma/schema.prisma
pnpm run test --runInBand
read -p "🔵 Press ENTER to exit..."
docker-compose down
