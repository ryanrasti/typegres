-- Teams: referenced by dogs.team_id
CREATE TABLE teams (
  id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL
);

-- Add FK columns to dogs
ALTER TABLE dogs ADD COLUMN team_id int8 NOT NULL REFERENCES teams(id);
ALTER TABLE dogs ADD COLUMN rival_id int8 REFERENCES dogs(id);

-- Collars: one-to-one with dogs (unique FK, NOT NULL)
CREATE TABLE collars (
  id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  color text NOT NULL,
  dog_id int8 UNIQUE NOT NULL REFERENCES dogs(id)
);

-- Toys: many per dog (non-unique FK)
CREATE TABLE toys (
  id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  dog_id int8 NOT NULL REFERENCES dogs(id)
);

-- Microchips: optional one-to-one (unique FK, nullable)
CREATE TABLE microchips (
  id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  serial text NOT NULL,
  dog_id int8 UNIQUE REFERENCES dogs(id)
);
