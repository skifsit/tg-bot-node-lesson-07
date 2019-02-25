INSERT INTO users(
    id,
    status,
    first_name,
    username,
    language_code
)
VALUES(
    $1,
    $2,
    $3,
    $4,
    $5
)
RETURNING *