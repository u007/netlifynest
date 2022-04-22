.PHONY: log dist
include .env

build:
	npm run build

db-migrate:
	# npx prisma migrate resolve --applied XXXname
	npx prisma migrate deploy
	npx prisma db pull
	npx prisma generate

db-rollback:
	npx prisma migrate resolve --rolled-back $(name)

# prisma-db-setup:
# 	npx prisma migrate resolve --applied 20210825051035_initial

db-gen:
	mkdir -p "prisma/migrations/$$(date +%Y%m%d%H%M%S)_$(name)"
	touch "prisma/migrations/$$(date +%Y%m%d%H%M%S)_$(name)/migration.sql"

# this push unique index to the database
prisma-push:
	npx prisma db push

prisma-update:
	npx prisma db pull
	npx prisma generate

admin-model-gen:
	@[ "${name}" ] && sleep 0.1 || ( echo "name is not set"; exit 1 )
	npx nest g resource crud/$(name)
	npx eslint --fix src/crud/$(name)

	sed -i -e "s/\@Controller('${name}/\@Controller('\/crud\/v1\/$(name)/g" src/crud/$(name)/$(name).controller.ts
	# npx nest generate controller crud/$(name)
	# npx nest generate service crud/$(name)
	