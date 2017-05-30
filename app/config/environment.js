'use strict'

module.exports = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    db: {
        pg: process.env.PG_URL || "postgres://taskadmin:password@dbname.cc0hflliucd0.ap-southeast-1.rds.amazonaws.com:5432/dbname"
    }
}
