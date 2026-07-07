CREATE TABLE "auth_otps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"mobile" varchar(20),
	"purpose" varchar(50) NOT NULL,
	"otp_hash" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"consumed_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
