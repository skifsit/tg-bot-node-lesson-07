INSERT INTO users(
    id,
    status,
    first_name,
    username
)
VALUES(
    $1,
    $2,
    $3,
    $4
)
RETURNING *