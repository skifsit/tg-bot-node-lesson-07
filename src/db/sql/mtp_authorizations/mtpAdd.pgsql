INSERT INTO mtp_authorizations(
    id,
    mtp_data
)
VALUES(
    $1,
    $2
)
RETURNING *