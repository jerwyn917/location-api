const up =
    'CREATE TABLE `users` ( ' +
    '  `id` VARCHAR(50) NOT NULL, ' +
    '  `first_name` VARCHAR(50) NULL, ' +
    '  `middle_name` VARCHAR(50) NULL, ' +
    '  `last_name` VARCHAR(50) NULL, ' +
    '  `email` VARCHAR(50) NULL, ' +
    '  `password` VARCHAR(200) NULL, ' +
    '  `created_at` DATETIME NOT NULL DEFAULT NOW(),  ' +
    '  `updated_at` DATETIME NOT NULL DEFAULT NOW(), ' +
    '  `deleted_at` DATETIME NULL, ' +
    '  PRIMARY KEY (`id`)); ';

const down = 'DROP TABLE `users`;';

module.exports = {
    up,
    down,
};
