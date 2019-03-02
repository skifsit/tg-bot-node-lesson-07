UPDATE mtp_authorizations
SET
    mtp_data = COALESCE($2, mtp_data)
WHERE
    id = $1
RETURNING *