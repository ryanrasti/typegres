CREATE TABLE dogs (
  id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  breed text,
  created_at timestamptz NOT NULL DEFAULT now()
);
