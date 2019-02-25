UPDATE users
SET
    status = COALESCE($2, status),
    first_name = COALESCE($3, first_name),
    username = COALESCE($4, username),
    language_code = COALESCE($5, language_code)
WHERE
    id = $1
RETURNING *