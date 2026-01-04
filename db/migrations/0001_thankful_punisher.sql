CREATE TABLE `plan_to_watch` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`movie_id` integer NOT NULL,
	`title` text NOT NULL,
	`release_date` text,
	`runtime` integer,
	`rating` integer,
	`poster_path` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `plan_to_watch_userId_idx` ON `plan_to_watch` (`user_id`);--> statement-breakpoint
CREATE INDEX `plan_to_watch_movieId_idx` ON `plan_to_watch` (`movie_id`);--> statement-breakpoint
CREATE TABLE `watched` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`movie_id` integer NOT NULL,
	`title` text NOT NULL,
	`release_date` text,
	`runtime` integer,
	`rating` integer,
	`poster_path` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `watched_userId_idx` ON `watched` (`user_id`);--> statement-breakpoint
CREATE INDEX `watched_movieId_idx` ON `watched` (`movie_id`);