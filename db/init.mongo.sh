#!/bin/bash
mongo -- "$MONGO_INITDB_DATABASE" <<EOF
// Authenticate as root
db.auth(
  "$MONGO_INITDB_ROOT_USERNAME", 
  "$MONGO_INITDB_ROOT_PASSWORD"
);

// Create application user
db = db.getSiblingDB("$MONGO_INITDB_DATABASE");
db.createUser({
  user: "$MONGO_APP_USER",
  pwd: "$MONGO_APP_PASS",
  roles: [{ role: "readWrite", db: "$MONGO_INITDB_DATABASE" }]
});
EOF