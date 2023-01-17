const up =
    'CREATE TABLE `places` ( ' +
    '  `place_id` VARCHAR(50) NOT NULL, ' +
    '  `user_id` VARCHAR(50) NOT NULL, ' +
    '  `description` TEXT NOT NULL, ' +
    '  `longitude` VARCHAR(200) NOT NULL, ' +
    '  `latitude` VARCHAR(200) NOT NULL, ' +
    '  `created_at` DATETIME NOT NULL DEFAULT NOW(),  ' +
    '  `updated_at` DATETIME NOT NULL DEFAULT NOW(), ' +
    '  `deleted_at` DATETIME NULL, ' +
    '  PRIMARY KEY (`place_id`), ' +
    '  FOREIGN KEY (`user_id`) REFERENCES users(`user_id`));';

const down = 'DROP TABLE `places`;';

module.exports = {
    up,
    down,
};
