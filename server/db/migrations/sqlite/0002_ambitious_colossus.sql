ALTER TABLE `pages` ADD `parent_id` text REFERENCES pages(id) ON DELETE SET NULL;--> statement-breakpoint
CREATE INDEX `pages_parent_id_idx` ON `pages` (`parent_id`);