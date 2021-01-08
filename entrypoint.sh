#!/bin/bash
# Docker entrypoint script.

# Wait until Postgres is ready
while ! pg_isready -q -h $PGHOST -p $PGPORT -U $PGUSER
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

echo "Creating database $PGDATABASE ... "
mix local.rebar --force
mix ecto.create
mix ecto.migrate
echo "Database $PGDATABASE created."

mix phx.server