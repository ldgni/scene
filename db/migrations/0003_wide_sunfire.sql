CREATE UNIQUE INDEX `plan_to_watch_user_movie_idx` ON `plan_to_watch` (`user_id`,`movie_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `watched_user_movie_idx` ON `watched` (`user_id`,`movie_id`);