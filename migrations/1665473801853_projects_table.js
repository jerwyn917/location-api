const up =
    'CREATE TABLE `projects` ( ' +
    '  `project_id` VARCHAR(50) NOT NULL, ' +
    '  `name` VARCHAR(50) NOT NULL, ' +
    '  `description` TEXT NOT NULL, ' +
    '  `created_at` DATETIME NOT NULL DEFAULT NOW(),  ' +
    '  `updated_at` DATETIME NOT NULL DEFAULT NOW(), ' +
    '  `deleted_at` DATETIME NULL, ' +
    '  PRIMARY KEY (`project_id`), ' +
    '  UNIQUE INDEX `name_UNIQUE` (`name` ASC));';

const down = 'DROP TABLE `projects`;';

module.exports = {
    up,
    down,
};
