# needs to be sourced (`source env.sh`)
export NODE_ENV=test

# HAPI server settings
export SERVER_HOST=0.0.0.0
export SERVER_PORT=8080

# Specify an admin secret which can be used to run authorized health checks (node process + database query)
export ADMIN_SECRET=9f18f543d1d4120b

# postgres env variables to directly use their utilities --> http://www.postgresql.org/docs/8.1/static/libpq-envars.html
# these also get used to connect via our service
export DB_HOST=127.0.0.1
export DB_PORT=3306
export DB_USER=enki-test	# make sure this is consistent with /ansible/group_vars/{ENV}.yaml
export DB_PASSWORD=ChelseaRocknRolla77 # make sure this is consistent with /ansible/group_vars/{ENV}.yaml
export DB_NAME=enki-test # make sure this is consistent with /ansible/group_vars/{ENV}.yaml

# Email error reporting (optional)
export EMAIL_SEND=false
export EMAIL_SENDER_DEFAULT="\"iShap Befundapp\" <noreply@ishap.at>"
export EMAIL_RECEIVER_ERRORS="development@ishap.at"
export SPARKPOST_API_KEY="97aac48a9c4002eaaf56c7b9317be78699e15c9e"

export ENABLE_SWAGGER=true # swagger should be enabled in testing environment, so we could test if the /documentation site gets successfully served
export ENABLE_WEBSOCKET_DEV_TOOLS=true

# Asset Settings (optional, if static assets hosting is required): an url prefix that will be prepended to all static hosted assets
export EXTERNAL_ASSETS_URL_HOST=http://127.0.0.1
# Logging Settings
export LOG_CONSOLE=true # log to stdout?
export HAPI_DEBUG_LOG=true # hapi debug log to console (see http://hapijs.com/api ('debug'))
export LOG_CONSOLE_TARGET=./node_modules/bunyan/bin/bunyan # pipe stdout of LOG_CONSOLE through extra tool (use "cat" if in production mode)...
export LOG_FILE=/server/ishap-service/logs/api.log # false or filepath to log to (enable this in production!)

# Minimal severity to log (for bunyan json logging provider)
# "trace" (10, logs sequelize generated queries, don't use this in production)
# "debug" (20, logs debug status information (e.g. called routes + payload), use this or a higher setting for production)
# "info" (30, logs main event information startup, tasks, ...)
# "warn" (40)
# "error" (50)
# "fatal" (60)
export LOG_CONSOLE_MIN_SEVERITY_LEVEL=debug # minimal severity level to log to console
export LOG_FILE_MIN_SEVERITY_LEVEL=trace # minimal severity level to log to console

export LOG_INCLUDE_REQUEST_PAYLOAD=true # set this to false in production (dangerous this will log user credentials in request payloads!!!)
export LOG_INCLUDE_RESPONSE_PAYLOAD=true # set this to false in production (dangerous this will log user access-token/refresh-token in payload body!!!)
export LOG_INCLUDE_REQUEST_HEADERS=true # set this to false in production (dangerous this will log user access-tokens in headers!!!)

# Operations logging specifics
export LOG_OPS_INTERVAL_MS=900000 # log ops (api stats e.g. memory usage, uptime, ...) every 15 minutes